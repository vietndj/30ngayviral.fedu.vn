import { useEffect, useState, useCallback } from "react";
import { useTheme } from "./theme";
import { useContent } from "./content";
import LiveSocialProof from "./LiveSocialProof";
import ZaloChatWidget from "./ZaloChatWidget";
import { IconCheck } from "./components/ui";

function useIsMobile(breakpoint = 680) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

const GREEN = "#10b981"; // Emerald green for success states



function Ck({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
      <span style={{ color: GREEN, fontWeight: 500, flexShrink: 0, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.65, color: t.textBody ?? "#c0c0c0" }}>{children}</span>
    </div>
  );
}

function Card({ children, highlight = false, style: extraStyle = {} }: { children: React.ReactNode; highlight?: boolean; style?: React.CSSProperties }) {
  const t = useTheme();
  return (
    <div style={{
      background: highlight ? `linear-gradient(135deg, ${t.card}, ${t.card2})` : t.card,
      border: `1px solid ${highlight ? t.accent + "44" : t.line}`,
      borderRadius: t.cardRadius,
      padding: "24px 20px",
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <div style={{ fontFamily: t.fontMono, fontSize: 13, fontWeight: 500, letterSpacing: "0.2em", color: t.accent, textTransform: "uppercase" as const, marginBottom: 10 }}>{children}</div>;
}

function H({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", margin: "0 0 18px", color: t.textBase ?? "#fff" }}>
      {children}
    </h2>
  );
}

function PaymentSuccessModal({ onClose }: { onClose: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${t.bg}, ${t.card2})`,
        border: `1px solid ${GREEN}`,
        borderRadius: t.cardRadius, padding: "48px 32px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: `0 0 80px ${GREEN}44, 0 24px 64px rgba(0,0,0,0.8)`,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 16, margin: "0 auto 20px",
          background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
          border: `1px solid ${t.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ transform: "scale(1.2)" }}>
            <IconCheck accent={t.accent} />
          </div>
        </div>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", color: t.textBase ?? "#fff", margin: "0 0 12px" }}>
          Chào mừng bạn đến với lớp học!
        </h2>
        <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, margin: "0 0 24px" }}>
          Mình đã nhận được chuyển khoản thành công của bạn rồi nhé.
        </p>
        <div style={{ background: t.card, border: `1px solid ${t.line}`, borderRadius: t.cardRadius, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#666", marginBottom: 8, fontWeight: 600 }}>📧 Tài khoản Skool &amp; 4 Tủ đồ nghề thực chiến:</p>
          <p style={{ fontSize: 16, fontWeight: 500, color: GREEN, margin: "0 0 4px" }}>Đã gửi thẳng vào email của bạn</p>
          <p style={{ fontSize: 13, color: t.textMuted ?? "#555" }}>Mở hòm thư (kiểm tra cả mục Spam/Quảng cáo) để kích hoạt tài khoản và vào chào anh em nhé!</p>
        </div>
        <div style={{ background: t.card2, borderRadius: Math.max(8, t.cardRadius - 4), padding: "14px 20px", marginBottom: 24 }}>
          {[
            `🎬 ${c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}`,
            "🎁 Trọn bộ 4 Tủ đồ nghề thực chiến (Nhạc AI, SFX, Prompt, 30 Hook)",
            "♾ Sở hữu trọn đời & Cập nhật kỹ thuật AI mới liên tục"
          ].map((item) => (
            <div key={item} style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", padding: "4px 0", textAlign: "left" }}>{item}</div>
          ))}
        </div>
        <button onClick={() => window.location.href = "/"} style={{
          background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "14px 36px",
          fontSize: 15, fontWeight: 500, cursor: "pointer",
          boxShadow: `0 0 24px ${t.accent}66`,
        }}>
          Đóng & Bắt đầu học ngay
        </button>
      </div>
    </div>
  );
}

function ConfirmBanner({ onReset }: { onReset: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", background: t.card2, border: `1px solid ${GREEN}44`, borderRadius: t.cardRadius }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
          background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
          border: `1px solid ${t.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <IconCheck accent={t.accent} />
        </div>
      <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", marginBottom: 12, color: t.textBase ?? "#fff" }}>
        Mình đã ghi nhận chuyển khoản của bạn!
      </h2>
      <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 24px" }}>
        Hệ thống đang tự động đối soát giao dịch. Tài khoản Skool và bộ đồ nghề sẽ được gửi thẳng vào email của bạn <strong style={{ color: "var(--cl-text-base, #111827)" }}>trong vòng 1 - 2 phút</strong>.
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 10, background: t.card, border: `1px solid ${t.line}`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "20px 24px", marginBottom: 20, textAlign: "left" }}>
        {[
          `🎬 ${c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}`,
          "🎁 Trọn bộ 4 Tủ đồ nghề thực chiến (Nhạc AI, SFX, Prompt, 30 Hook)",
          "♾ Sở hữu trọn đời & Cập nhật kỹ thuật AI mới liên tục"
        ].map((item) => (
          <span key={item} style={{ fontSize: 15, color: t.textBody ?? "#c0c0c0" }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: 15, color: t.textMuted ?? "#555", lineHeight: 1.6 }}>Cần hỗ trợ gấp hoặc sau 5 phút chưa thấy email? Nhắn thẳng Zalo Thầy Việt: <a href="https://zalo.me/0934688632" style={{ color: t.accent, fontWeight: 600 }}>0934.688.632</a> (hỗ trợ ngay)</p>
      <button onClick={onReset} style={{ marginTop: 20, background: "transparent", border: `1px solid ${t.line}`, borderRadius: t.btnRadius, padding: "10px 24px", color: t.textMuted ?? "#555", fontSize: 13, cursor: "pointer" }}>
        Quay lại trang thanh toán
      </button>
    </div>
  );
}

type BankInfo = { name: string; account: string; holder: string; amount: string; content: string };

function PaymentPanel({ bank, qrUrl, onConfirm, onVideoClick }: { bank: BankInfo; qrUrl: string; onConfirm: () => void; onVideoClick: () => void }) {
  const c = useContent();
  const t = useTheme();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const prefix = (c as any).transferPrefix || "VIDEO";

  return (
    <Card highlight style={{ padding: "24px 20px" }}>


      <Lbl>Quét mã vào lớp</Lbl>

      {/* ✨ [POSITION 2 BADGE] */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(16, 185, 129, 0.04))",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: 16,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)"
      }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#10b981", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          ✨ BẢO CHỨNG CHÍNH CHỦ TỪ THẦY NGUYỄN ĐỨC VIỆT
        </div>
        <div style={{ fontSize: 12, color: "var(--cl-text-body, #374151)", marginTop: 3 }}>
          Đồng hành chữa bài trực tiếp trên Skool · Bản cập nhật 2026
        </div>
      </div>

      {/* Pricing block */}
      <div style={{ textAlign: "center", marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ fontSize: 15, color: t.textMuted ?? "#555", textDecoration: "line-through" }}>{c.value} VNĐ</div>
        <div style={{ fontSize: 36, fontWeight: 500, color: t.textBase ?? "#fff" }}>{c.price} <span style={{ fontSize: 16 }}>VNĐ</span></div>
        <div style={{ fontSize: 15, color: t.accent, fontWeight: 500 }}>Tiết kiệm {formattedSaving} VNĐ</div>
      </div>

      {/* 📱 [Khối Mã QR & Thanh Toán] (Ở giữa, to nhất) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📱 QUÉT MÃ VÀO LỚP NGAY
        </p>
        <div style={{ 
          width: "100%",
          maxWidth: 340,
          margin: "0 auto",
          background: "#fff", 
          borderRadius: 16, 
          boxShadow: `0 0 40px ${t.accent}22`,
          border: `1px solid ${t.line}`,
          overflow: "hidden"
        }}>
          <img
            src={qrUrl}
            alt="QR chuyển khoản Khóa học"
            style={{ 
              display: "block", 
              width: "114%", 
              maxWidth: "none", 
              marginLeft: "-7%", 
              marginTop: "-4%", 
              marginBottom: "-2%", 
              objectFit: "contain" 
            }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.innerHTML = `<div style="width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#141417;border-radius:8px;font-size:12px;color:#fff;text-align:center;padding:16px;">QR lỗi</div>`;
              }
            }}
          />
        </div>
        <p style={{ fontSize: 14, color: t.textMuted ?? "#555", marginTop: 10 }}>Tương thích: Mọi app ngân hàng &amp; Ví Momo (quét là tự điền đúng tiền và cú pháp)</p>
      </div>



      {/* NEW INSTRUCTIONS */}
      <div style={{ marginBottom: 18, background: t.card2, borderRadius: 12, padding: "14px 16px", border: `1px solid ${t.line}` }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Hướng dẫn 2 bước</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 500, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>Mở app ngân hàng quét mã QR (đã tự điền đúng 999.000đ).</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 500, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>
            Kiểm tra nội dung: <strong style={{ color: "var(--cl-text-base, #111827)" }}>{prefix} + [Số điện thoại của bạn]</strong>
          </span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        style={{
          width: "100%", background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "16px 16px",
          fontSize: 15, fontWeight: 500, cursor: "pointer",
          letterSpacing: "0.04em", textTransform: "uppercase",
          boxShadow: `0 0 32px 4px ${t.accent}44`,
        }}
      >
        ✅ TÔI ĐÃ CHUYỂN KHOẢN XONG
      </button>

      <p style={{ fontSize: 13.5, color: t.textMuted ?? "#64748b", textAlign: "center", marginTop: 14, marginBottom: 14, lineHeight: 1.5 }}>
        ⚡ Hệ thống tự động kích hoạt tài khoản Skool qua Email &amp; SMS ngay khi ngân hàng báo có (thường mất 1 - 2 phút).
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 14, borderTop: `1px solid ${t.line}`, flexWrap: "wrap" }}>
        {[["🔒", "Bảo mật VietQR"], ["🤝", "Đồng hành thật, người thật"], ["⚡", "Vào học ngay"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: t.textMuted ?? "#64748b", fontWeight: 500 }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CheckoutContent() {
  const t = useTheme();
  const c = useContent();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const isMobile = useIsMobile();

  const rawCustomer = localStorage.getItem("video_customer");
  const customer = rawCustomer ? JSON.parse(rawCustomer) as { phone?: string } : {};
  const phone = customer.phone || "[SĐT CỦA BẠN]";
  const prefix = (c as any).transferPrefix || "VIDEO";
  const transferContent = `${prefix} ${phone}`;

  const BANK: BankInfo = { name: "TPBank", account: "88804101986", holder: "NGUYEN DUC VIET", amount: c.price, content: transferContent };
  const QR_URL = `https://img.vietqr.io/image/TPB-${BANK.account}-compact2.png?amount=${c.price.replace(/\./g, "")}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.holder)}`;

  // Bắn sự kiện InitiateCheckout khi truy cập trang thanh toán
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: priceVal || 999000,
        currency: 'VND',
        content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
      });
    }
  }, [priceVal, c.courseName]);

  const handleManualConfirm = async () => {
    setConfirmed(true);

    // Bắn sự kiện Purchase Meta Pixel khi xác nhận thủ công
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: priceVal || 999000,
        currency: 'VND',
        content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
      });
    }

    try {
      const raw = localStorage.getItem("video_customer");
      const cust = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
      const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
      await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cust.name ?? "",
          phone: cust.phone ?? "",
          email: cust.email ?? "",
          url: cust.url ?? "",
          transactionId: "MANUAL_" + Date.now(),
          rowIndex,
        }),
      });
    } catch { /* silent */ }
  };

  // Polling: detect payment automatically via SePay
  useEffect(() => {
    let since = localStorage.getItem("video_payment_since");
    if (!since) {
      since = Date.now().toString();
      localStorage.setItem("video_payment_since", since);
    }
    let active = true;

    const poll = async () => {
      if (!active || paymentSuccess) return;
      try {
        const res = await fetch(`/api/payment/check?since=${since}&phone=${phone}`);
        if (!res.ok) return;
        const data = await res.json() as { found: boolean; transaction?: { id: string } };
        if (data.found && active && !paymentSuccess) {
          setPaymentSuccess(true);
          setShowModal(true);
          localStorage.removeItem("video_payment_since");
          
          // Bắn sự kiện Purchase Meta Pixel khi tự động kiểm tra thấy thanh toán thành công
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              value: priceVal || 999000,
              currency: 'VND',
              content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
            });
          }

          const raw = localStorage.getItem("video_customer");
          const customer = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
          const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
          await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customer.name ?? "",
              phone: customer.phone ?? "",
              email: customer.email ?? "",
              url: customer.url ?? "",
              transactionId: data.transaction?.id ?? "",
              rowIndex,
            }),
          });
        }
      } catch { /* silent */ }
    };

    const id = setInterval(poll, 5000);
    poll();
    return () => { active = false; clearInterval(id); };
  }, [paymentSuccess, phone, priceVal]);

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#fff", fontFamily: t.fontBody, minHeight: "100vh" }}>
      {showModal && <PaymentSuccessModal onClose={() => setShowModal(false)} />}
      {showVideoModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
        }}
        onClick={() => setShowVideoModal(false)}
        >
          <div style={{
            position: "relative",
            maxWidth: 800,
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 50px rgba(0,0,0,0.8)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/CaDZiACYrV8?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ border: "none" }}
            />
            <button 
              onClick={() => setShowVideoModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `1px solid ${t.line}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500 }}>
          {c.footerBrand || "30NGÀY"}<span style={{ color: t.accent }}>{c.footerDot || "."}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <span style={{ fontSize: 15, color: t.textMuted ?? "#555" }}>Thanh toán bảo mật</span>
        </div>
      </header>

      {/* ── URGENCY BAR ── */}
      <div style={{ background: t.accent, padding: "10px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.4, color: t.accentText }}>
          ⚡ SUẤT HỌC ĐỒNG HÀNH 30 NGÀY CÙNG THẦY VIỆT — QUÉT MÃ ĐỂ KÍCH HOẠT TÀI KHOẢN SKOOL &amp; NHẬN BỘ ĐỒ NGHỀ HÔM NAY
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ── DECISION CONFIRMATION ── */}
        <div style={{ textAlign: "center", padding: "40px 0 0" }}>
          <Lbl>Bước cuối vào lớp</Lbl>
          <h1 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px, 4.2vw, 38px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", margin: "0 0 14px", color: t.textBase ?? "#fff" }}>
            {c.checkoutTitle ? <span dangerouslySetInnerHTML={{ __html: c.checkoutTitle }} /> : (
              <>
                Bạn chỉ còn cách video đầu tiên<br />
                <em style={{ color: t.accent, fontStyle: "normal", fontWeight: 500 }}>đúng một lượt quét mã.</em>
              </>
            )}
          </h1>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#888", maxWidth: 520, margin: "0 auto 12px", lineHeight: 1.6 }}>
            {c.checkoutSub || "Mình giữ chỗ này cho bạn rồi. Chuyển khoản xong là hệ thống gửi tài khoản vào thẳng Skool, kéo ghế ngồi xuống là mình cùng bắt tay vào làm luôn, không phải chờ đợi."}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.card2, border: `1px solid ${GREEN}33`, borderRadius: 50, padding: "8px 20px" }}>
            <span style={{ color: GREEN, fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 15, color: t.textBody ?? "#aaa" }}>Đã giữ mức giá ưu đãi 999.000đ — Hoàn tất chuyển khoản để vào lớp ngay</span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr min(360px, 100%)",
          gap: 20,
          marginTop: 36,
          alignItems: "start",
        }}>

          {/* MOBILE: QR panel first */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
            </div>
          )}

          {/* LEFT column — order details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* PRICING TABLE CARD */}
            <Card>
              <Lbl>Thông tin đơn hàng</Lbl>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: t.textBase ?? "#fff" }}>{c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}</div>
                  <div style={{ fontSize: 14, color: t.textMuted ?? "#666", marginTop: 4 }}>5 chặng thực chiến từ bóc kịch bản đời thường đến dựng CapCut Pro &amp; trợ lực AI</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: t.accent, fontWeight: 600 }}>Tiết kiệm {formattedSaving} VNĐ</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: t.textBase ?? "#fff" }}>{c.price}<span style={{ fontSize: 15, fontWeight: 500 }}> VNĐ</span></div>
                </div>
              </div>
            </Card>

            {/* WHAT YOU GET */}
            <Card>
              <Lbl>Đặc quyền vào lớp</Lbl>
              <H>Những gì bạn nhận được khi vào lớp hôm nay</H>
              {(c.checkoutFeatures || [
                "Trọn bộ 5 chặng thực hành: Bóc kịch bản đời thường, góc máy sạch sẽ, nhịp dựng cuốn hút & AI trợ lực",
                "Quyền vào lớp trọn đời trên Skool & Nhận các bản cập nhật kỹ thuật AI video mới nhất",
                "Đặc quyền nộp bài thực hành: Mình trực tiếp soi timeline CapCut, chỉ rõ từng nhịp cắt thừa",
                "Tủ đồ nghề 01: Kho 30 nhạc nền đĩnh đạc & 40 SFX điện ảnh sạch bản quyền 100%, không lo tắt tiếng",
                "Tủ đồ nghề 02: Bộ Template chữ chuyển động & Preset phụ đề 2 dòng chuẩn Safe Zone, không bị xé chữ",
                "Tủ đồ nghề 03: Bộ câu lệnh AI bóc sạch văn mẫu, nhả kịch bản 2 cột (quay gì — nói gì) trong 3 phút",
                "Tủ đồ nghề 04: Ngân hàng 30 cấu trúc mở lời tự nhiên 3 giây đầu theo từng ngành, gỡ bí ý tưởng"
              ]).map((item: string, i: number) => <Ck key={i}>{item}</Ck>)}
            </Card>

            {/* INSTRUCTOR MENTORSHIP PLEDGE */}
            <div style={{
              background: "linear-gradient(135deg, rgba(0, 104, 255, 0.08), rgba(0, 104, 255, 0.02))",
              border: "1.5px solid rgba(0, 104, 255, 0.25)",
              borderRadius: "var(--cl-radius, 16px)",
              padding: "20px 22px",
              display: "flex",
              gap: 16,
              alignItems: "flex-start"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "linear-gradient(135deg, #0068FF, #00C6FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0
              }}>
                NĐV
              </div>
              <div>
                <p style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--cl-text-head, #0f172a)",
                  margin: "0 0 4px"
                }}>
                  Lời nhắn từ người chủ nhà — Thầy Nguyễn Đức Việt
                </p>
                <p style={{
                  fontSize: 13.5,
                  color: "var(--cl-text-body, #475569)",
                  lineHeight: 1.65,
                  margin: "0 0 8px",
                  fontStyle: "italic"
                }}>
                  "Làm video không cần bạn phải nói hay như MC, cũng chẳng cần máy ảnh chục triệu. Cái người xem cần là một người làm nghề đàng hoàng, nói câu chuyện có thật. Bạn cứ dám bấm máy bài đầu tiên, còn lại trên Skool và Zalo, mình sẽ ngồi lại soi từng khung hình sửa cùng bạn."
                </p>
                <span style={{ fontSize: 12, color: "var(--cl-text-muted, #64748b)", fontWeight: 500 }}>
                  Đạo diễn hình ảnh · Giảng viên FPT Arena Multimedia · 15 năm làm nghề đào tạo thực chiến
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT column — desktop only */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", paddingTop: 48, borderTop: `1px solid ${t.line}`, marginTop: 40 }}>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, marginBottom: 12, color: t.textBase ?? "#fff" }}>
            {c.footerBrand || "30NGÀY"}<span style={{ color: t.accent }}>{c.footerDot || "."}</span>
          </div>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#444", lineHeight: 1.8 }}>
            © 2026 {c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"} · fedu.vn · Mọi quyền được bảo lưu.<br />
            <a href="mailto:vietndj@gmail.com" style={{ color: t.textMuted ?? "#555" }}>vietndj@gmail.com</a> | Zalo: 0934.688.632
          </p>
        </div>
      </div>
      <LiveSocialProof />
      <ZaloChatWidget />
    </div>
  );
}

export default function Checkout() {
  return <CheckoutContent />;
}
