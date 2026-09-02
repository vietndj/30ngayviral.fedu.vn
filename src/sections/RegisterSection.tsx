import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const RegisterSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Họ tên và Số điện thoại');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          occupation: occupation.trim(),
          reason: reason.trim(),
          source: 'offline.fedu.vn'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Redirect to success page with user info
        const queryParams = new URLSearchParams({
          name: fullName.trim(),
          phone: phone.trim()
        });
        window.location.href = `/success?${queryParams.toString()}`;
      } else {
        setErrorMsg(data.error || 'Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Lỗi kết nối máy chủ. Vui lòng kiểm tra lại mạng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="dang-ky" className="py-24 px-4 bg-[#09090b] border-y border-zinc-800/80 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Perks & Value Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>ĐĂNG KÝ GIỮ CHỖ</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-[1.18] [text-wrap:balance]">
                Nhận Vé Tham Dự Offline 2 Ngày Tại Hà Nội
              </h2>
              <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
                Chỉ nhận tối đa 40 học viên mỗi đợt. Điền thông tin bên cạnh để được hỗ trợ xếp lớp và nhận trọn bộ quà tặng độc quyền.
              </p>
            </div>

            {/* Included Perks */}
            <div className="space-y-4 pt-6 border-t border-zinc-800 text-sm sm:text-base font-sans">
              <div className="flex items-start gap-3 text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Bộ khung kịch bản One-line điền-vào-chỗ-trống cho ngành của bạn</span>
              </div>
              <div className="flex items-start gap-3 text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kho source video mẫu + 500+ hiệu ứng âm thanh SFX bản quyền</span>
              </div>
              <div className="flex items-start gap-3 text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Bộ Prompt AI viết kịch bản 30 ngày tự động hóa</span>
              </div>
              <div className="flex items-start gap-3 text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Quyền tham gia nhóm kín hỗ trợ sửa bài trọn đời sau khóa học</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-page Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm font-mono font-bold text-zinc-200 mb-2 uppercase tracking-wide">
                    HỌ VÀ TÊN <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn Nam"
                    className="w-full px-4.5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base text-white placeholder-zinc-400 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-mono font-bold text-zinc-200 mb-2 uppercase tracking-wide">
                      SỐ ĐIỆN THOẠI / ZALO <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0912345678"
                      className="w-full px-4.5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base text-white placeholder-zinc-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-mono font-bold text-zinc-200 mb-2 uppercase tracking-wide">
                      EMAIL (NHẬN TÀI LIỆU)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nam.nguyen@gmail.com"
                      className="w-full px-4.5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base text-white placeholder-zinc-400 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono font-bold text-zinc-200 mb-2 uppercase tracking-wide">
                    NGHỀ NGHIỆP / LĨNH VỰC CỦA BẠN
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="Ví dụ: Giảng viên Tiếng Anh / Coach Tài chính / Chủ Shop..."
                    className="w-full px-4.5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base text-white placeholder-zinc-400 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono font-bold text-zinc-200 mb-2 uppercase tracking-wide">
                    NÚT THẮT LỚN NHẤT KHI LÀM VIDEO BẠN MUỐN GIẢI QUYẾT?
                  </label>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ví dụ: Chưa biết setup 2 góc máy / Nói hay bị vấp..."
                    className="w-full px-4.5 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base text-white placeholder-zinc-400 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-sans font-bold text-lg shadow-xl shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang gửi thông tin...</span>
                    </>
                  ) : (
                    <>
                      <span>XÁC NHẬN ĐĂNG KÝ GIỮ CHỖ</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs sm:text-sm text-zinc-300 text-center font-mono font-medium">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối và tự động lưu giữ chỗ.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
