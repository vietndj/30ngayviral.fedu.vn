import React, { useState, useEffect } from "react";
import { useContent, GoalCarouselItem, GoalContrast } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function CorePillarsSection({ isV2 = false }: { isV2?: boolean }) {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={1020} id="core-pillars">
      {/* ── Section Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.coreGoalsLabel || "2 KẾT QUẢ THỰC TẾ"}</Label>
          <SH>{c.coreGoalsHeading || "Không cần khiếu ăn nói hay máy ảnh đắt tiền để có một video đàng hoàng."}</SH>
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
                    fontSize: "clamp(17px, 1.85vw, 19px)",
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

      {/* ════════ TẦNG 1: 2 KẾT QUẢ ĐẦU RA (HERO OUTCOMES - BỐ CỤC DỌC 2 HÀNG) ════════ */}
      <FadeIn delay={100}>
        <div className="cl-goals-stack">
          {c.coreGoals?.map((g, idx) => (
            <div
              key={g.id}
              className="cl-goal-row"
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

              <div className="cl-goal-row-grid">
                {/* ── Left Column: Content & Description (55%) ── */}
                <div className="cl-goal-row-content">
                  {/* Tag & Highlight Badge */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
                      background: idx === 0 ? "rgba(26, 115, 232, 0.08)" : "rgba(22, 163, 74, 0.08)",
                      border: `1.5px solid ${idx === 0 ? "rgba(26, 115, 232, 0.25)" : "rgba(22, 163, 74, 0.25)"}`,
                      borderRadius: 8,
                      padding: "6px 14px",
                    }}>
                      {g.tag}
                    </span>
                    {g.highlight && (
                      <span style={{
                        fontFamily: t.fontMono,
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}>
                        ✓ {g.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="cl-sh" style={{
                    fontSize: "clamp(24px, 2.8vw, 32px)",
                    fontWeight: 500,
                    letterSpacing: "-0.018em",
                    lineHeight: 1.25,
                    color: "var(--cl-text-base, #111827)",
                    margin: 0,
                    textWrap: "balance",
                  }}>
                    {g.title}
                  </h3>

                  {/* Description: Tách đoạn theo nhịp đọc */}
                  <div style={{
                    fontFamily: t.fontBody,
                    fontSize: "clamp(16.5px, 1.8vw, 18.5px)",
                    lineHeight: 1.75,
                    color: "var(--cl-text-body, #374151)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}>
                    {g.desc.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} style={{ margin: 0, textWrap: "pretty" }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Bullets */}
                  {g.bullets && g.bullets.length > 0 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      padding: "18px 0 4px",
                      borderTop: "1px dashed var(--cl-line, rgba(0,0,0,0.1))",
                    }}>
                      {g.bullets.map((b, bIdx) => {
                        const colonIdx = b.indexOf(":");
                        const hasColon = colonIdx > -1;
                        const boldPart = hasColon ? b.slice(0, colonIdx + 1) : "";
                        const restPart = hasColon ? b.slice(colonIdx + 1) : b;

                        return (
                          <div key={bIdx} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            fontSize: 16.5,
                            lineHeight: 1.65,
                            color: "var(--cl-text-base, #1f2937)",
                          }}>
                            <span style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: idx === 0 ? "rgba(26, 115, 232, 0.12)" : "rgba(22, 163, 74, 0.12)",
                              color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              fontWeight: 700,
                              flexShrink: 0,
                              marginTop: 2,
                            }}>
                              ✓
                            </span>
                            <span style={{ textWrap: "pretty" }}>
                              {hasColon ? (
                                <>
                                  <strong style={{ fontWeight: 600, color: "var(--cl-text-base, #111827)" }}>{boldPart}</strong>
                                  {restPart}
                                </>
                              ) : (
                                b
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pro-Tip Callout Box: Cân bằng chiều cao hoàn hảo cho Khối 01 */}
                  {idx === 0 && (
                    <div className="cl-goal-tip-box">
                      <div className="cl-goal-tip-header">
                        <span>💡</span>
                        <strong>LỜI KHUYÊN THỰC CHIẾN</strong>
                      </div>
                      <p className="cl-goal-tip-text">
                        "Chỉ cần một góc bàn đủ sáng và chiếc điện thoại kê chắc chắn. Video đầu tiên là để vượt qua cảm giác ngượng ngùng — tập trung vào thao tác tay mộc mạc và nói đúng việc, không cần phòng thu, không cần diễn."
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Right Column: Visual Showcase (45%) ── */}
                <div className="cl-goal-row-visual">
                  {g.video ? (
                    <div style={{
                      width: "100%",
                      maxWidth: 270,
                      borderRadius: 22,
                      overflow: "hidden",
                      border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                      background: "var(--cl-card, #f8f9fa)",
                      boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.1)",
                      padding: "8px 8px 6px",
                    }}>
                      <AppYTEmbed
                        url={g.video}
                        caption={g.videoCaption}
                        maxWidth={260}
                      />
                    </div>
                  ) : g.carousel && g.carousel.length > 0 ? (
                    <GoalZaloCarousel items={g.carousel} />
                  ) : g.image ? (
                    <div style={{
                      width: "100%",
                      maxWidth: 290,
                      borderRadius: 22,
                      overflow: "hidden",
                      border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                      background: "var(--cl-card, #f8f9fa)",
                      boxShadow: "0 10px 28px -8px rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                    }}>
                      <img
                        src={g.image}
                        alt={g.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          borderRadius: 16,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              {/* ── Dải So Sánh Toàn Cảnh: Trải rộng Full-Width dưới chân Khối 02 (Chỉ hiện ở bản V1, ẩn ở bản V2 để cân đối) ── */}
              {g.contrast && !isV2 && (
                <div className="cl-goal-contrast-section">
                  <div className="cl-goal-contrast-header">
                    <span className="cl-goal-contrast-tag">// CHIẾN LƯỢC NỘI DUNG THỰC CHIẾN</span>
                    <h4 className="cl-goal-contrast-title">Làm chủ công thức Viral nhưng giữ trọn vị thế người làm nghề</h4>
                    <p style={{
                      fontFamily: t.fontBody,
                      fontSize: 17,
                      lineHeight: 1.7,
                      color: "var(--cl-text-body, #4b5563)",
                      margin: "6px 0 0",
                    }}>
                      Viral để bán hàng hoàn toàn khác với làm trò lố để câu view giải trí. Khóa học dạy bạn cách chạm thuật toán để video tiếp cận hàng trăm nghìn người — nhưng mỗi người xem đều là một khách hàng tiềm năng thực sự.
                    </p>
                  </div>
                  <GoalContrastBox contrast={g.contrast} />
                </div>
              )}
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
                  fontSize: 16,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#d97706",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 4,
                }}>
                  {c.corePillarsLabel || "3 ĐIỂM TỰA THỰC CHIẾN"}
                </span>
                <h4 style={{
                  fontFamily: t.fontBody,
                  fontSize: 20,
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
              fontSize: 16,
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
            {c.corePillars?.map((p) => (
              <div
                key={p.id}
                className="apple-pill-card"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  borderRadius: 14,
                  padding: "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 12,
                  boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    marginBottom: 10,
                  }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 16,
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
                        fontSize: 16,
                        color: "var(--cl-text-muted, #6b7280)",
                        fontWeight: 600,
                      }}>
                        {p.highlight}
                      </span>
                    )}
                  </div>

                  <h5 style={{
                    fontFamily: t.fontBody,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--cl-text-base, #111827)",
                    margin: "0 0 8px",
                    lineHeight: 1.35,
                  }}>
                    {p.title}
                  </h5>

                  <p style={{
                    fontFamily: t.fontBody,
                    fontSize: 16.5,
                    lineHeight: 1.7,
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

// ── Goal Contrast Box (Chiến lược Viral chuyển đổi chuẩn nghề) ──
function GoalContrastBox({ contrast }: { contrast: GoalContrast }) {
  return (
    <div className="cl-contrast-box">
      <div className="cl-contrast-grid">
        {/* Negative / Bad Column */}
        <div className="cl-contrast-card cl-contrast-card--bad">
          <div>
            <div className="cl-contrast-title">{contrast.badTitle}</div>
            <div className="cl-contrast-views">{contrast.badViews}</div>
            <div className="cl-contrast-list">
              {contrast.badItems.map((item, i) => (
                <div key={i} className="cl-contrast-list-item">
                  <span style={{ color: "#dc2626", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cl-contrast-conclusion">{contrast.badConclusion}</div>
        </div>

        {/* Positive / Good Column */}
        <div className="cl-contrast-card cl-contrast-card--good">
          <div>
            <div className="cl-contrast-title">{contrast.goodTitle}</div>
            <div className="cl-contrast-views">{contrast.goodViews}</div>
            <div className="cl-contrast-list">
              {contrast.goodItems.map((item, i) => (
                <div key={i} className="cl-contrast-list-item">
                  <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cl-contrast-conclusion">{contrast.goodConclusion}</div>
        </div>
      </div>
    </div>
  );
}

// ── Goal Zalo Carousel (5 Hội Thoại Khách Thật & Chữa Bài Thực Chiến) ──
function GoalZaloCarousel({ items }: { items: GoalCarouselItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStart(null);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, items.length]);

  const current = items[activeIdx] || items[0];
  if (!current) return null;

  return (
    <div className="cl-zalo-carousel">
      {/* Phone Mockup Screen */}
      <div
        className="cl-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Zoom Hint */}
        <button
          type="button"
          className="cl-carousel-zoom-hint"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Phóng to xem rõ tin nhắn"
          title="Phóng to xem rõ tin nhắn"
        >
          🔍 Phóng to xem
        </button>

        <div
          className="cl-carousel-stage"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {items.map((it, idx) => (
            <div key={it.id || idx} className="cl-carousel-slide">
              <img
                src={it.image}
                alt={it.title}
                loading={idx === 0 ? "eager" : "lazy"}
                onClick={() => setIsLightboxOpen(true)}
                title="Bấm để phóng to xem tin nhắn"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Prev, Dots, Counter, Next */}
      <div className="cl-carousel-nav">
        <button
          type="button"
          onClick={handlePrev}
          className="cl-carousel-btn"
          aria-label="Xem tin nhắn trước"
          title="Tin nhắn trước"
        >
          ‹
        </button>

        <div className="cl-carousel-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`cl-carousel-dot ${idx === activeIdx ? "is-active" : ""}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="cl-carousel-counter">
          0{activeIdx + 1} / 0{items.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="cl-carousel-btn"
          aria-label="Xem tin nhắn tiếp theo"
          title="Tin nhắn tiếp theo"
        >
          ›
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="cl-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="cl-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cl-lightbox-header">
              <div className="cl-lightbox-title-group">
                <span className="cl-lightbox-tag">{current.tag}</span>
                <h4 className="cl-lightbox-title">{current.title}</h4>
              </div>
              <button
                type="button"
                className="cl-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Đóng"
                title="Đóng (Esc)"
              >
                ✕
              </button>
            </div>

            <div className="cl-lightbox-body">
              <img
                src={current.image}
                alt={current.title}
                className="cl-lightbox-img"
              />
            </div>

            <div className="cl-lightbox-footer" style={{ justifyContent: "center" }}>
              <div className="cl-lightbox-controls">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="cl-carousel-btn"
                  aria-label="Tin trước"
                  title="Trước (←)"
                >
                  ‹
                </button>
                <span className="cl-carousel-counter">
                  0{activeIdx + 1} / 0{items.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="cl-carousel-btn"
                  aria-label="Tin tiếp theo"
                  title="Sau (→)"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


