import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function ModulesSection() {
  const c = useContent();
  const t = useTheme();
  const [activeStage, setActiveStage] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isNavClickRef = useRef(false);
  const navClickTimeoutRef = useRef<number | null>(null);

  const modulesList = c.modules || [];

  const navMeta = [
    { n: "BƯỚC 01", time: "KỊCH BẢN", title: "Kịch bản 1 dòng", desc: "Mở máy lên là nói tự nhiên" },
    { n: "BƯỚC 02", time: "GÓC MÁY", title: "Góc máy điện thoại", desc: "Khung hình sáng rõ, đĩnh đạc" },
    { n: "BƯỚC 03", time: "CHUYỂN CẢNH", title: "Chuyển cảnh tàng hình", desc: "Kỹ nghệ giấu vết cắt mượt mà" },
    { n: "BƯỚC 04", time: "CAPCUT & AI", title: "Biên tập CapCut & AI", desc: "Tiết kiệm 80% thời gian" },
    { n: "BƯỚC 05", time: "KỂ CHUYỆN", title: "Video Storytelling", desc: "Chạm cảm xúc, ra đơn Zalo" },
  ];

  // Silky smooth scrollspy tracking without scroll jitter
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (isNavClickRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerPoint = window.innerHeight * 0.35;
          let currentIdx = 0;
          cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
              currentIdx = idx;
            }
          });
          setActiveStage(currentIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    };
  }, [modulesList]);

  // Keep active button visible horizontally on mobile
  useEffect(() => {
    const btn = navBtnRefs.current[activeStage];
    if (btn && typeof window !== "undefined" && window.innerWidth <= 860) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeStage]);

  const handleNavClick = (idx: number) => {
    setActiveStage(idx);
    isNavClickRef.current = true;
    if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    navClickTimeoutRef.current = window.setTimeout(() => {
      isNavClickRef.current = false;
    }, 800);

    const targetEl = cardRefs.current[idx];
    if (targetEl) {
      const isMobile = window.innerWidth <= 860;
      const topOffset = isMobile ? 64 : 90;
      const elPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Sec maxWidth={1020} id="modules">
      {/* ── Section Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Label>{c.modulesLabel || "5 KHÓA HỌC THỰC CHIẾN TỪ A ĐẾN Z"}</Label>
          <SH typed>{c.modulesHeading || "Đủ 5 mắt xích khép kín để tự làm trọn vẹn video bán hàng ngay trên chiếc điện thoại:"}</SH>
          {c.modulesSub && (
            <p style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(15px, 1.7vw, 17px)",
              lineHeight: 1.7,
              color: "var(--cl-text-muted, #64748b)",
              maxWidth: 760,
              margin: "12px auto 0",
            }}>
              {c.modulesSub}
            </p>
          )}
        </div>
      </FadeIn>

      {/* ── Attio Sticky Scroll Layout ── */}
      <div className="cl-attio-scroll-layout">
        {/* Cột Trái: Sticky Sidebar Navigation */}
        <aside className="cl-attio-sticky-sidebar">
          <div className="cl-attio-sidebar-header">
            <div style={{
              fontFamily: t.fontMono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "var(--cl-accent)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}>
              {c.modulesSidebarTag || "5 ĐÒN BẨY HÌNH ẢNH"}
            </div>
            <h3 className="cl-attio-sidebar-title">
              {c.modulesSidebarTitle || "Hành Trình Tự Chủ"}
            </h3>
            <p className="cl-attio-sidebar-desc">
              {c.modulesSidebarDesc || "Cuộn chuột hoặc bấm từng bước:"}
            </p>
          </div>

          <nav className="cl-attio-sidebar-nav" aria-label="5 Khóa học">
            {modulesList.map((m, idx) => {
              const isActive = activeStage === idx;
              const meta = navMeta[idx] || { n: `BƯỚC 0${idx + 1}`, time: "", title: m.title, desc: "" };
              return (
                <button
                  key={m.id || idx}
                  ref={(el) => { navBtnRefs.current[idx] = el; }}
                  type="button"
                  onClick={() => handleNavClick(idx)}
                  className={`cl-attio-nav-btn ${isActive ? "is-active" : ""}`}
                >
                  <div className="cl-attio-nav-meta">
                    <span className="cl-attio-nav-tag">{meta.n}</span>
                    <span className="cl-attio-nav-time">{meta.time}</span>
                  </div>
                  <div className="cl-attio-nav-title">{meta.title}</div>
                </button>
              );
            })}
          </nav>
        </aside>

          {/* Cột Phải: Content Stream (5 Khối Lớn Thoáng Đạt) */}
          <main className="cl-attio-content-stream">
            {modulesList.map((m, idx) => {
              const isActive = activeStage === idx;
              return (
                <article
                  key={m.id || idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  data-stage-index={idx}
                  className={`cl-attio-stage-card ${isActive ? "is-active" : ""}`}
                >
                  {/* Header Card */}
                  <div className="cl-attio-card-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="cl-attio-badge">{m.tag || `BƯỚC 0${idx + 1}`}</span>
                      <span className="cl-attio-sub">KHÓA 0{idx + 1} / 05</span>
                    </div>
                    <h3 className="cl-attio-title">{m.title}</h3>
                    <p className="cl-attio-hook">"{m.hook}"</p>
                  </div>

                  {/* 3 Ý Nổi Bật */}
                  <div className="cl-attio-highlights">
                    {m.items?.map((item, itemIdx) => (
                      <div key={itemIdx} className="cl-attio-hl-item">
                        <span className="cl-attio-hl-icon">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mockup Window / Minh Họa Trực Quan Từng Bước */}
                  <div className="cl-mockup-window">
                    <div className="cl-mockup-topbar">
                      <div className="cl-mockup-dots">
                        <div className="cl-mockup-dot" style={{ background: "#ff5f56" }} />
                        <div className="cl-mockup-dot" style={{ background: "#ffbd2e" }} />
                        <div className="cl-mockup-dot" style={{ background: "#27c93f" }} />
                      </div>
                      <div className="cl-mockup-title">
                        {idx === 0 && "KỊCH BẢN 1 DÒNG · NÓI TỰ NHIÊN TRƯỚC ỐNG KÍNH"}
                        {idx === 1 && "QUY TẮC 3 CẢNH · QUAY CHUYÊN NGHIỆP BẰNG ĐIỆN THOẠI"}
                        {idx === 2 && "CHUYỂN CẢNH TÀNG HÌNH · CUT-ON-ACTION & CỠ CẢNH ĐIỆN ẢNH"}
                        {idx === 3 && "BIÊN TẬP CAPCUT 2 NÚT & ĐÒN BẨY TRỢ LÝ AI THỰC CHIẾN"}
                        {idx === 4 && "VIDEO STORYTELLING · KỂ CHUYỆN ĐỜI THỰC CHẠM CẢM XÚC RA ĐƠN"}
                      </div>
                    </div>

                    <div className="cl-mockup-body">
                      {/* Minh họa Khóa 1: Kịch bản 1 dòng */}
                      {idx === 0 && (
                        <div>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 12,
                            fontFamily: t.fontMono,
                            fontSize: 13,
                            lineHeight: 1.6,
                            background: "rgba(255, 255, 255, 0.03)",
                            padding: 14,
                            borderRadius: 8,
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            marginBottom: 14,
                          }}>
                            <div>
                              <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>
                                🎙️ CỘT 1: LỜI THOẠI (1 NHỊP THỞ)
                              </div>
                              <div style={{ color: "#e2e8f0" }}>
                                "Chị cứ tưởng làm video ngắn là phải máy xịn..."
                              </div>
                              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4 }}>
                                (5-7 từ · Liếc mắt là nói được ngay)
                              </div>
                            </div>
                            <div>
                              <div style={{ color: "#a855f7", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>
                                🎬 CỘT 2: THAO TÁC / B-ROLL
                              </div>
                              <div style={{ color: "#cbd5e1" }}>
                                Tay kê điện thoại lên cốc nước, đón nắng cửa sổ.
                              </div>
                              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4 }}>
                                (Đắp cảnh che 100% mắt liếc kịch bản)
                              </div>
                            </div>
                          </div>
                          <AppYTEmbed maxWidth={320} url={m.videoUrl || "https://www.facebook.com/reel/24909527728721206/"} caption={m.videoCaption || "Thầy Việt thị phạm: Làm thế nào lúc quay video không bị cứng đơ?"} />
                        </div>
                      )}

                      {/* Minh họa Khóa 2: Setup ánh sáng & góc máy */}
                      {idx === 1 && (
                        <div>
                          <div style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            padding: "12px 16px",
                            borderRadius: 8,
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            fontSize: 14,
                            color: "#94a3b8",
                            lineHeight: 1.6,
                            marginBottom: 14,
                          }}>
                            <span style={{ color: "#fbbf24", fontWeight: 600 }}>💡 Quy tắc 3 cảnh:</span> Tự quay bằng 1 điện thoại: Cảnh Rộng (Wide Shot) bao quát, Cảnh Trung (Medium Shot) trò chuyện, và Cảnh Cận (Close-up) đặc tả cảm xúc & chi tiết.
                          </div>
                          <AppYTEmbed maxWidth={320} url={m.videoUrl || "https://www.facebook.com/reel/775157861537584/"} caption={m.videoCaption || "Thầy Việt thị phạm: Quy tắc 3 cảnh Toàn - Trung - Cận bằng điện thoại"} />
                        </div>
                      )}

                      {/* Minh họa Khóa 3: Kỹ nghệ chuyển cảnh tàng hình (Từ video.fedu.vn) */}
                      {idx === 2 && (
                        <div>
                          <div style={{ fontFamily: t.fontMono, fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                            <div style={{
                              background: "#161b22",
                              borderRadius: 8,
                              padding: 14,
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                              marginBottom: 12,
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#38bdf8", fontWeight: 700, minWidth: 100 }}>01. CUT-ACTION:</span>
                                <span style={{ color: "#cbd5e1" }}>Mượn chuyển động tay / đồ vật làm cầu nối tàng hình</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#a855f7", fontWeight: 700, minWidth: 100 }}>02. CỠ CẢNH:</span>
                                <span style={{ color: "#e2e8f0" }}>Luân chuyển Toàn - Trung - Cận mỗi 3 giây giữ nhịp thở</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#10b981", fontWeight: 700, minWidth: 100 }}>03. B-ROLL:</span>
                                <span style={{ color: "#86efac" }}>Cảnh trám thực tế đắp đè lên đoạn nói vấp (Che 100% vết cắt)</span>
                              </div>
                            </div>
                            <div style={{
                              padding: "10px 14px",
                              background: "rgba(56, 189, 248, 0.08)",
                              border: "1px solid rgba(56, 189, 248, 0.2)",
                              borderRadius: 6,
                              color: "#bae6fd",
                              fontSize: 13,
                            }}>
                              🎬 Bí quyết video.fedu.vn: Sự mượt mà không đến từ hiệu ứng lật trang 3D sến súa — nó đến từ chuyển động vật lý thật đánh lừa thị giác.
                            </div>
                          </div>
                          <AppYTEmbed maxWidth={320} url={m.videoUrl || "https://www.facebook.com/reel/1735902844239442/"} caption={m.videoCaption || "Thầy Việt thị phạm: 2 nguyên tắc Match Cut 'tàng hình' mọi vết cắt vấp (từ video.fedu.vn)"} />
                        </div>
                      )}

                      {/* Minh họa Khóa 4: Dựng CapCut & Đòn bẩy AI */}
                      {idx === 3 && (
                        <div>
                          <div style={{ fontFamily: t.fontMono, fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                            <div style={{
                              background: "#161b22",
                              borderRadius: 8,
                              padding: 14,
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                              marginBottom: 12,
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#ef4444", fontWeight: 700, minWidth: 90 }}>2 THAO TÁC:</span>
                                <span style={{ color: "#cbd5e1" }}>Tách & Xóa — Gọt sạch ngập ngừng trong 30 giây</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#10b981", fontWeight: 700, minWidth: 90 }}>PHỤ ĐỀ:</span>
                                <span style={{ color: "#86efac" }}>Tạo phụ đề tự động 1 chạm chuẩn tiếng Việt (Không rách chữ)</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#a855f7", fontWeight: 700, minWidth: 90 }}>TRỢ LÝ AI:</span>
                                <span style={{ color: "#d8b4fe" }}>Lọc sạch văn mẫu, nhả 30 chủ đề sát tệp khách hàng</span>
                              </div>
                            </div>
                          </div>
                          <AppYTEmbed maxWidth={320} url={m.videoUrl || "https://www.facebook.com/reel/2162457291248635/"} caption={m.videoCaption || "Thầy Việt thị phạm: Hậu kỳ CapCut tinh gọn & ứng dụng AI tạo cảnh trám B-roll"} />
                        </div>
                      )}

                      {/* Minh họa Khóa 5: Video Storytelling Kể chuyện chạm cảm xúc */}
                      {idx === 4 && (
                        <div>
                          <div style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            padding: "14px 16px",
                            borderRadius: 8,
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            fontSize: 13.5,
                            lineHeight: 1.6,
                            marginBottom: 14,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}>
                            <div style={{ color: "#38bdf8", fontWeight: 600 }}>
                              🚶‍♂️ Walk & Talk: Vừa đi vừa tâm sự trong bối cảnh đời thực — Xóa nhòa khoảng cách 2D phẳng lì.
                            </div>
                            <div style={{ color: "#fbbf24", fontWeight: 600 }}>
                              🎯 Raw Truth: Kể câu chuyện bóc trần sự thật ngượng miệng của một khách hàng cụ thể.
                            </div>
                            <div style={{ color: "#34d399", fontWeight: 600 }}>
                              📲 Cầu nối Zalo: Khách nhận ra chuyên gia tử tế và chủ động nhắn tin xin tư vấn lịch thiệp.
                            </div>
                          </div>
                          <AppYTEmbed maxWidth={320} url={m.videoUrl || "https://www.facebook.com/reel/1629161828132946/"} caption={m.videoCaption || "Thầy Việt chia sẻ: Kỹ thuật Video Storytelling — Kể chuyện đời thực, chạm đúng tệp khách có tiền"} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="cl-attio-outcome">
                    <span style={{ fontSize: 20 }}>🎯</span>
                    <div>
                      <strong>Kết quả sau khóa: </strong>
                      {m.outcome}
                    </div>
                  </div>
                </article>
              );
            })}
          </main>
        </div>

      {/* ── Cam Kết Thầy Kèm Cặp (Guarantee Box) ── */}
      {c.modulesGuaranteeTitle && (
        <FadeIn delay={150}>
          <div
            className="cl-glow-card"
            style={{
              marginTop: 48,
              padding: "clamp(24px, 4vw, 36px)",
              borderRadius: "var(--cl-radius, 20px)",
              background: "var(--cl-card, #ffffff)",
              border: `1.5px solid ${t.accent}44`,
              boxShadow: `0 10px 30px ${t.accent}12`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{
                fontFamily: t.fontMono,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: t.accent,
                textTransform: "uppercase",
              }}>
                ✦ CAM KẾT ĐỒNG HÀNH
              </span>
              <h4 style={{
                fontFamily: t.fontDisplay,
                fontSize: "clamp(18px, 2.2vw, 22px)",
                fontWeight: 500,
                color: "var(--cl-text-head)",
                marginTop: 8,
                letterSpacing: "-0.018em",
              }}>
                {c.modulesGuaranteeTitle}
              </h4>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: 18,
              marginBottom: 24,
            }}>
              {c.modulesGuaranteePoints?.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--cl-text-body, #64748b)",
                  }}
                >
                  <span style={{ color: t.accent, fontWeight: 700, fontSize: 16, marginTop: 2 }}>✦</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* 3 Badges */}
            {c.modulesBadges && c.modulesBadges.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", borderTop: "1px dashed var(--cl-line)", paddingTop: 20 }}>
                {c.modulesBadges.map((b, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: t.fontBody,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#16a34a",
                      background: "rgba(22, 163, 74, 0.08)",
                      border: "1px solid rgba(22, 163, 74, 0.25)",
                      borderRadius: 100,
                      padding: "7px 18px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>✓</span> {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
