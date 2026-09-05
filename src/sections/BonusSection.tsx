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
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {c.bonusItems.map((item, i) => {
            const Icon = BONUS_ICONS[i % BONUS_ICONS.length];
            const hasSideMedia = !!item.videoDemo || !!item.gifDemo || !!item.youtubeDemo || !!item.audioDemo;

            return (
              <div
                key={item.id || i}
                className="cl-glow-card"
                style={{
                  padding: "clamp(24px, 4vw, 36px)",
                  borderRadius: "var(--cl-radius, 16px)",
                  background: "var(--cl-card, #ffffff)",
                  border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  display: "grid",
                  gridTemplateColumns: hasSideMedia ? "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" : "1fr",
                  gap: 32,
                  alignItems: "center",
                }}
              >
                {/* Cột Trái: Icon + Badge + Tiêu đề + Mô tả */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                    border: `1px solid ${t.accent}44`,
                    boxShadow: `0 0 20px ${t.accent}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon accent={t.accent} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: t.fontMono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: t.accent,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}>
                      {item.badge || `ĐỒ NGHỀ THỰC CHIẾN 0${i + 1}`}
                    </div>

                    <h4 style={{
                      fontFamily: t.fontBody,
                      fontSize: "clamp(18px, 2vw, 21px)",
                      fontWeight: 700,
                      color: "var(--cl-text-head, #0f172a)",
                      margin: "0 0 12px 0",
                      lineHeight: 1.35,
                    }}>
                      {item.title}
                    </h4>

                    <div
                      style={{
                        fontFamily: t.fontBody,
                        fontSize: "16.5px",
                        lineHeight: 1.75,
                        color: "var(--cl-text-body, #374151)",
                        margin: 0,
                      }}
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                </div>

                {/* Cột Phải: Visual Media Thật (Audio / Video / GIF / Embed) */}
                {hasSideMedia && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    width: "100%",
                  }}>
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
                          <span>🎧</span> BẤM NGHE THỬ CHẤT NHẠC ĐĨNH ĐẠC (NO COPYRIGHT):
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
                          ✓ Âm trầm dày, mộc mạc · Không lo bị Facebook/TikTok tắt tiếng
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
                          ▶ Thực tế: AI lọc sạch 7 lỗi văn mẫu & nhả kịch bản 2 cột
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
                          ✦ Kéo - thả dùng ngay: Chữ hiển thị chuẩn vùng an toàn trên điện thoại
                        </div>
                      </div>
                    )}

                    {/* 4. YouTube Embed (Ví dụ: Thầy Việt hướng dẫn hoặc Shorts thị phạm) */}
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
