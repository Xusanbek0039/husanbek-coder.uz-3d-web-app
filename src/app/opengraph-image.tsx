import { ImageResponse } from "next/og";
import { getCommittersRank } from "@/lib/committers";

export const alt = "Husan Suyunov — Full-Stack Python Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;
export const runtime = "edge";

const AVATAR = "https://avatars.githubusercontent.com/u/109731657?v=4";

export default async function OgImage() {
  const { rank, total, contribs } = await getCommittersRank();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 55%, #052e16 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#6ee7b7" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#10b981", marginRight: 12 }} />
            Open to new projects
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, marginTop: 24, lineHeight: 1 }}>Husan Suyunov</div>
          <div style={{ fontSize: 40, color: "#a1a1aa", marginTop: 20 }}>Full-Stack Python Developer</div>
          <div style={{ fontSize: 26, color: "#71717a", marginTop: 14 }}>
            Django · FastAPI · React · Next.js · Telegram bots
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                padding: "14px 26px",
                borderRadius: 999,
                border: "2px solid #f59e0b",
                background: "rgba(245,158,11,0.12)",
                color: "#fcd34d",
                fontSize: 26,
                whiteSpace: "nowrap",
              }}
            >
              {`#${rank} of ${total} in Uzbekistan · committers.top`}
            </div>
            <div
              style={{
                display: "flex",
                padding: "14px 26px",
                marginTop: 14,
                borderRadius: 999,
                border: "2px solid #3f3f46",
                color: "#d4d4d8",
                fontSize: 26,
                whiteSpace: "nowrap",
              }}
            >
              {`${contribs.toLocaleString("en-US")} contributions / year`}
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#52525b", marginTop: 30 }}>husanbek-coder.uz</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR}
          width={260}
          height={260}
          alt=""
          style={{ borderRadius: 130, border: "6px solid #27272a", marginLeft: 40 }}
        />
      </div>
    ),
    size
  );
}
