import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} | Founder of VitaAvanza`;
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
            "radial-gradient(circle at -10% -30%, rgba(34,211,238,0.22), transparent 62%)",
            "radial-gradient(circle at 118% -18%, rgba(168,85,247,0.18), transparent 62%)",
            "linear-gradient(120deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
          ].join(", "),
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "940px" }}>
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
              color: "rgba(255,255,255,0.88)",
              letterSpacing: "-0.01em",
            }}
          >
            Founder of VitaAvanza
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.74)",
              maxWidth: "820px",
              lineHeight: 1.45,
            }}
          >
            Building infrastructure for life navigation from Trento across Mitra, DVI, and
            institution-ready systems.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
