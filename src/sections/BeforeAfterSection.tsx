import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function BeforeAfterSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={1020}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.baLabel}</Label>
          <SH typed>{c.baHeading}</SH>
          {c.baSub && (
            <p style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              color: "var(--cl-text-muted, #64748b)",
              maxWidth: 720,
              margin: "16px auto 0",
              lineHeight: 1.75,
            }}>
              {c.baSub}
            </p>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
          {/* Video Minh Họa Thành Phẩm Thực Tế */}
          <div style={{
            maxWidth: 440,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              fontFamily: t.fontMono,
              fontSize: 12,
              fontWeight: 700,
              color: "#059669",
              marginBottom: 14,
              textAlign: "center",
            }}>
              <span>🎬</span> THÀNH PHẨM THỰC TẾ HỌC VIÊN
            </div>

            <div style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              border: `2px solid ${t.accent}44`,
              boxShadow: `0 12px 32px -10px ${t.accent}33`,
              background: "#000",
            }}>
              <AppYTEmbed url="https://www.youtube.com/watch?v=GqLHBWSiWDI" />
            </div>

            <div style={{
              fontSize: 13,
              color: "var(--cl-text-muted, #64748b)",
              marginTop: 10,
              textAlign: "center",
              lineHeight: 1.5,
            }}>
              Clip tự quay 1 mình bằng điện thoại — Định dạng Walk & Talk tự nhiên, không diễn gượng.
            </div>
          </div>

          {/* Bảng So Sánh Đối Ứng 2 Cột */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: 24,
            width: "100%",
            alignItems: "stretch",
          }}>
            {/* Cột TRƯỚC */}
            <div
              className="cl-glow-card"
              style={{
                background: "var(--cl-card, #ffffff)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "var(--cl-radius, 16px)",
                padding: "clamp(20px, 3vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                letterSpacing: "0.14em",
                color: "#ef4444",
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(239, 68, 68, 0.15)",
              }}>
                <span style={{ fontSize: 14 }}>✕</span> {c.beforeLabel}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {c.beforeItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✕</span>
                    <span style={{
                      fontSize: "clamp(15.5px, 1.6vw, 16.5px)",
                      color: "var(--cl-text-muted, #64748b)",
                      lineHeight: 1.75,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột SAU */}
            <div
              className="cl-glow-card"
              style={{
                background: `linear-gradient(180deg, var(--cl-card, #ffffff) 0%, ${t.accent}08 100%)`,
                border: `1px solid ${t.accent}44`,
                boxShadow: `0 12px 32px -10px ${t.accent}20`,
                borderRadius: "var(--cl-radius, 16px)",
                padding: "clamp(20px, 3vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                letterSpacing: "0.14em",
                color: t.accent,
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 12,
                borderBottom: `1px solid ${t.accent}22`,
              }}>
                <span style={{ fontSize: 14 }}>✓</span> {c.afterLabel}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {c.afterItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{
                      fontSize: "clamp(15.5px, 1.6vw, 16.5px)",
                      color: "var(--cl-text-base, #111827)",
                      lineHeight: 1.75,
                      fontWeight: 500,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}

