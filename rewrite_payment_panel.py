import re

with open('/Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/Checkout.tsx', 'r') as f:
    content = f.read()

# Define the new PaymentPanel content
new_panel = """function PaymentPanel({ bank, qrUrl, onConfirm, onVideoClick }: { bank: BankInfo; qrUrl: string; onConfirm: () => void; onVideoClick: () => void }) {
  const c = useContent();
  const t = useTheme();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    setLoading(true);
    try {
      const botToken = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c";
      const chatId = "2050406425";
      const payload = {
        chat_id: chatId,
        text: `🔥 <b>CÓ KHÁCH CẦN TƯ VẤN! (30ngayviral)</b>\\n\\n👤 Tên: ${name}\\n📞 SĐT: ${phone}\\n📝 Vấn đề: ${note}`,
        parse_mode: "HTML",
      };

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      onConfirm(); // Chuyển sang màn hình ConfirmBanner
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card highlight={true} style={{ padding: "24px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "var(--cl-text-base, #111827)", marginBottom: 8 }}>
          Đăng ký tư vấn lộ trình 30 Ngày Viral
        </div>
        <div style={{ fontSize: 14.5, color: "var(--cl-text-body, #374151)" }}>
          Đội ngũ của Nguyễn Đức Việt sẽ liên hệ trực tiếp để tư vấn xem lộ trình có phù hợp với thực tế của bạn không.
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #111827)", marginBottom: 6 }}>Họ và tên *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên của bạn..."
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 15, boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #111827)", marginBottom: 6 }}>Số điện thoại (Zalo) *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0912345678"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 15, boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #111827)", marginBottom: 6 }}>Vấn đề lớn nhất của bạn hiện tại là gì?</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tụt năng lượng khi tự quay, muốn tuyển F1, xây thương hiệu cá nhân..."
            rows={3}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 15, boxSizing: "border-box", fontFamily: "inherit" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", background: t.accent, color: t.accentText, border: "none",
            borderRadius: "var(--cl-radius-btn, 12px)", padding: "16px 16px",
            fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.04em", textTransform: "uppercase",
            boxShadow: `0 4px 20px ${t.accent}44`,
            transition: "all 0.15s ease",
            marginTop: 10,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "ĐANG GỬI..." : "🚀 NHẬN TƯ VẤN NGAY"}
        </button>
      </form>
      
      <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 18, marginTop: 24, borderTop: `1px solid ${t.line}`, flexWrap: "wrap" }}>
        {[["🔒", "Bảo mật thông tin 100%"], ["🤝", "Đồng hành thật, người thật"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: t.textMuted ?? "#64748b", fontWeight: 500 }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}"""

# Use regex to replace the old PaymentPanel
pattern = re.compile(r'function PaymentPanel.*?^}', re.MULTILINE | re.DOTALL)
new_content = pattern.sub(new_panel, content, count=1)

with open('/Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/Checkout.tsx', 'w') as f:
    f.write(new_content)

