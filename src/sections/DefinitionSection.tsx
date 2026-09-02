import React from 'react';
import { HelpCircle, XCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface DefinitionSectionProps {
  onOpenRegister?: () => void;
}

export const DefinitionSection: React.FC<DefinitionSectionProps> = ({ onOpenRegister }) => {
  return (
    <section id="dinh-nghia" className="py-24 px-4 bg-[#0c0d12] text-white relative border-b border-zinc-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>BẢN CHẤT CỐT LÕI · PHÂN BIỆT RÕ RÀNG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-tight leading-[1.18] [text-wrap:balance]">
            Video Marketing Là Gì? Vì Sao 90% Mọi Người Đang Làm Nhầm Sang "Video Ads" Hoặc "Câu View Rác"?
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed [text-wrap:balance] max-w-3xl mx-auto font-sans">
            Đừng nhầm lẫn giữa việc đốt tiền chạy quảng cáo ép mua, làm trò giật gân câu like và việc xây dựng một cỗ máy <strong className="text-amber-400">Video Marketing có cấu trúc</strong> tự động mang về khách hàng mỗi ngày.
          </p>
        </div>

        {/* 3-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Column 1: Video Ads */}
          <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase">
                <XCircle className="w-3.5 h-3.5" />
                <span>01. VIDEO ADS (QUẢNG CÁO ÉP MUA)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Đốt Tiền Ép Khách Mua
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                Quay video nhồi nhét chữ "GIẢM GIÁ 50%", thuê diễn viên nói văn mẫu và chi tiền tấn chạy quảng cáo để cắn tệp.
              </p>

              <div className="space-y-3 pt-4 border-t border-red-500/20 text-sm sm:text-base font-sans">
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Tắt tiền là hết khách:</strong> Không để lại giá trị thương hiệu lâu dài.</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Khán giả đề phòng:</strong> Bị lướt qua sau 3 giây đầu vì mùi quảng cáo chèo kéo.</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Chi phí đắt đỏ:</strong> Giá thầu quảng cáo ngày càng tăng cao bào mòn lợi nhuận.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-500/20 text-center">
              <span className="text-sm font-mono text-red-400 font-bold">Kết quả: Lỗ tiền ads, phụ thuộc nền tảng</span>
            </div>
          </div>

          {/* Column 2: Video Viral Rác */}
          <div className="rounded-3xl border border-zinc-700 bg-zinc-900/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-zinc-200 text-xs sm:text-sm font-mono font-bold uppercase">
                <XCircle className="w-4 h-4" />
                <span>02. VIDEO VIRAL (CÂU VIEW RÁC)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Triệu View Nhưng Rỗng Túi
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                Đu trend, diễn hài hước, tạo drama giật gân để lấy triệu view thả tim từ những người rảnh rỗi lướt mạng.
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-800 text-sm sm:text-base font-sans">
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-zinc-500 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Sai tệp khách hàng:</strong> Triệu view nhưng toàn người xem giải trí, không ai có tiền mua.</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-zinc-500 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Không định vị chuyên gia:</strong> Người xem cười xong là quên bạn là ai và đang kinh doanh gì.</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-200">
                  <span className="text-zinc-500 font-bold shrink-0 text-base">✕</span>
                  <span><strong>Cạn kiệt năng lượng:</strong> Suốt ngày phải nghĩ trò lố mới để duy trì view ảo.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
              <span className="text-sm font-mono text-zinc-300 font-bold">Kết quả: Mất công, view cao không ra tiền</span>
            </div>
          </div>

          {/* Column 3: Video Marketing Có Cấu Trúc (HIGHLIGHT) */}
          <div className="rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-500/15 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-amber-500/15 ring-2 ring-amber-500/30">
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-amber-500 text-zinc-950 text-xs sm:text-sm font-mono font-black uppercase tracking-wider">
              CHUẨN KHÓA HỌC FEDU
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-mono font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>03. VIDEO MARKETING CÓ CẤU TRÚC</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Tài Sản Sinh Khách 24/7
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed">
                Video 30–45s giải thích đúng điểm nghẽn chuyên môn bằng trải nghiệm thật. Khách hàng tự tìm đến xin tư vấn và mua hàng.
              </p>

              <div className="space-y-3 pt-4 border-t border-amber-500/30 text-base sm:text-lg font-sans">
                <div className="flex items-start gap-3 text-zinc-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1 người 1 điện thoại:</strong> Tự quay đơn giản, ngắt câu 5s theo kịch bản One-line 3 cột.</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Đúng tệp khách chi tiền:</strong> Khán giả thấy đúng vấn đề của mình nên chủ động nhắn tin.</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tài sản số vĩnh viễn:</strong> Video đăng lên tiếp tục mang lại khách hàng sau nhiều tháng.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-500/30 text-center">
              <span className="text-sm sm:text-base font-mono text-amber-300 font-black">Kết quả: Có khách đều đặn, không tốn tiền ads</span>
            </div>
          </div>
        </div>

        {/* Insight Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-900/80 to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>ĐÚC KẾT THỰC CHIẾN TỪ THẦY NGUYỄN ĐỨC VIỆT</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed">
              "Làm Video Marketing không phải là cố gắng diễn trò để mua vui cho thiên hạ. Bản chất của nó là <strong className="text-white">dùng hình ảnh và lời nói chân thật để bóc đúng nỗi đau khách hàng và trao giải pháp tốt nhất</strong>. Khi bạn nói đúng sự thật, khách hàng sẽ tự động tìm đến bạn."
            </p>
          </div>

          <a
            href="#dang-ky"
            onClick={(e) => {
              if (onOpenRegister) {
                e.preventDefault();
                onOpenRegister();
              }
            }}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>HỌC CÁCH LÀM VIDEO MARKETING</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
