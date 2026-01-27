import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} — VitaAvanza`;
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
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(900px 500px at -10% -20%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(800px 480px at 110% -10%, rgba(99,102,241,0.18), transparent 62%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Institutional Infrastructure
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "880px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.82)", lineHeight: 1.4 }}>
            Calm systems for people and institutions in transition.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.65)" }}>VitaAvanza</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
