import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1620",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 36 36">
            <path d="M5 21a13 13 0 0 1 26 0Z" fill="#f2b233" />
            <rect x="0" y="24" width="36" height="3" fill="#ffffff" />
            <rect x="0" y="30" width="36" height="3" fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 40, letterSpacing: 6, fontWeight: 700 }}>
            <span>ORIENT</span>
            <span style={{ fontSize: 24, letterSpacing: 14, color: "#b9c4cf", fontWeight: 500 }}>EXPRESS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            Producimos, refinamos y transportamos energía desde Neuquén
          </div>
          <div style={{ fontSize: 28, color: "#b9c4cf" }}>Sitio de demostración. Empresa ficticia.</div>
        </div>
      </div>
    ),
    size,
  );
}
