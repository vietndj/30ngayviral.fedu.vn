import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function BeforeAfterSection() {
  const c = useContent();
  const t = useTheme();
  const [isMuted, setIsMuted] = useState(true);
  const [activeYoutubeModal, setActiveYoutubeModal] = useState<string | null>(null);

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
          {/* Video Minh Họa Thành Phẩm Thực Tế (Tự động chạy sạch sẽ như offline.fedu.vn) */}
          <div style={{
            maxWidth: 380,
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
              marginBottom: 16,
              textAlign: "center",
            }}>
              <span>🎬</span> THÀNH PHẨM THỰC TẾ HỌC VIÊN
            </div>

            {/* Khung video dọc 9:16 tự động chạy sạch sẽ */}
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: 300,
              aspectRatio: "9 / 16",
              borderRadius: 24,
              overflow: "hidden",
              background: "#f8fafc",
              border: "1.5px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.12)",
            }}>
              <video
                src="/assets/showcase/hoc_vien_walk_talk.mp4"
                poster="/assets/showcase/hoc_vien_walk_talk_poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay Nút YouTube góc trên - chuẩn offline.fedu.vn */}
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 10,
              }}>
                <button
                  type="button"
                  onClick={() => setActiveYoutubeModal("GqLHBWSiWDI")}
                  title="Xem trên YouTube"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.22)",
                    color: "#ffffff",
                    fontSize: 11,
                    fontFamily: t.fontMono,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)")}
                >
                  <span style={{ fontSize: 9 }}>▶</span>
                  <span>YouTube</span>
                </button>
              </div>

              {/* Nút bật/tắt tiếng góc dưới */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  zIndex: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: "rgba(0, 0, 0, 0.65)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: 11,
                  fontFamily: t.fontMono,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <span>{isMuted ? "🔇" : "🔊"}</span>
                <span style={{ fontSize: 10.5 }}>{isMuted ? "BẬT TIẾNG" : "ĐANG BẬT"}</span>
              </button>
            </div>

            {/* Chú thích ngắn gọn, mộc mạc bên dưới */}
            <div style={{
              marginTop: 14,
              textAlign: "center",
              maxWidth: 340,
            }}>
              <div style={{
                fontFamily: t.fontBody,
                fontSize: 16.5,
                fontWeight: 700,
                color: "var(--cl-text-base, #0f172a)",
                marginBottom: 4,
              }}>
                Học viên thực hành Walk &amp; Talk tự quay 1 mình
              </div>
              <div style={{
                fontFamily: t.fontBody,
                fontSize: 15,
                color: "var(--cl-text-body, #64748b)",
                lineHeight: 1.55,
              }}>
                Vừa đi vừa nói chuyện tự nhiên bằng điện thoại, không học vẹt kịch bản, cuốn hút người xem từ đầu đến cuối.
              </div>
            </div>
          </div>

          {/* Modal Xem YouTube Full */}
          {activeYoutubeModal && (
            <div
              onClick={() => setActiveYoutubeModal(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: 16,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 380,
                }}
              >
                <button
                  onClick={() => setActiveYoutubeModal(null)}
                  style={{
                    position: "absolute",
                    top: -42,
                    right: 0,
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "none",
                    color: "#ffffff",
                    fontSize: 18,
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
                <div style={{
                  aspectRatio: "9 / 16",
                  width: "100%",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#000000",
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${activeYoutubeModal}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bảng So Sánh Đối Ứng 2 Cột Nâng Cấp (Micro-cards + Bold Title Anchors) */}
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
                background: "#ffffff",
                border: "1.5px solid rgba(239, 68, 68, 0.25)",
                borderRadius: "var(--cl-radius, 20px)",
                padding: "clamp(22px, 3.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "0 4px 24px -4px rgba(239, 68, 68, 0.08)",
              }}
            >
              <div style={{
                fontFamily: t.fontMono,
                fontSize: 12.5,
                letterSpacing: "0.14em",
                color: "#dc2626",
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 14,
                borderBottom: "1.5px solid rgba(239, 68, 68, 0.15)",
              }}>
                <span style={{ fontSize: 15 }}>✕</span> {c.beforeLabel}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.beforeItems.map((item, i) => {
                  const hasColon = item.includes(":");
                  const title = hasColon ? item.split(":")[0].trim() : "";
                  const desc = hasColon ? item.split(":").slice(1).join(":").trim() : item;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        padding: "14px 16px",
                        borderRadius: 14,
                        background: "#fff8f8",
                        border: "1px solid #fee2e2",
                        textAlign: "left",
                      }}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fee2e2",
                        color: "#dc2626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12.5,
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: 2,
                      }}>
                        ✕
                      </div>
                      <div style={{
                        fontSize: "clamp(16px, 1.7vw, 17.5px)",
                        lineHeight: 1.65,
                        color: "#475569",
                        fontFamily: t.fontBody,
                      }}>
                        {title && (
                          <span style={{
                            display: "block",
                            fontWeight: 700,
                            color: "#991b1b",
                            fontSize: "clamp(16.5px, 1.8vw, 18px)",
                            marginBottom: 3,
                          }}>
                            {title}
                          </span>
                        )}
                        {desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cột SAU */}
            <div
              className="cl-glow-card"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)",
                border: "1.5px solid #93c5fd",
                borderRadius: "var(--cl-radius, 20px)",
                padding: "clamp(22px, 3.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "0 10px 32px -6px rgba(26, 115, 232, 0.16)",
              }}
            >
              <div style={{
                fontFamily: t.fontMono,
                fontSize: 12.5,
                letterSpacing: "0.14em",
                color: "#1a73e8",
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 14,
                borderBottom: "1.5px solid #dbeafe",
              }}>
                <span style={{ fontSize: 15 }}>✓</span> {c.afterLabel}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.afterItems.map((item, i) => {
                  const hasColon = item.includes(":");
                  const title = hasColon ? item.split(":")[0].trim() : "";
                  const desc = hasColon ? item.split(":").slice(1).join(":").trim() : item;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        padding: "14px 16px",
                        borderRadius: 14,
                        background: "#ffffff",
                        border: "1px solid #bfdbfe",
                        boxShadow: "0 2px 10px rgba(26, 115, 232, 0.06)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#dcfce7",
                        color: "#15803d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: 2,
                      }}>
                        ✓
                      </div>
                      <div style={{
                        fontSize: "clamp(16px, 1.7vw, 17.5px)",
                        lineHeight: 1.65,
                        color: "#0f172a",
                        fontWeight: 500,
                        fontFamily: t.fontBody,
                      }}>
                        {title && (
                          <span style={{
                            display: "block",
                            fontWeight: 700,
                            color: "#1a73e8",
                            fontSize: "clamp(16.5px, 1.8vw, 18px)",
                            marginBottom: 3,
                          }}>
                            {title}
                          </span>
                        )}
                        {desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}

