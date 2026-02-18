import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "QuarterlyUK - The cheapest MTD tool in the UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1B3A5F",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Simple Q mark using coloured blocks */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ width: "40px", height: "40px", backgroundColor: "#0F2440" }} />
            <div style={{ width: "40px", height: "40px", backgroundColor: "#C5A55A" }} />
            <div style={{ width: "40px", height: "40px", backgroundColor: "#2B5C94" }} />
            <div style={{ width: "40px", height: "40px", backgroundColor: "#1B3A5F" }} />
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Quarterly
            <span style={{ color: "#C5A55A" }}>UK</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#C5A55A",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          The cheapest MTD tool in the UK
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "40px",
          }}
        >
          Expense tracking and invoicing for sole traders. From £2.50/month.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#C5A55A",
              color: "#1B3A5F",
              padding: "16px 40px",
              borderRadius: "50px",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            quarterlyuk.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
