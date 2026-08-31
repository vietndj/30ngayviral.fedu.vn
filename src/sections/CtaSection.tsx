import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Countdown } from "../components/ui";

function IconGuarantee({ accent }: { accent: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function RegForm() {
  const t = useTheme();
  const c = useContent();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setErrorMsg("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    // Lưu thông tin vào sessionStorage để trang checkout tự động lấy và render QR
    const userInfo = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem("checkout_user", JSON.stringify(userInfo));

    // Bắn thông tin vào Google Sheets (Lead chưa thanh toán)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if (data.rowIndex) localStorage.setItem("video_row", data.rowIndex.toString());
    } catch { 
      /* Nếu lỗi mạng thì cứ bỏ qua để khách vẫn qua trang thanh toán được */ 
    }
    
    // Chuyển hướng sang trang thanh toán sau khi gửi thành công
    window.location.href = "/checkout";
  };

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { name: "name", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A", required: true },
        { name: "email", label: "Email (để nhận khóa học) *", type: "email", placeholder: "nguyenvana@gmail.com", required: true },
        { name: "phone", label: "Số điện thoại *", type: "tel", placeholder: "0912 345 678", required: true },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`reg-${f.name}`} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--cl-text-muted, #64748b)", marginBottom: 8 }}>{f.label}</label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            style={{
              width: "100%", background: "var(--cl-card2, #f8fafc)",
              border: `1px solid var(--cl-line)`, borderRadius: t.btnRadius,
              padding: "14px 18px", color: "var(--cl-text-base, #09090b)", fontSize: 15,
              outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--cl-accent)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--cl-line)"; }}
          />
        </div>
      ))}

      {errorMsg && (
        <div className="cl-callout cl-callout--danger" style={{ borderRadius: t.btnRadius, textAlign: "center" }}>
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="cl-btn"
        style={{
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "⏳ ĐANG XỬ LÝ..." : "ĐĂNG KÝ VÀ THANH TOÁN"}
      </button>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--cl-text-muted, #64748b)", fontStyle: "italic", marginTop: 4 }}>
        Thông tin của bạn được bảo mật tuyệt đối
      </p>
    </form>
  );
}

export function CtaSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <section id="dang-ky" className="cl-sec--cinema-spotlight" style={{ maxWidth: 760, margin: "84px auto 0", padding: "0 20px" }}>
      <FadeIn>
        <div className="cl-card" style={{ background: "var(--cl-card)", borderRadius: "clamp(16px, 4vw, 24px)", overflow: "hidden", border: "1px solid var(--cl-line)" }}>
          <div style={{ background: "var(--cl-accent)", padding: "14px 24px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffffff", animation: "tw-blink 1.2s infinite" }} />
            <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cl-accent-text)", margin: 0 }}>
              {c.urgencyBar.replace("{PRICE}", c.price)}
            </p>
          </div>
          <div style={{ padding: "clamp(24px, 6vw, 48px) clamp(16px, 5vw, 40px)" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Label>{c.ctaLabel}</Label>
              <SH typed>{c.ctaHeading}</SH>
              <p style={{ fontSize: 16.5, color: "var(--cl-text-body, #27272a)", marginBottom: 32, lineHeight: 1.75 }}>{c.ctaSub}</p>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 13, color: "var(--cl-text-muted, #64748b)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--cl-font-mono)" }}>{c.countdownLabel}</p>
                <Countdown />
              </div>
            </div>

            <div style={{ background: "var(--cl-card2, #f8fafc)", border: `1px solid var(--cl-line)`, borderRadius: t.cardRadius, padding: "26px 24px", marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--cl-font-mono)" }}>{c.valueStackTitle}</p>

              {c.valueStack.map(({ label, price }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 14.5, color: "var(--cl-text-body, #27272a)", lineHeight: 1.5 }}>{label}</span>
                  <span style={{ fontSize: 14, color: "var(--cl-text-muted, #64748b)", fontFamily: "var(--cl-font-mono)", flexShrink: 0 }}>{price}</span>
                </div>
              ))}

              <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 14, paddingTop: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--cl-accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--cl-font-mono)" }}>🎁 KÈM THEO — CHỈ TRONG ĐỢT NÀY:</p>
                {(c as any).bonusItems?.map((item: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, alignItems: "baseline" }}>
                    <span style={{ fontSize: 13.5, color: "var(--cl-text-body, #27272a)", lineHeight: 1.5, display: "flex", gap: 6 }}>
                      <span style={{ color: "var(--cl-accent)", flexShrink: 0, fontWeight: 700 }}>✓</span>
                      {item.title}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--cl-text-muted, #64748b)", fontFamily: "var(--cl-font-mono)", flexShrink: 0, textDecoration: "line-through" }}>250.000đ</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 14, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 14, color: "var(--cl-text-muted, #64748b)", textDecoration: "line-through", fontFamily: "var(--cl-font-mono)" }}>Tổng giá trị thực tế: {c.value} VNĐ</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: "var(--cl-accent)", fontFamily: "var(--cl-font-mono)" }}>Hôm nay: {c.price} VNĐ</span>
              </div>
            </div>

            <RegForm />

            <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid var(--cl-line)`, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <IconGuarantee accent={t.accent} />
              </div>
              <p style={{ fontSize: 15, color: "var(--cl-text-body, #27272a)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontStyle: "italic", textWrap: "balance" }}>
                {c.guarantee}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
