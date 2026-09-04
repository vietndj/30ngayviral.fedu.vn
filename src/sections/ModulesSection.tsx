import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";

export function ModulesSection() {
  const c = useContent();
  const t = useTheme();
  const [activeStage, setActiveStage] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const modulesList = c.modules || [];

  const navMeta = [
    { n: "BƯỚC 01", time: "KỊCH BẢN", title: "Kịch bản 1 dòng", desc: "Dứt điểm cứng họng" },
    { n: "BƯỚC 02", time: "GÓC MÁY", title: "Góc máy & Ánh sáng", desc: "Nổi khối 3D đĩnh đạc" },
    { n: "BƯỚC 03", time: "CAPCUT", title: "Dựng CapCut & B-roll", desc: "Giấu sạch 100% lỗi vấp" },
    { n: "BƯỚC 04", time: "TRỢ LÝ AI", title: "Trợ lý AI thực chiến", desc: "Lọc 7 lỗi văn mẫu" },
    { n: "BƯỚC 05", time: "RA ĐƠN THẬT", title: "Mở lời bán hàng", desc: "Khách tự nhắn tin mua" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-stage-index"));
            if (!isNaN(index)) {
              setActiveStage(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: 0.15,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [modulesList]);

  const handleNavClick = (idx: number) => {
    setActiveStage(idx);
    const targetEl = cardRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sec maxWidth={1020} id="modules">
      {/* ── Section Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.modulesLabel || "5 KHÓA HỌC THỰC CHIẾN TỪ A ĐẾN Z"}</Label>
          <SH typed>{c.modulesHeading || "Đủ 5 mắt xích khép kín để tự làm trọn vẹn video bán hàng ngay trên chiếc điện thoại:"}</SH>
          {c.modulesSub && (
            <p style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.75,
              color: "var(--cl-text-muted, #64748b)",
              maxWidth: 760,
              margin: "16px auto 0",
            }}>
              {c.modulesSub}
            </p>
          )}
        </div>
      </FadeIn>

      {/* ── Attio Sticky Scroll Layout ── */}
      <FadeIn delay={100}>
        <div className="cl-attio-scroll-layout">
          {/* Cột Trái: Sticky Sidebar Navigation */}
          <aside className="cl-attio-sticky-sidebar">
            <div className="cl-attio-sidebar-header">
              <h3 className="cl-attio-sidebar-title">
                5 Khâu Sản Xuất Thực Chiến
              </h3>
              <p className="cl-attio-sidebar-desc">
                Thiếu 1 khâu là video hỏng ngay. Bấm từng bước để xem chi tiết bên trong:
              </p>
            </div>

            <nav className="cl-attio-sidebar-nav" aria-label="5 Khóa học">
              {modulesList.map((m, idx) => {
                const isActive = activeStage === idx;
                const meta = navMeta[idx] || { n: `BƯỚC 0${idx + 1}`, time: "", title: m.title, desc: "" };
                return (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => handleNavClick(idx)}
                    className={`cl-attio-nav-btn ${isActive ? "is-active" : ""}`}
                  >
                    <div className="cl-attio-nav-meta">
                      <span className="cl-attio-nav-tag">{meta.n}</span>
                      <span className="cl-attio-nav-time">{meta.time}</span>
                    </div>
                    <div className="cl-attio-nav-title">{meta.title}</div>
                    <div className="cl-attio-nav-sub">{meta.desc}</div>
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
                        {idx === 0 && "TEMPLATE KỊCH BẢN 2 CỘT · FEDU SCRIPT"}
                        {idx === 1 && "QUY TẮC 1 SẢI TAY & ÁNH SÁNG TỰ NHIÊN"}
                        {idx === 2 && "TIMELINE CAPCUT · CẮT NGỢP & ĐẮP B-ROLL"}
                        {idx === 3 && "TRỢ LÝ AI FEDU · BỘ LỌC 7 LỖI VĂN MẪU"}
                        {idx === 4 && "CASE STUDY HỌC VIÊN · MỞ LỜI RA ĐƠN THẬT"}
                      </div>
                    </div>

                    <div className="cl-mockup-body">
                      {/* Minh họa Bước 1: Kịch bản 2 cột */}
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
                          <AppYTEmbed url="https://youtube.com/shorts/ftuv04UxKJA" caption="Kịch bản 1 dòng: Thầy Việt thị phạm nói tự nhiên trước ống kính" />
                        </div>
                      )}

                      {/* Minh họa Bước 2: Setup ánh sáng & góc máy */}
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
                            <span style={{ color: "#fbbf24", fontWeight: 600 }}>💡 Nguyên tắc 1 sải tay:</span> Kê điện thoại ngang sống mũi, cách mặt 1 sải tay (60-70cm), ngồi chéo 45° đón nắng cửa sổ. Mặt tự động nổi khối 3D, không cần tốn tiền mua đèn tản sáng.
                          </div>
                          <AppYTEmbed url="https://youtu.be/Pem27DMrkVE" caption="Thầy Việt thị phạm setup góc máy bàn làm việc gọn gàng bằng điện thoại" />
                        </div>
                      )}

                      {/* Minh họa Bước 3: CapCut Timeline & B-roll */}
                      {idx === 2 && (
                        <div style={{ fontFamily: t.fontMono, fontSize: 13, lineHeight: 1.6 }}>
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
                              <span style={{ color: "#ef4444", fontWeight: 700, minWidth: 90 }}>TRACK 01:</span>
                              <span style={{ color: "#cbd5e1" }}>Video gốc (Quay vấp 14 đoạn ngập ngừng 🔴)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ color: "#10b981", fontWeight: 700, minWidth: 90 }}>TRACK 02:</span>
                              <span style={{ color: "#86efac" }}>B-roll đắp đè lên (Che sạch 100% vết cắt vấp 🟢)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ color: "#38bdf8", fontWeight: 700, minWidth: 90 }}>TRACK 03:</span>
                              <span style={{ color: "#7dd3fc" }}>Phụ đề tự động 2 dòng chuẩn TV (Không bao giờ rách chữ 🟡)</span>
                            </div>
                          </div>
                          <div style={{
                            padding: "10px 14px",
                            background: "rgba(16, 185, 129, 0.08)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            borderRadius: 6,
                            color: "#a7f3d0",
                            fontSize: 13,
                          }}>
                            ✂️ Kết quả: Biến 15 lần vấp thành video 45 giây mượt mà. Người xem xem từ đầu đến cuối không hề nhận ra bạn vừa nói vấp.
                          </div>
                        </div>
                      )}

                      {/* Minh họa Bước 4: AI Trợ lý lọc văn mẫu */}
                      {idx === 3 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, lineHeight: 1.6 }}>
                          <div style={{
                            padding: 12,
                            background: "rgba(239, 68, 68, 0.06)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            borderRadius: 8,
                          }}>
                            <div style={{ color: "#f87171", fontWeight: 700, marginBottom: 4, fontFamily: t.fontMono }}>
                              ❌ AI ĐẠI TRÀ (MÙI VĂN MẪU - LƯỚT SAU 2S):
                            </div>
                            <div style={{ color: "#94a3b8", fontStyle: "italic" }}>
                              "Chào các bạn, hôm nay tôi xin chia sẻ 3 bí quyết tuyệt vời để bùng nổ doanh số..."
                            </div>
                          </div>
                          <div style={{
                            padding: 12,
                            background: "rgba(16, 185, 129, 0.08)",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            borderRadius: 8,
                          }}>
                            <div style={{ color: "#34d399", fontWeight: 700, marginBottom: 4, fontFamily: t.fontMono }}>
                              ✅ AI ÔNG GIÁO FEDU (VÀO THẲNG VIỆC - THẬT GIỌNG ĐỜI THƯỜNG):
                            </div>
                            <div style={{ color: "#f1f5f9" }}>
                              "Đừng mua micro 2 triệu vội nếu chị chưa biết mẹo kê điện thoại sát ngực này..."
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Minh họa Bước 5: Mở lời bán hàng & ra đơn */}
                      {idx === 4 && (
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
                            <span style={{ color: "#38bdf8", fontWeight: 600 }}>💬 Walk & Talk tự nhiên:</span> Vừa đi bộ vừa chia sẻ trải nghiệm thật của mình. Không cần gồng mình diễn, không cần hô hào giảm giá — khách tự nhắn tin xin tư vấn.
                          </div>
                          <AppYTEmbed url="https://www.youtube.com/watch?v=GqLHBWSiWDI" caption="Case study học viên: Quay Walk & Talk mộc mạc mang về hơn 100 tin nhắn khách hàng thật" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="cl-attio-outcome">
                    <span style={{ fontSize: 20 }}>🎯</span>
                    <div>
                      <strong>Kết quả đạt được: </strong>
                      {m.outcome}
                    </div>
                  </div>
                </article>
              );
            })}
          </main>
        </div>
      </FadeIn>

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
