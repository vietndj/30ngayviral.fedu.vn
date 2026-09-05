import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function CorePillarsSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={1020} id="core-pillars">
      {/* ── Section Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.coreGoalsLabel || "KHÔNG CẦN LÀ CHUYÊN GIA"}</Label>
          <SH typed>{c.coreGoalsHeading || "Bạn không cần khiếu ăn nói hay máy ảnh đắt tiền để có một video chuyên nghiệp."}</SH>
          {c.coreGoalsSub && (
            <div style={{
              maxWidth: 720,
              margin: "20px auto 0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {c.coreGoalsSub.split("\n\n").map((para, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    margin: 0,
                    fontFamily: t.fontBody,
                    fontSize: "clamp(16px, 1.8vw, 18px)",
                    lineHeight: 1.8,
                    color: pIdx === 0 ? "var(--cl-text-muted, #64748b)" : "var(--cl-text-body, #374151)",
                    fontWeight: pIdx === 1 ? 500 : 400,
                    textWrap: "balance",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* ════════ TẦNG 1: 2 KẾT QUẢ ĐẦU RA (HERO OUTCOMES - 50/50 DUAL GRID) ════════ */}
      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: 28,
          marginBottom: 32,
          alignItems: "stretch",
        }}>
          {c.coreGoals?.map((g, idx) => (
            <div
              key={g.id}
              className="cl-glow-card apple-card-stagger"
              style={{
                "--card-delay": `${idx * 90}ms`,
                padding: "clamp(24px, 3.5vw, 34px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 22,
                position: "relative",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              {/* Top Accent Strip */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: idx === 0 
                  ? "linear-gradient(90deg, var(--cl-accent, #1a73e8), transparent)"
                  : "linear-gradient(90deg, #16a34a, transparent)",
              }} />

              <div>
                {/* Tag & Highlight Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}>
                  <span style={{
                    fontFamily: t.fontMono,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
                    background: idx === 0 ? "rgba(26, 115, 232, 0.08)" : "rgba(22, 163, 74, 0.08)",
                    border: `1px solid ${idx === 0 ? "rgba(26, 115, 232, 0.25)" : "rgba(22, 163, 74, 0.25)"}`,
                    borderRadius: 6,
                    padding: "4px 10px",
                  }}>
                    {g.tag}
                  </span>
                  {g.highlight && (
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      ✓ {g.highlight}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: t.fontDisplay,
                  fontSize: "clamp(22px, 2.5vw, 26px)",
                  fontWeight: 500,
                  letterSpacing: "-0.018em",
                  lineHeight: 1.25,
                  color: "var(--cl-text-base, #111827)",
                  margin: "0 0 14px 0",
                  textWrap: "balance",
                }}>
                  {g.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: t.fontBody,
                  fontSize: "clamp(15.5px, 1.7vw, 17px)",
                  lineHeight: 1.75,
                  color: "var(--cl-text-body, #374151)",
                  margin: "0 0 20px 0",
                }}>
                  {g.desc}
                </p>

                {/* Bullets */}
                {g.bullets && g.bullets.length > 0 && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    padding: "18px 0 10px",
                    borderTop: "1px dashed var(--cl-line, rgba(0,0,0,0.08))",
                  }}>
                    {g.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "var(--cl-text-base, #1f2937)",
                      }}>
                        <span style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "rgba(22, 163, 74, 0.12)",
                          color: "#16a34a",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 2,
                        }}>
                          ✓
                        </span>
                        <span style={{ fontWeight: 400 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Visual Mockup Frame */}
              {g.video ? (
                <div style={{
                  width: "100%",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  background: "#0a0a0c",
                  boxShadow: "0 12px 30px -8px rgba(0, 0, 0, 0.2)",
                  padding: "10px 10px 4px",
                  marginTop: 6,
                }}>
                  <AppYTEmbed
                    url={g.video}
                    caption={g.videoCaption || "Video thị phạm thực tế"}
                    maxWidth={280}
                  />
                </div>
              ) : g.image ? (
                <div style={{
                  width: "100%",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  background: "#0a0a0c",
                  boxShadow: "0 12px 30px -8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 10px 14px",
                  marginTop: 6,
                }}>
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      maxWidth: 320,
                      height: "auto",
                      display: "block",
                      borderRadius: 10,
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ════════ TẦNG 2: 3 ĐÒN BẨY BỆ ĐỠ (SUPPORTING PILLARS STRIP) ════════ */}
      <FadeIn delay={150}>
        <div style={{
          background: "var(--cl-card, #f8f9fa)",
          border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
          borderRadius: t.cardRadius || 20,
          padding: "clamp(22px, 3.5vw, 30px)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {/* Bar Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            paddingBottom: 16,
            borderBottom: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <div>
                <span style={{
                  fontFamily: t.fontMono,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#d97706",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 2,
                }}>
                  {c.corePillarsLabel || "3 ĐIỂM TỰA THỰC CHIẾN"}
                </span>
                <h4 style={{
                  fontFamily: t.fontBody,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--cl-text-base, #111827)",
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {c.coreGoalsRightTitle || "Làm video đàng hoàng không cần phải gồng"}
                </h4>
              </div>
            </div>
            <span style={{
              fontFamily: t.fontMono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--cl-text-muted, #6b7280)",
              textTransform: "uppercase",
            }}>
              {c.corePillarsBadge || "Dễ làm · Đỡ ngại · Không tốn kém"}
            </span>
          </div>

          {/* 3 Columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
            gap: 16,
          }}>
            {c.corePillars?.map((p, pIdx) => (
              <div
                key={p.id}
                className="apple-pill-card apple-card-stagger"
                style={{
                  "--card-delay": `${60 + pIdx * 70}ms`,
                  background: "#ffffff",
                  border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  borderRadius: 14,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 10,
                  boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.04)",
                } as React.CSSProperties}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    marginBottom: 8,
                  }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "#d97706",
                      textTransform: "uppercase",
                    }}>
                      {p.tag}
                    </span>
                    {p.highlight && (
                      <span style={{
                        fontFamily: t.fontMono,
                        fontSize: 10.5,
                        color: "var(--cl-text-muted, #6b7280)",
                        fontWeight: 600,
                      }}>
                        {p.highlight}
                      </span>
                    )}
                  </div>

                  <h5 style={{
                    fontFamily: t.fontBody,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--cl-text-base, #111827)",
                    margin: "0 0 6px",
                    lineHeight: 1.35,
                  }}>
                    {p.title}
                  </h5>

                  <p style={{
                    fontFamily: t.fontBody,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: "var(--cl-text-body, #374151)",
                    margin: 0,
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
