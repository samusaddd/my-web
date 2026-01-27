import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";
export const alt = `${siteConfig.name} favicon`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(circle at -10% -20%, rgba(56,189,248,0.32), transparent 65%), radial-gradient(circle at 120% -10%, rgba(99,102,241,0.28), transparent 68%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 18,
          color: "white",
          display: "flex",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: 34,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.02em",
          width: "100%",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
