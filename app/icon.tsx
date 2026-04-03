import { ImageResponse } from "next/og";

export const sizes = [
  { width: 16, height: 16 },
  { width: 32, height: 32 },
  { width: 48, height: 48 },
];
export const contentType = "image/png";

function Zap({ size }: { size: number }) {
  const s = size * 0.56; // icon occupies ~56% of tile
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background:
          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
  );
}

export default function Icon({ width = 32 }: { width?: number }) {
  return new ImageResponse(<Zap size={width} />, { width, height: width });
}
