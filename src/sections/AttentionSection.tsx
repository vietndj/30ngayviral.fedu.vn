import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function AttentionSection() {
  const c = useContent();
  const t = useTheme();

  const choices = c.attentionChoices || [];

  return (
    <Sec maxWidth={1020} id="attention">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.attentionLabel}</Label>
          <SH typed>{c.attentionHeading}</SH>
          {c.attentionPara && (
            <p style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              color: "var(--cl-text-muted, #64748b)",
              maxWidth: 720,
              margin: "16px auto 0",
              lineHeight: 1.75,
            }}>
              {c.attentionPara}
            </p>
          )}
        </div>
      </FadeIn>

      {/* ── 3 Choices Comparison Cards ── */}
      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 24,
          alignItems: "stretch",
        }}>
          {choices.map((item, idx) => {
            const isBest = item.isBest;
            return (
              <div
                key={idx}
                className="cl-glow-card"
                style={{
                  background: isBest
                    ? `linear-gradient(180deg, var(--cl-card, #ffffff) 0%, ${t.accent}08 100%)`
                    : "var(--cl-card, #ffffff)",
                  border: isBest ? `2px solid ${t.accent}` : "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  borderRadius: "var(--cl-radius, 20px)",
                  padding: "clamp(28px, 3.5vw, 36px) clamp(20px, 3vw, 26px)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 16,
                  boxShadow: isBest
                    ? `0 20px 50px -15px ${t.accent}33, 0 0 30px ${t.accent}15`
                    : "0 8px 24px rgba(0, 0, 0, 0.03)",
                  transform: isBest ? "scale(1.02)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Ribbon Khuyên Dùng */}
                {isBest && (
                  <div style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: t.accent,
                    color: "#ffffff",
                    padding: "4px 18px",
                    borderRadius: 20,
                    fontFamily: t.fontMono,
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    boxShadow: `0 4px 14px ${t.accent}55`,
                    whiteSpace: "nowrap",
                  }}>
                    LỰA CHỌN TỐI ƯU NHẤT
                  </div>
                )}

                <div>
                  {/* Badge Thẻ */}
                  <div style={{
                    fontFamily: t.fontMono,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: isBest ? t.accent : "var(--cl-text-muted, #64748b)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    marginBottom: 8,
                  }}>
                    {item.badge}
                  </div>

                  {/* Tiêu đề phương án */}
                  <h3 style={{
                    fontSize: "clamp(18px, 2vw, 21px)",
                    fontWeight: 700,
                    color: "var(--cl-text-base, #111827)",
                    marginBottom: 12,
                    lineHeight: 1.35,
                  }}>
                    {item.title}
                  </h3>

                  {/* Chi phí (Cost) */}
                  <div style={{
                    fontFamily: t.fontMono,
                    fontSize: 15,
                    fontWeight: 700,
                    color: isBest ? t.accent : "#ef4444",
                    background: isBest ? `${t.accent}14` : "rgba(239, 68, 68, 0.08)",
                    border: `1px solid ${isBest ? `${t.accent}33` : "rgba(239, 68, 68, 0.2)"}`,
                    padding: "7px 14px",
                    borderRadius: 10,
                    marginBottom: 14,
                    display: "inline-block",
                  }}>
                    {item.cost}
                  </div>

                  {/* Tag Cái giá thực tế */}
                  {item.tag && (
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isBest ? "#059669" : "var(--cl-text-muted, #64748b)",
                      marginBottom: 14,
                    }}>
                      {item.tag}
                    </div>
                  )}

                  {/* Mô tả thực tế (Story) */}
                  <p style={{
                    fontSize: "clamp(15px, 1.6vw, 16px)",
                    lineHeight: 1.75,
                    color: "var(--cl-text-body, #374151)",
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}

