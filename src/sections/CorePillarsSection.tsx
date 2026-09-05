import React, { useState, useEffect } from "react";
import { useContent, GoalCarouselItem, GoalContrast } from "../content";
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
      {/* ════════ TẦNG 1: 2 KẾT QUẢ ĐẦU RA (HERO OUTCOMES - BỐ CỤC DỌC 2 HÀNG) ════════ */}
      <FadeIn delay={100}>
        <div className="cl-goals-stack">
          {c.coreGoals?.map((g, idx) => (
            <div
              key={g.id}
              className="cl-goal-row apple-card-stagger"
              style={{
                "--card-delay": `${idx * 120}ms`,
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
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
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
                        letterSpacing: "0.12em",
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
                  <h3 className="cl-sh" style={{
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    fontWeight: 500,
                    letterSpacing: "-0.018em",
                    lineHeight: 1.22,
                    color: "var(--cl-text-base, #111827)",
                    margin: 0,
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
                    margin: 0,
                  }}>
                    {g.desc}
                  </p>

                  {/* Bullets */}
                  {g.bullets && g.bullets.length > 0 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 11,
                      padding: "16px 0 4px",
                      borderTop: "1px dashed var(--cl-line, rgba(0,0,0,0.08))",
                    }}>
                      {g.bullets.map((b, bIdx) => (
                        <div key={bIdx} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "var(--cl-text-base, #1f2937)",
                        }}>
                          <span style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: idx === 0 ? "rgba(26, 115, 232, 0.12)" : "rgba(22, 163, 74, 0.12)",
                            color: idx === 0 ? "var(--cl-accent, #1a73e8)" : "#16a34a",
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

                  {/* Pro-Tip Callout Box: Cân bằng chiều cao hoàn hảo cho Khối 01 */}
                  {idx === 0 && (
                    <div className="cl-goal-tip-box">
                      <div className="cl-goal-tip-header">
                        <span>💡</span>
                        <strong>LỜI KHUYÊN THỰC CHIẾN TỪ GIẢNG VIÊN</strong>
                      </div>
                      <p className="cl-goal-tip-text">
                        "Chỉ cần 1 góc bàn đủ sáng và chiếc điện thoại kê chắc chắn. Video đầu tiên là để phá vỡ nỗi sợ bấm máy — tập trung vào thao tác tay mộc mạc và nói đúng việc, không cần mặt đẹp, không cần phòng thu."
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
                        caption={g.videoCaption || "Video thị phạm thực tế"}
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

              {/* ── Dải So Sánh Toàn Cảnh: Trải rộng Full-Width dưới chân Khối 02 ── */}
              {g.contrast && (
                <div className="cl-goal-contrast-section">
                  <div className="cl-goal-contrast-header">
                    <span className="cl-goal-contrast-tag">// BẢN CHẤT CHUYỂN ĐỔI BỀN VỮNG</span>
                    <h4 className="cl-goal-contrast-title">Tại sao chúng tôi không dạy bạn đua "triệu view" vô nghĩa?</h4>
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

// ── Goal Contrast Box (PA2: Bẫy 1.2M view vs Chuẩn 480 view FEDU) ──
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
                  <span style={{ color: "#dc2626", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>✕</span>
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
                  <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>✓</span>
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

      {/* Real Case Description Strip */}
      <div className="cl-carousel-caption">
        <span className="cl-carousel-caption-tag">{current.tag}</span>
        <div className="cl-carousel-caption-title">{current.title}</div>
        <div className="cl-carousel-caption-desc">{current.desc}</div>
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

            <div className="cl-lightbox-footer">
              <p className="cl-lightbox-desc">{current.desc}</p>
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


