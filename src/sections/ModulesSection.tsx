import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

function ModulePhoneShowcase({ videos, fallbackUrl }: { videos?: { title: string; desc?: string; url: string }[]; fallbackUrl?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const videoList = videos && videos.length > 0 ? videos : (fallbackUrl ? [{ title: "Video minh họa", url: fallbackUrl }] : []);
  if (videoList.length === 0) return null;

  const currentVid = videoList[activeIdx] || videoList[0];
  const isFb = currentVid.url.includes("facebook.com");
  const ytMatch = currentVid.url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/
  );
  const ytId = ytMatch ? ytMatch[1] : null;

  return (
    <div className="cl-phone-showcase">
      {/* Khung điện thoại gọn gàng */}
      <div className="cl-phone-frame">
        <div className="cl-phone-notch" />
        <div className="cl-phone-screen">
          {isFb ? (
            <iframe
              key={currentVid.url}
              src={`https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(currentVid.url)}&show_text=false&width=267&t=0`}
              title={currentVid.title}
              loading="lazy"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="cl-phone-iframe"
            />
          ) : ytId ? (
            <iframe
              key={currentVid.url}
              src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
              title={currentVid.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="cl-phone-iframe"
            />
          ) : null}
        </div>
      </div>

      {/* 2 nút ấn chuyển video bên dưới */}
      {videoList.length > 1 && (
        <div className="cl-phone-switcher" role="tablist">
          {videoList.map((vid, vIdx) => {
            const isActive = vIdx === activeIdx;
            return (
              <button
                key={vIdx}
                type="button"
                onClick={() => setActiveIdx(vIdx)}
                className={`cl-phone-switch-btn ${isActive ? "is-active" : ""}`}
                role="tab"
                aria-selected={isActive}
              >
                <span className="cl-phone-switch-tag">CLIP 0{vIdx + 1}</span>
                <span className="cl-phone-switch-text">{vid.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Tiêu đề nhỏ & nội dung ngắn gọn bên dưới */}
      <div className="cl-phone-caption-wrap">
        <h5 className="cl-phone-caption-title">{currentVid.title}</h5>
        {currentVid.desc && (
          <p className="cl-phone-caption-desc">{currentVid.desc}</p>
        )}
      </div>
    </div>
  );
}

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

  // Keep active button visible horizontally on mobile without triggering page scroll
  const isInitialNavMount = useRef(true);
  useEffect(() => {
    if (isInitialNavMount.current) {
      isInitialNavMount.current = false;
      return;
    }
    const btn = navBtnRefs.current[activeStage];
    const container = btn?.parentElement;
    if (btn && container && typeof window !== "undefined" && window.innerWidth <= 860) {
      const targetLeft = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
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
          <SH>{c.modulesHeading || "Đủ 5 mắt xích khép kín để tự làm trọn vẹn video bán hàng ngay trên chiếc điện thoại:"}</SH>
          {c.modulesSub && (
            <p style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(16.5px, 1.8vw, 18px)",
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

                  {/* Khung điện thoại hiển thị video & 2 nút chuyển đổi */}
                  <ModulePhoneShowcase
                    videos={m.videos}
                    fallbackUrl={m.videoUrl}
                  />

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
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "var(--cl-text-body, #374151)",
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
                      fontSize: 15,
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
