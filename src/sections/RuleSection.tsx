import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function RuleSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.ruleLabel}</Label>
          <SH typed>{c.ruleHeading}</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #64748b)", maxWidth: 660, margin: "16px auto 0", lineHeight: 1.75 }}>
            {c.rulePara}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24
        }}>
          {c.ruleItems?.map((item, i) => (
            <div key={i} className="cl-card" style={{
              padding: "28px", display: "flex", flexDirection: "column", gap: 12
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-danger, #dc2626)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, fontFamily: t.fontMono }}>
                ✗ {item.fail}
              </p>
              <div style={{ width: 24, height: 1, background: "var(--cl-line)", margin: "4px 0" }} />
              <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--cl-text-body, #27272a)", margin: 0 }}>
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
      {c.ruleConclusion && (
        <FadeIn delay={180}>
          <div className="cl-callout cl-callout--accent" style={{ marginTop: 32, borderRadius: t.cardRadius, padding: "20px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0, fontStyle: "italic", fontWeight: 500 }}>
              {c.ruleConclusion}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
