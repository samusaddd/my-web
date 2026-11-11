import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync, readdirSync} from "node:fs";
import {Miniflare, convertV4MiniflareOptions} from "miniflare";

test("public comments persist, isolate articles, and enforce posting and deletion boundaries", async () => {
  const mf = new Miniflare(convertV4MiniflareOptions({modules:true,scriptPath:"worker/index.js",compatibilityDate:"2026-11-10",compatibilityFlags:["nodejs_compat"],d1Databases:{DB:"comments-tests"},bindings:{IP_HASH_SALT:"test-salt",ADMIN_TOKEN:"test-admin"}}));
  try {
    const db = await mf.getD1Database("DB");
    for (const filename of readdirSync("drizzle").filter((file)=>file.endsWith(".sql"))) {
      for (const sql of readFileSync(`drizzle/${filename}`,"utf8").split(";").map((part)=>part.replace(/--> statement-breakpoint/g,"").trim()).filter(Boolean)) await db.prepare(sql).run();
    }
    const payload = (overrides={}) => ({id:crypto.randomUUID(),deleteToken:crypto.randomUUID().replaceAll("-","")+crypto.randomUUID().replaceAll("-",""),slug:"why-not",name:"Reader",body:"A thoughtful response.",website:"",...overrides});
    const post = (body,ip="192.0.2.1",origin="https://samirseddiqi.it") => mf.dispatchFetch("https://comments.test/v1/comments",{method:"POST",headers:{Origin:origin,"Content-Type":"application/json","CF-Connecting-IP":ip},body:JSON.stringify(body)});
    const read = async (slug="why-not",before="") => (await mf.dispatchFetch(`https://comments.test/v1/comments?slug=${slug}${before?`&before=${before}`:""}`)).json();
    const remove = (id,token) => mf.dispatchFetch(`https://comments.test/v1/comments/${id}`,{method:"DELETE",headers:{Origin:"https://samirseddiqi.it",Authorization:`Bearer ${token}`}});

    const first = payload({name:"O’Brian",body:"A different perspective.\n<script>alert('no')</script>"});
    assert.equal((await post(first)).status,201);
    const independentlyRead = await read();
    assert.equal(independentlyRead.comments[0].body,first.body);
    assert.equal(independentlyRead.total,1);
    assert.equal((await read("another-essay")).total,0);
    for(const field of ["deleteToken","delete_hash","IP_HASH_SALT","CF-Connecting-IP"]) assert.ok(!JSON.stringify(independentlyRead).includes(field));
    assert.equal((await post(first)).status,200,"retry is idempotent even inside the posting limit");
    assert.equal((await read()).total,1);
    assert.equal((await post(payload())).status,429);
    assert.equal((await post(payload(),"192.0.2.2")).status,201,"independent readers can post");
    assert.equal((await post(payload(),"192.0.2.3","https://attacker.test")).status,403);
    assert.equal((await post(payload({website:"spam"}),"192.0.2.3")).status,400);
    assert.equal((await post(payload({body:"x"}),"192.0.2.3")).status,400);
    assert.equal((await post(payload({name:"<script>"}),"192.0.2.3")).status,400);
    assert.equal((await post(payload({body:"x".repeat(2001)}),"192.0.2.3")).status,400);
    assert.equal((await post(payload({body:"x".repeat(11000)}),"192.0.2.3")).status,413);
    assert.equal((await post(payload({body:"https://one.test https://two.test https://three.test"}),"192.0.2.3")).status,400);
    assert.equal((await mf.dispatchFetch("https://comments.test/v1/comments?slug=..%2Fsecret")).status,400);
    const allowed = await mf.dispatchFetch("https://comments.test/v1/comments",{method:"OPTIONS",headers:{Origin:"https://samirseddiqi.it","Access-Control-Request-Method":"POST"}});
    assert.equal(allowed.status,204);assert.equal(allowed.headers.get("Access-Control-Allow-Origin"),"https://samirseddiqi.it");
    assert.equal((await remove(first.id,"a".repeat(64))).status,403);
    assert.equal((await read()).total,2);
    assert.equal((await remove(first.id,first.deleteToken)).status,200);
    assert.equal((await read()).total,1);

    const concurrent = await Promise.all(Array.from({length:8},()=>post(payload({slug:"concurrency"}),"192.0.2.50")));
    assert.equal(concurrent.filter((response)=>response.status===201).length,1,"only one concurrent post gets through the rate limit");
    assert.equal(concurrent.filter((response)=>response.status===429).length,7);
    for(let i=0;i<25;i++) await db.prepare("INSERT INTO comments(id,slug,name,body,created_at,delete_hash) VALUES(?,?,?,?,?,?)").bind(crypto.randomUUID(),"pagination","Reader",`Comment ${i}`,new Date(Date.UTC(2026,10,1,0,0,i)).toISOString(),"not-a-token").run();
    const page1=await read("pagination");const page2=await read("pagination",page1.next);
    assert.equal(page1.total,25);assert.equal(page1.comments.length,20);assert.equal(page2.comments.length,5);assert.equal(page2.next,null);
    assert.equal(new Set([...page1.comments,...page2.comments].map((comment)=>comment.id)).size,25);
    assert.equal((await mf.dispatchFetch("https://comments.test/v1/moderation")).status,401);
    const moderation=await mf.dispatchFetch("https://comments.test/v1/moderation",{headers:{Authorization:"Bearer test-admin"}});
    assert.equal(moderation.status,200);
    assert.equal((await mf.dispatchFetch(`https://comments.test/v1/moderation/${page1.comments[0].id}`,{method:"DELETE",headers:{Authorization:"Bearer test-admin"}})).status,200);
    assert.equal((await read("pagination")).total,24);
    assert.equal((await mf.dispatchFetch("https://comments.test/health")).status,200);
  } finally { await mf.dispose(); }
});
