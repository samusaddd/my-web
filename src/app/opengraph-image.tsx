import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} — Author • Founder & CEO`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          backgroundColor: "#05070d",
          backgroundImage: [
            "radial-gradient(900px 520px at -10% -30%, rgba(56,189,248,0.18), transparent 62%)",
            "radial-gradient(860px 520px at 120% -20%, rgba(99,102,241,0.16), transparent 64%)",
            "linear-gradient(120deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
          ].join(", "),
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "920px" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.86)",
              letterSpacing: "-0.01em",
            }}
          >
            Author • Founder & CEO
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.74)",
              maxWidth: "780px",
              lineHeight: 1.45,
            }}
          >
            Institutional infrastructure across product clarity, writing, and civic alignment.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
