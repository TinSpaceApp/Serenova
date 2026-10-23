import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18251e",
          color: "#f5f1e8",
          fontSize: 118,
          fontFamily: "Georgia, Times New Roman, serif",
          letterSpacing: "-0.05em",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
