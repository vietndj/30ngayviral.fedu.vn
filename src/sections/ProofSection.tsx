import React, { useState, useEffect } from "react";
import { useContent, GoalCarouselItem } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

function ZaloProofCarousel({ items }: { items: GoalCarouselItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

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
    <div className="cl-zalo-carousel" style={{ margin: "0 auto", width: "100%", maxWidth: 360 }}>
      {/* Phone Mockup Screen */}
      <div
        className="cl-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

      {/* Navigation Controls */}
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

      {/* Caption & Title */}
      <div className="cl-carousel-caption" style={{ textAlign: "center", marginTop: 14 }}>
        <span className="cl-carousel-caption-tag" style={{ color: "#16a34a", fontWeight: 700, fontSize: 12 }}>
          {current.tag}
        </span>
        <h5 className="cl-carousel-caption-title" style={{ fontSize: 16, margin: "6px 0 4px", color: "#111827" }}>
          {current.title}
        </h5>
        <p className="cl-carousel-caption-desc" style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
          {current.desc}
        </p>
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

export function ProofSection() {
  const c = useContent();
  const t = useTheme();
  const [isMuted, setIsMuted] = useState(true);
  const [activeYoutubeModal, setActiveYoutubeModal] = useState<string | null>(null);

  // Lấy danh sách 5 ảnh Zalo từ Goal 02
  const goalWithCarousel = c.coreGoals?.find((g) => g.carousel && g.carousel.length > 0);
  const zaloItems = goalWithCarousel?.carousel || [];

  return (
    <Sec maxWidth={1020} id="sec-proof">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>// BẰNG CHỨNG NGƯỜI THẬT VIỆC THẬT</Label>
          <SH typed>Tự tay làm được clip thật — Và luôn có Thầy đồng hành sửa từng nhát cắt</SH>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(16.5px, 1.8vw, 18.5px)",
            lineHeight: 1.75,
            color: "var(--cl-text-muted, #64748b)",
            maxWidth: 740,
            margin: "16px auto 0",
            textWrap: "balance",
          }}>
            Không sợ bị đem con bỏ chợ hay mò mẫm một mình. Đây là thành phẩm học viên tự quay bằng 1 điện thoại và những tin nhắn Thầy Việt trực tiếp đồng hành, sửa bài và video call hỗ trợ:
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "clamp(24px, 4vw, 40px)",
          alignItems: "start",
          background: "var(--cl-card, #ffffff)",
          border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
          borderRadius: "var(--cl-radius, 24px)",
          padding: "clamp(24px, 4vw, 40px)",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
        }}>
          {/* ════════ CỘT 1: VIDEO THÀNH PHẨM HỌC VIÊN THỰC TẾ ════════ */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontFamily: t.fontMono,
              fontSize: 12,
              fontWeight: 700,
              color: "#059669",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              <span>🎬</span> 01 · THÀNH PHẨM HỌC VIÊN TỰ QUAY
            </div>

            {/* Khung video dọc 9:16 tự động chạy sạch sẽ */}
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: 290,
              aspectRatio: "9 / 16",
              borderRadius: 22,
              overflow: "hidden",
              background: "#f8fafc",
              border: "1.5px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.12)",
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

              {/* Overlay Nút YouTube */}
              <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
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

              {/* Nút bật/tắt tiếng */}
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

            {/* Chú thích */}
            <div style={{ marginTop: 14, textAlign: "center", maxWidth: 360 }}>
              <div style={{
                fontFamily: t.fontBody,
                fontSize: 16.5,
                fontWeight: 700,
                color: "var(--cl-text-base, #111827)",
                marginBottom: 4,
                textWrap: "balance",
              }}>
                Thực hành Walk &amp; Talk tự quay 1 mình
              </div>
              <div style={{
                fontFamily: t.fontBody,
                fontSize: 14.5,
                color: "var(--cl-text-muted, #64748b)",
                lineHeight: 1.55,
                textWrap: "balance",
              }}>
                Vừa đi vừa nói chuyện tự nhiên bằng điện thoại, ngắt nhịp thở 1 dòng, không cần kịch bản dài dòng, cuốn hút người xem đến giây cuối cùng.
              </div>
            </div>
          </div>

          {/* ════════ CỘT 2: CAROUSEL 5 TIN NHẮN ZALO RA ĐƠN ĐÀNG HOÀNG ════════ */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(26, 115, 232, 0.08)",
              border: "1px solid rgba(26, 115, 232, 0.25)",
              fontFamily: t.fontMono,
              fontSize: 12,
              fontWeight: 700,
              color: "var(--cl-accent, #1a73e8)",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              <span>💬</span> 02 · ĐẶC QUYỀN ĐỒNG HÀNH: THẦY TRỰC TIẾP HỖ TRỢ
            </div>

            <ZaloProofCarousel items={zaloItems} />
          </div>
        </div>
      </FadeIn>

      {/* 3 Cam kết cốt lõi dưới chân khối proof */}
      <FadeIn delay={150}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 14,
          marginTop: 24,
        }}>
          {[
            { icon: "🛡️", title: "Không giật tít, làm màu", desc: "Bảo toàn 100% thể diện & uy tín làm nghề nhiều năm của bạn." },
            { icon: "🎯", title: "300–500 view đúng tệp", desc: "Khách có tiền họ xem kỹ và chủ động nhắn tin Zalo xin tư vấn lịch thiệp." },
            { icon: "👨‍🏫", title: "Thầy trực tiếp sửa bài", desc: "Nộp clip lên là Thầy chỉ từng câu thừa, nhát vấp, cần là mở Video Call chỉ ngay." },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.06))",
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: t.fontBody, fontSize: 15, fontWeight: 700, color: "#111827" }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: t.fontBody, fontSize: 13.5, color: "#64748b", lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

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
            zIndex: 99999,
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
              position: "relative",
              width: "100%",
              aspectRatio: "9 / 16",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeModal}?autoplay=1&rel=0&modestbranding=1`}
                title="Học viên thực hành Walk & Talk"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </Sec>
  );
}
