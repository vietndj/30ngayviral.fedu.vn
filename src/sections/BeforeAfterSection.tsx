import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function BeforeAfterSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.baLabel}</Label>
          <SH typed>{c.baHeading}</SH>
          {c.baSub && <p style={{ fontSize: "clamp(15px, 3.8vw, 19px)", color: "var(--cl-text-muted, #64748b)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>{c.baSub}</p>}
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
          <div style={{ maxWidth: 420, width: "100%", margin: "24px auto", borderRadius: 32, overflow: "hidden", border: `2px solid rgba(225, 29, 72, 0.35)`, boxShadow: `0 12px 36px -8px rgba(225, 29, 72, 0.25)` }}>
            <AppYTEmbed url="https://youtube.com/shorts/0R4N2-z2tDI?feature=share" />
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24,
            width: "100%", maxWidth: 760, margin: "0 auto",
          }}>
            {/* Cột Trước: Lỗi & Khó khăn */}
            <div style={{
              background: "var(--cl-callout-danger-bg, #fef2f2)", border: "1px solid var(--cl-callout-danger-border, #fee2e2)",
              borderRadius: t.cardRadius, padding: "26px 28px", boxShadow: "var(--cl-shadow-sm)",
            }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 12.5, letterSpacing: "0.12em", color: "var(--cl-callout-danger-accent, #dc2626)",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>✕</span> {c.beforeLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.beforeItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "var(--cl-callout-danger-accent, #dc2626)", fontWeight: 700 }}>—</span>
                    <span style={{ fontSize: 15.5, color: "var(--cl-callout-danger-text, #991b1b)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột Sau: Kết quả thực chiến */}
            <div style={{
              background: "var(--cl-callout-success-bg, #f0fdf4)", border: "1px solid var(--cl-callout-success-border, #dcfce7)",
              borderRadius: t.cardRadius, padding: "26px 28px", boxShadow: "var(--cl-shadow-sm)",
            }}>
              <div style={{
                fontFamily: t.fontMono, fontSize: 12.5, letterSpacing: "0.12em", color: "var(--cl-callout-success-accent, #16a34a)",
                fontWeight: 700, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>✓</span> {c.afterLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.afterItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left" }}>
                    <span style={{ color: "var(--cl-callout-success-accent, #16a34a)", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 15.5, color: "var(--cl-callout-success-text, #14532d)", lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
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
