import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Countdown, MediaSection } from "../components/ui";
import { validateForm } from "../utils/validation";

function IconGuarantee({ accent: c }: { accent: string }) {
  return (
    <svg width={44} height={44} viewBox="0 0 40 40" fill="none" style={{ animation: "ic-float 3.2s ease-in-out infinite", overflow: "visible" }}>
      <path d="M20 4 L34 10 L34 22 C34 30 20 38 20 38 C20 38 6 30 6 22 L6 10 Z"
        fill={`${c}14`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${c}44)` }}/>
      <polyline points="13,21 17,26 27,15" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RegForm() {
  const t = useTheme();
  const c = useContent();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate name, email, phone & profanity
    const validation = validateForm(form.name, form.email, form.phone);
    if (!validation.isValid) {
      setErrorMsg(validation.error || "Vui lòng nhập thông tin hợp lệ.");
      return;
    }

    setLoading(true);
    
    // Save to localStorage for Checkout page to use
    const currentUrl = window.location.href;
    const customerData = { name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), url: currentUrl };
    localStorage.setItem("video_customer", JSON.stringify(customerData));

    // Bắn sự kiện Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    try {
      const res = await fetch("/api/lead/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      const data = await res.json() as { rowIndex?: number; error?: string };
      if (data.error) {
        setErrorMsg(data.error);
        setLoading(false);
        return;
      }
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
          <label
            htmlFor={`reg-${f.name}`}
            style={{
              display: "block",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#334155",
              marginBottom: 6,
              textAlign: "left",
            }}
          >
            {f.label}
          </label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            className="cl-form-input"
          />
        </div>
      ))}

      {errorMsg && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 100,
          padding: "12px 18px",
          color: "#dc2626",
          fontSize: 14,
          lineHeight: 1.5,
          textAlign: "center",
          fontWeight: 500,
        }}>
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#0a5560" : "var(--cl-accent, #1a73e8)",
          color: "var(--cl-accent-text, #ffffff)",
          border: "none",
          borderRadius: 100,
          padding: "18px 36px",
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.04em",
          boxShadow: loading ? "none" : "0 4px 20px rgba(26, 115, 232, 0.35)",
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1557b0"; }}
        onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--cl-accent, #1a73e8)"; }}
      >
        {loading ? "⏳ ĐANG XỬ LÝ..." : "ĐĂNG KÝ VÀ THANH TOÁN"}
      </button>
      <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", fontStyle: "italic", marginTop: 4 }}>
        🔒 Thông tin của bạn được bảo mật tuyệt đối
      </p>
    </form>
  );
}

export function CtaSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860} id="dang-ky">
      <FadeIn>
        <div style={{
          background: `linear-gradient(135deg, var(--cl-card), var(--cl-card2))`,
          border: `1.5px solid ${t.accent}`,
          borderRadius: "var(--cl-radius, 20px)",
          overflow: "hidden",
          boxShadow: `0 20px 60px -15px ${t.accent}22`,
        }}>
          <div style={{ background: t.accent, padding: "14px 24px", textAlign: "center" }}>
            <p style={{
              fontFamily: t.fontMono,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: 0,
            }}>
              {c.urgencyBar.replace("{PRICE}", c.price)}
            </p>
          </div>
          <div style={{ padding: "clamp(28px, 6vw, 48px) clamp(20px, 5vw, 40px)" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Label>{c.ctaLabel}</Label>
              <SH typed>{c.ctaHeading}</SH>
              <p style={{
                fontSize: "clamp(16px, 1.8vw, 17.5px)",
                color: "var(--cl-text-body, #64748b)",
                marginBottom: 28,
                lineHeight: 1.75,
                maxWidth: 680,
                margin: "12px auto 28px",
              }}>
                {c.ctaSub}
              </p>
              <div style={{ marginBottom: 32 }}>
                <p style={{
                  fontSize: 12,
                  color: "var(--cl-text-muted, #64748b)",
                  marginBottom: 14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: t.fontMono,
                  fontWeight: 600,
                }}>
                  {c.countdownLabel}
                </p>
                <Countdown />
              </div>
            </div>

            <div style={{
              background: "var(--cl-card)",
              border: `1px solid var(--cl-line)`,
              borderRadius: "var(--cl-radius, 16px)",
              padding: "26px 24px",
              marginBottom: 32,
            }}>
              <p style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: "var(--cl-text-head, #0f172a)",
                marginBottom: 18,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontFamily: t.fontMono,
              }}>
                {c.valueStackTitle}
              </p>

              {c.valueStack.map(({ label, price }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 15, color: "var(--cl-text-body, #475569)", lineHeight: 1.6 }}>{label}</span>
                  <span style={{ fontSize: 14, color: "var(--cl-text-muted, #64748b)", fontFamily: t.fontMono, flexShrink: 0, fontWeight: 500 }}>{price}</span>
                </div>
              ))}

              <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 14, paddingTop: 16 }}>
                <p style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: t.accent,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  fontFamily: t.fontMono,
                }}>
                  ✦ ĐỒ NGHỀ ĐI KÈM MIỄN PHÍ:
                </p>
                {(c as any).bonusItems?.map((item: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, alignItems: "baseline" }}>
                    <span style={{ fontSize: 14, color: "var(--cl-text-body, #475569)", lineHeight: 1.6, display: "flex", gap: 8 }}>
                      <span style={{ color: t.accent, flexShrink: 0 }}>✓</span>
                      {item.title}
                    </span>
                    <span style={{
                      fontSize: 11.5,
                      color: "#16a34a",
                      fontFamily: t.fontMono,
                      fontWeight: 700,
                      flexShrink: 0,
                      background: "rgba(22, 163, 74, 0.08)",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}>
                      MIỄN PHÍ
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: `1px solid var(--cl-line)`,
                marginTop: 16,
                paddingTop: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}>
                <span style={{
                  fontSize: 14.5,
                  color: "var(--cl-text-muted, #94a3b8)",
                  textDecoration: "line-through",
                  fontFamily: t.fontMono,
                }}>
                  Giá gốc: 4.500.000 VNĐ
                </span>
                <span style={{
                  fontSize: "clamp(22px, 3vw, 26px)",
                  fontWeight: 700,
                  color: t.accent,
                  fontFamily: t.fontMono,
                }}>
                  Hôm nay: {c.price} VNĐ
                </span>
              </div>
            </div>

            <RegForm />

            <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid var(--cl-line)`, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <IconGuarantee accent={t.accent} />
              </div>
              <p style={{
                fontSize: 15,
                color: "var(--cl-text-body, #64748b)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
                fontStyle: "italic",
                textWrap: "balance",
              }}>
                {c.guarantee}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
