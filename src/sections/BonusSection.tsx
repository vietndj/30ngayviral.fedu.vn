import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed, BONUS_ICONS } from "../components/ui";

export function BonusSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={1020} id="bonus">
      {/* ── Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.bonusLabel || "TỦ ĐỒ NGHỀ THỰC CHIẾN ĐI KÈM"}</Label>
          <SH>{c.bonusHeading || "Mở máy lên là có sẵn đồ nghề để làm — Khỏi mất công đi nhặt nhạnh từng file rác trên mạng"}</SH>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(16px, 1.8vw, 18px)",
            color: "var(--cl-text-muted, #64748b)",
            maxWidth: 780,
            margin: "16px auto 0",
            lineHeight: 1.75,
          }}>
            {c.bonusSub}
          </p>
        </div>
      </FadeIn>
      
      {/* ── Bonus Cards ── */}
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {c.bonusItems.map((item, i) => {
            const Icon = BONUS_ICONS[i % BONUS_ICONS.length];
            const hasSideMedia = !!item.videoDemo || !!item.gifDemo || !!item.youtubeDemo || !!item.audioDemo;

            return (
              <div
                key={item.id || i}
                className={`cl-bonus-card ${hasSideMedia ? "has-media" : ""}`}
              >
                {/* Cột Trái: Icon + Badge + Tiêu đề + Khối BOCUC 3 Nhịp */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18, width: "100%" }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                    border: `1px solid ${t.accent}44`,
                    boxShadow: `0 0 20px ${t.accent}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    <Icon accent={t.accent} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Nhịp 1: Micro-Badge */}
                    <div style={{
                      fontFamily: t.fontMono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: t.accent,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}>
                      {item.badge || `ĐỒ NGHỀ THỰC CHIẾN 0${i + 1}`}
                    </div>

                    {/* Nhịp 2: Tiêu đề đanh thép */}
                    <h4 style={{
                      fontFamily: t.fontBody,
                      fontSize: "clamp(18px, 2.2vw, 22px)",
                      fontWeight: 700,
                      color: "var(--cl-text-head, #0f172a)",
                      margin: "0 0 10px 0",
                      lineHeight: 1.35,
                      textWrap: "balance",
                    }}>
                      {item.title}
                    </h4>

                    {/* Nhịp 3: Khối nội dung ngắn gọn & Tick list */}
                    {item.pain && (
                      <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        fontSize: "clamp(14.5px, 1.6vw, 16px)",
                        lineHeight: 1.6,
                        color: "var(--cl-text-muted, #64748b)",
                        marginBottom: 8,
                      }}>
                        <span style={{ color: "#dc2626", fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 3 }}>✕</span>
                        <span>{item.pain}</span>
                      </div>
                    )}

                    {item.solution && (
                      <div style={{
                        fontSize: "clamp(14.5px, 1.6vw, 16px)",
                        lineHeight: 1.6,
                        color: "var(--cl-text-head, #111827)",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}>
                        {item.solution}
                      </div>
                    )}

                    {item.bullets && item.bullets.length > 0 ? (
                      <div className="cl-bonus-tick-list">
                        {item.bullets.map((b, bIdx) => {
                          const colonIdx = b.indexOf(":");
                          const hasColon = colonIdx > -1;
                          const boldPart = hasColon ? b.slice(0, colonIdx + 1) : "";
                          const restPart = hasColon ? b.slice(colonIdx + 1) : b;

                          return (
                            <div key={bIdx} className="cl-bonus-tick-item">
                              <span className="cl-bonus-tick-icon">✓</span>
                              <div>
                                {hasColon ? (
                                  <>
                                    <strong style={{ fontWeight: 700, color: "var(--cl-text-head, #0f172a)" }}>{boldPart}</strong>
                                    {restPart}
                                  </>
                                ) : (
                                  b
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontFamily: t.fontBody,
                          fontSize: "15.5px",
                          lineHeight: 1.7,
                          color: "var(--cl-text-body, #374151)",
                          margin: 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    )}
                  </div>
                </div>

                {/* Cột Phải: Visual Media Thật (Audio / Video / GIF / Embed) */}
                {hasSideMedia && (
                  <div className="cl-bonus-media-wrap">
                    {/* 1. Trình phát Audio Player cho Món 01 */}
                    {item.audioDemo && (
                      <div style={{
                        background: "var(--cl-card, #f8f9fa)",
                        border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                        borderRadius: 14,
                        padding: "16px 18px",
                        boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.05)",
                      }}>
                        <div style={{
                          fontFamily: t.fontMono,
                          fontSize: 12,
                          color: t.accent,
                          marginBottom: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}>
                          <span>🎧</span> NGHE THỬ NHẠC MỘC (NO COPYRIGHT):
                        </div>
                        <audio
                          controls
                          src={item.audioDemo}
                          style={{
                            width: "100%",
                            height: 38,
                            outline: "none",
                            borderRadius: 8,
                          }}
                        />
                        <div style={{
                          fontSize: 12.5,
                          color: "var(--cl-text-muted, #64748b)",
                          marginTop: 10,
                          lineHeight: 1.5,
                        }}>
                          ✓ Âm trầm ấm · Sạch bản quyền Facebook & TikTok
                        </div>
                      </div>
                    )}

                    {/* 2. Video Player HTML5 cho Món 03 (AI Lọc Văn Mẫu) */}
                    {item.videoDemo && (
                      <div style={{
                        background: "var(--cl-card, #f8f9fa)",
                        border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.05)",
                      }}>
                        <video
                          src={item.videoDemo}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 260,
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                        <div style={{
                          padding: "10px 14px",
                          fontFamily: t.fontMono,
                          fontSize: 12,
                          color: "var(--cl-text-body, #475569)",
                          background: "var(--cl-card2, #f1f3f4)",
                          borderTop: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                        }}>
                          ▶ Thực tế: AI nhả kịch bản 2 cột, không sáo rỗng
                        </div>
                      </div>
                    )}

                    {/* 3. GIF Animation cho Món 02 (Template Chữ CapCut) */}
                    {item.gifDemo && !item.videoDemo && (
                      <div style={{
                        background: "var(--cl-card, #f8f9fa)",
                        border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.05)",
                      }}>
                        <img
                          src={item.gifDemo}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 220,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <div style={{
                          padding: "10px 14px",
                          fontFamily: t.fontMono,
                          fontSize: 12,
                          color: "var(--cl-text-body, #475569)",
                          background: "var(--cl-card2, #f1f3f4)",
                          borderTop: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                        }}>
                          ✦ Kéo - thả dùng ngay: Chuẩn vùng an toàn điện thoại
                        </div>
                      </div>
                    )}

                    {/* 4. YouTube Embed (Ví dụ: Video hướng dẫn hoặc Shorts) */}
                    {item.youtubeDemo && (
                      <div style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.1))",
                      }}>
                        <AppYTEmbed url={item.youtubeDemo} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
