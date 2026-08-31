import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function PainSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.painLabel}</Label>
          <SH typed>{c.painHeading}</SH>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.8, color: "var(--cl-text-body, #27272a)", marginBottom: 36, textAlign: "center" }}>
          {c.painSub}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          {c.pains.map((p: string, i: number) => (
            <div key={i} className="cl-card" style={{ 
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "16px 20px", textAlign: "left",
            }}>
              <span style={{ color: "var(--cl-accent)", fontSize: 18, lineHeight: 1.2, fontWeight: 700 }}>—</span>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--cl-text-body, #27272a)", margin: 0 }}>
                {p}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={160}>
        <blockquote style={{
          borderLeft: `3.5px solid var(--cl-accent)`, paddingLeft: "clamp(14px, 3.5vw, 24px)", margin: "0 auto", maxWidth: 680,
          fontFamily: t.blockquoteFontFamily ?? t.fontAccent, fontStyle: t.blockquoteFontStyle ?? "italic",
          fontWeight: t.blockquoteFontWeight ?? 400, fontSize: "clamp(16px, 3.8vw, 21px)", color: "var(--cl-text-base, #09090b)", 
          lineHeight: 1.7, textAlign: "left",
        }}>
          “{c.painQuote}”
        </blockquote>
      </FadeIn>

      {c.painConclusion && (
        <FadeIn delay={220}>
          <div className="cl-callout cl-callout--danger" style={{ marginTop: 36, borderRadius: t.cardRadius, padding: "20px 24px" }}>
            <p style={{ fontSize: 17.5, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
              {c.painConclusion}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
