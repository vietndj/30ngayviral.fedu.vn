import React from 'react';
import { Video, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 text-zinc-300 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold">
              <Video className="w-5 h-5 fill-black text-black" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">VIDEO MARKETING</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-sans">
            Khóa học offline 2 ngày cầm tay chỉ việc giúp chuyên gia, chủ doanh nghiệp và người làm dịch vụ làm chủ quy trình kịch bản, setup 2 góc quay và edit video chuyên nghiệp.
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-mono font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Cam kết hoàn 100% học phí sau ngày 1 nếu không hài lòng</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white font-bold mb-4">
            THÔNG TIN LIÊN HỆ
          </h4>
          <ul className="space-y-3.5 text-sm sm:text-base font-sans">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
              <span>Phòng Studio Chuyên Nghiệp · Hà Nội</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-orange-400 shrink-0" />
              <span>Hotline / Zalo: <strong>0934.688.632</strong> (Thầy Nguyễn Đức Việt)</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-orange-400 shrink-0" />
              <span>vietndj@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white font-bold mb-4">
            QUY ĐỊNH & CAM KẾT
          </h4>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4 font-sans">
            Khóa học giới hạn sĩ số ≤ 40 học viên mỗi khóa để đảm bảo chất lượng hướng dẫn 1-1 và mọi học viên đều có thành phẩm video mang về.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Hỗ trợ sửa bài thực hành và tư vấn kênh 30 ngày liên tục sau khóa học qua nhóm Zalo riêng.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-zinc-900 text-center text-xs sm:text-sm text-zinc-400 font-mono">
        © {new Date().getFullYear()} VIDEO MARKETING — Khóa Học Video Marketing Thực Chiến Đứng Lớp Trực Tiếp Bởi Thầy Nguyễn Đức Việt.
      </div>
    </footer>
  );
};
