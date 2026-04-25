"use client";

type BookProps = {
  requestEmail: string;
};

export default function Book({ requestEmail }: BookProps) {
  const requestHref = `mailto:${requestEmail}?subject=Request%20for%20We%20Were%20Never%20Here`;

  return (
    <section className="w-full px-6 py-32">
      <div className="mx-auto max-w-3xl space-y-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Writing</p>

        <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          We Were Never Here
        </h2>

        <div className="mx-auto h-px w-16 bg-neutral-500" />

        <p className="text-lg leading-relaxed text-neutral-300">
          This is not a book written to provide answers.
        </p>

        <p className="leading-relaxed text-neutral-400">
          It is a structured confrontation with the absence of them. A study of identity, meaning,
          and the quiet continuation of existence when certainty dissolves.
        </p>

        <div className="space-y-4 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Available by request
          </p>

          <a
            className="inline-block border-b border-neutral-100 pb-1 text-sm text-neutral-100 transition hover:opacity-60"
            href={requestHref}
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}
