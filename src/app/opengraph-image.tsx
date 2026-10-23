import { ImageResponse } from "next/og";

export const alt = "Serenova — private journeys through Tanzania and Zanzibar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#18251e",
          color: "#f5f1e8",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c5a77b",
            fontFamily: "Georgia, Times New Roman, serif",
          }}
        >
          Lausanne
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            Serenova
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#f5f1e8",
              opacity: 0.78,
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            Private journeys through Tanzania and Zanzibar
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
