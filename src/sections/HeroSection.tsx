import React, { useState, useEffect } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, SH, MediaSection } from "../components/ui";

export function HeroSection() {
  const c = useContent();
  const t = useTheme();
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── MÀN HÌNH 1: TYPOGRAPHY LỚN & THOÁNG MẮT (KHÔNG CÓ VIDEO) ── */}
      <section className="cl-hero-canvas" style={{ minHeight: "82vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* ── 1. NGUỒN SÁNG ĐỎ REC TALLY & ANAMORPHIC FLARE ── */}
        <div className="cl-hero-rec-glow" aria-hidden="true" />
        <div className="cl-hero-flare" aria-hidden="true" />

        {/* ── 2. HỌA TIẾT KHUNG NGẮM CAMERA VIEWFINDER HUD ── */}
        <div className="cl-hero-hud" aria-hidden="true">
          <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 4 Góc Crop Khung hình [  ] */}
            <path d="M40 90 V40 H90" stroke="var(--cl-accent, #e11d48)" strokeWidth="1.5" />
            <path d="M960 90 V40 H910" stroke="var(--cl-accent, #e11d48)" strokeWidth="1.5" />
            <path d="M40 510 V560 H90" stroke="var(--cl-accent, #e11d48)" strokeWidth="1.5" />
            <path d="M960 510 V560 H910" stroke="var(--cl-accent, #e11d48)" strokeWidth="1.5" />

            {/* Lưới Quy tắc 1/3 (Rule of Thirds) */}
            <line x1="333" y1="40" x2="333" y2="560" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 6" />
            <line x1="666" y1="40" x2="666" y2="560" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 6" />
            <line x1="40" y1="200" x2="960" y2="200" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 6" />
            <line x1="40" y1="400" x2="960" y2="400" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 6" />

            {/* Vòng tròn Focus Ring & Dấu tâm ngắm */}
            <circle cx="500" cy="300" r="140" stroke="var(--cl-accent, #e11d48)" strokeWidth="1" strokeDasharray="8 8" opacity="0.45" />
            <circle cx="500" cy="300" r="6" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            <line x1="480" y1="300" x2="520" y2="300" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            <line x1="500" y1="280" x2="500" y2="320" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

            {/* Thông số kỹ thuật Cinema HUD */}
            <text x="110" y="60" fill="var(--cl-accent, #e11d48)" fontFamily="var(--cl-font-mono, monospace)" fontSize="12" letterSpacing="2">● REC 00:00:01:24</text>
            <text x="110" y="80" fill="#a1a1aa" fontFamily="var(--cl-font-mono, monospace)" fontSize="11" letterSpacing="1">4K 60FPS · 10-BIT LOG</text>
            <text x="890" y="60" textAnchor="end" fill="#a1a1aa" fontFamily="var(--cl-font-mono, monospace)" fontSize="11" letterSpacing="1">ISO 400 · WB 5600K</text>
          </svg>
        </div>

        {/* ── 3. NỘI DUNG HERO CHÍNH (TYPOGRAPHY 3 TẦNG SIÊU THOÁNG) ── */}
        <div style={{
          opacity: heroReady ? 1 : 0,
          transform: heroReady ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
          padding: "clamp(80px, 12vw, 130px) 20px 56px",
          position: "relative",
          zIndex: 2,
        }}>
          {/* Tầng 1: Tag định vị Cinema REC */}
          <div className="cl-badge--cinema">
            <span className="cl-badge--cinema-rec" />
            <span>REC // LỘ TRÌNH 30 NGÀY BẰNG ĐIỆN THOẠI · FEDU.VN</span>
          </div>

          {/* Tầng 2: Tiêu đề H1 Siêu To - Quyền lực & Trọng tâm */}
          <h1 className="cl-hero__h1" style={{
            margin: 0,
            fontSize: "clamp(36px, 5.8vw, 62px)",
            lineHeight: 1.14,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            color: "#f4f4f5",
            fontFamily: t.fontDisplay,
            maxWidth: 900,
            textWrap: "balance",
          }}>
            Lộ trình 30 ngày làm chủ video ngắn
          </h1>

          {/* Tầng 3: 1 Câu Lời hứa cốt lõi gộp trọn giá trị */}
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(16px, 2vw, 20.5px)",
            lineHeight: 1.8,
            color: "#d4d4d8",
            margin: 0,
            maxWidth: "54ch",
            textWrap: "balance",
          }}>
            Bản thiết kế từng bước biến chiếc điện thoại thành cỗ máy hút view & ra đơn. Học bài nào — cầm máy lên ra ngay video chuẩn bài đó.
          </p>

          {/* Nút cuộn khám phá duy nhất */}
          <div style={{ marginTop: 12 }}>
            <a
              href="#video-preview"
              onClick={(e) => { e.preventDefault(); document.getElementById("video-preview")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cl-btn cl-btn--solid"
              style={{ fontSize: 16, padding: "16px 42px", borderRadius: 12, fontWeight: 700 }}
            >
              KHÁM PHÁ LỘ TRÌNH 30 NGÀY ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── MÀN HÌNH 2: XUẤT HIỆN KHI CUỘN XUỐNG (KHUNG IPHONE 17 PRO PHÁT VIDEO) ── */}
      <section id="video-preview" style={{
        position: "relative",
        padding: "56px 20px 72px",
        maxWidth: 860,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <FadeIn>
          <div className="cl-label" style={{ marginBottom: 12 }}>
            <span style={{ opacity: 0.4 }}>// </span>Trải nghiệm trực quan
          </div>
          <h2 className="cl-sh" style={{ fontFamily: t.fontDisplay, marginBottom: 36, fontSize: "clamp(24px, 3.5vw, 36px)", color: "#f4f4f5" }}>
            Xem video thực tế bên trong chương trình
          </h2>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="cl-hero-phone-mockup">
              {/* Dynamic Island iPhone 17 Pro */}
              <div style={{
                position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
                width: 72, height: 16, background: "#000", borderRadius: 20, zIndex: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#08081a", border: "1px solid #14142b" }} />
              </div>

              {/* Màn hình tỷ lệ iPhone 19.5 : 9 */}
              <div style={{ position: "relative", paddingBottom: "216.6%", height: 0, overflow: "hidden", borderRadius: 39, background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${(c as any).heroVideoYoutubeId || "eg6T8-SekjQ"}?rel=0&modestbranding=1&showinfo=0`}
                  title="Giới thiệu khóa học"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Home Indicator Bar */}
              <div style={{
                position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
                width: 90, height: 3.5, background: "rgba(255,255,255,0.3)", borderRadius: 2, zIndex: 10,
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </FadeIn>
      </section>
      <MediaSection blockId="hero" />
    </>
  );
}

{/* 1B: 2 VIỆC CỐT LÕI KHI CẦM ĐIỆN THOẠI LÊN (NẰM TRONG TẦNG TRẮNG) */}
export function HeroCoreSkills() {
  const t = useTheme();

  return (
    <section style={{ 
      position: "relative", padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 24px) clamp(40px, 6vw, 64px)", maxWidth: 900, margin: "0 auto", 
      textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <FadeIn>
        <div className="cl-label" style={{ marginBottom: 12 }}>
          <span style={{ opacity: 0.4 }}>// </span>Chuẩn đầu ra thực tế
        </div>
        <h2 className="cl-sh" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(26px, 4vw, 38px)", maxWidth: 760, margin: "0 auto 16px", textWrap: "balance" }}>
          Bạn không cần máy ảnh đắt tiền.<br />
          Bạn chỉ cần làm đúng 2 việc này khi cầm điện thoại lên:
        </h2>
        <p style={{
          fontFamily: t.fontBody, fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.8,
          color: "var(--cl-text-body, #374151)", maxWidth: "58ch", margin: "0 auto", textWrap: "balance",
        }}>
          Lộ trình 30 ngày bỏ qua mọi lý thuyết phức tạp, tập trung rèn luyện 2 kỹ năng thực chiến giúp video của bạn sáng rõ, chuyên nghiệp và ra đơn:
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 20,
          width: "100%", maxWidth: 860, margin: "40px auto 0", textAlign: "left",
        }}>
          {/* Việc 1: Đặt máy & Ánh sáng */}
          <div className="cl-card" style={{
            padding: "clamp(24px, 4vw, 32px) clamp(20px, 3.5vw, 28px)",
            display: "flex", flexDirection: "column", gap: 18,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.15em",
                color: "var(--cl-text-muted, #64748b)", fontWeight: 700, textTransform: "uppercase",
              }}>
                KỸ NĂNG 01
              </span>
              <span style={{
                fontFamily: t.fontMono, fontSize: 11.5, letterSpacing: "0.08em",
                color: "var(--cl-text-muted, #94a3b8)",
              }}>
                [ ĐẶT MÁY & ÁNH SÁNG ]
              </span>
            </div>

            <h3 style={{
              fontFamily: t.fontBody, fontSize: "clamp(18px, 3vw, 21px)", fontWeight: 700,
              color: "var(--cl-text-base, #09090b)", margin: 0, lineHeight: 1.35,
            }}>
              Hình ảnh sáng rõ, sạch sẽ & thấy rõ giá trị sản phẩm
            </h3>
            
            <div style={{
              display: "flex", flexDirection: "column", gap: 14, fontSize: 14.5, lineHeight: 1.65,
              borderTop: "1px solid var(--cl-line, #f1f5f9)", paddingTop: 16,
            }}>
              <div>
                <div style={{
                  color: "#94a3b8", fontSize: 11.5, fontFamily: t.fontMono,
                  fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4,
                }}>
                  ✕ TRƯỚC ĐÂY
                </div>
                <p style={{ margin: 0, color: "var(--cl-text-muted, #64748b)" }}>
                  Đặt máy ngược sáng làm mặt tối thui; góc quay từ dưới lên lộ góc chết; phông nền bừa bộn; quay sản phẩm mờ mịt khiến khách nghi ngờ chất lượng.
                </p>
              </div>

              <div>
                <div style={{
                  color: "#16a34a", fontSize: 11.5, fontFamily: t.fontMono,
                  fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4,
                }}>
                  ✓ SAU 30 NGÀY
                </div>
                <p style={{ margin: 0, color: "var(--cl-text-body, #18181b)", fontWeight: 500 }}>
                  Biết mượn ánh sáng tự nhiên để da sáng mịn; biết đổi góc quay sang sát chi tiết (đường may, chất kem, thao tác tay) để khách nhìn thấy tận mắt là muốn mua.
                </p>
              </div>
            </div>
          </div>

          {/* Việc 2: Cắt ghép giữ chân */}
          <div className="cl-card" style={{
            padding: "clamp(24px, 4vw, 32px) clamp(20px, 3.5vw, 28px)",
            display: "flex", flexDirection: "column", gap: 18,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.15em",
                color: "var(--cl-text-muted, #64748b)", fontWeight: 700, textTransform: "uppercase",
              }}>
                KỸ NĂNG 02
              </span>
              <span style={{
                fontFamily: t.fontMono, fontSize: 11.5, letterSpacing: "0.08em",
                color: "var(--cl-text-muted, #94a3b8)",
              }}>
                [ CẮT GHÉP & GIỮ CHÂN ]
              </span>
            </div>

            <h3 style={{
              fontFamily: t.fontBody, fontSize: "clamp(18px, 3vw, 21px)", fontWeight: 700,
              color: "var(--cl-text-base, #09090b)", margin: 0, lineHeight: 1.35,
            }}>
              Nói vấp thoải mái, video xem mượt mà không chán
            </h3>
            
            <div style={{
              display: "flex", flexDirection: "column", gap: 14, fontSize: 14.5, lineHeight: 1.65,
              borderTop: "1px solid var(--cl-line, #f1f5f9)", paddingTop: 16,
            }}>
              <div>
                <div style={{
                  color: "#94a3b8", fontSize: 11.5, fontFamily: t.fontMono,
                  fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4,
                }}>
                  ✕ TRƯỚC ĐÂY
                </div>
                <p style={{ margin: 0, color: "var(--cl-text-muted, #64748b)" }}>
                  Ngồi nói 1 góc máy như trả bài làm người xem lướt qua sau 3 giây; nói vấp một từ là phải quay lại từ đầu mất cả buổi.
                </p>
              </div>

              <div>
                <div style={{
                  color: "#16a34a", fontSize: 11.5, fontFamily: t.fontMono,
                  fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4,
                }}>
                  ✓ SAU 30 NGÀY
                </div>
                <p style={{ margin: 0, color: "var(--cl-text-body, #18181b)", fontWeight: 500 }}>
                  Cứ nói vấp thoải mái. Bạn sẽ biết cách cắt đoạn lỗi rồi chèn ảnh feedback / video thực tế đè lên để che vết cắt; thêm âm thanh nhỏ giữ chân người xem đến lúc báo giá.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
