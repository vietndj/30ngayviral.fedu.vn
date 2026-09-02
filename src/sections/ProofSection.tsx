import React from 'react';
import { content } from '../content';
import { ShieldCheck, Flame, Users, MessageSquare, PhoneCall, CheckCircle2 } from 'lucide-react';

export const ProofSection: React.FC = () => {
  const { proof } = content;

  return (
    <section id="proof" className="py-24 px-4 bg-white text-zinc-900 relative border-y border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{proof.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#09090b] mb-6 tracking-tight leading-[1.18] [text-wrap:balance]">
            {proof.headline}
          </h2>
          <p className="text-zinc-700 text-lg sm:text-xl leading-relaxed [text-wrap:balance] max-w-3xl mx-auto font-sans">
            {proof.description}
          </p>
        </div>

        {/* Real Meta Business Proof Highlight Card */}
        <div className="bg-[#f8fafc] rounded-3xl p-8 md:p-10 border border-zinc-200 mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Real Metrics (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>BÁO CÁO ĐỐI SOÁT HỘP THƯ & TƯ VẤN</span>
              </div>

              {/* 3 Core Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs text-center">
                  <div className="text-xs sm:text-sm font-mono text-zinc-700 font-bold uppercase tracking-wider">Follower</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#09090b] mt-1">38.780+</div>
                  <div className="text-xs sm:text-sm text-zinc-600 mt-0.5 font-medium">Tự nhiên</div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs text-center">
                  <div className="text-xs sm:text-sm font-mono text-amber-900 font-bold uppercase tracking-wider">Hội Thoại</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-800 mt-1">3.642</div>
                  <div className="text-xs sm:text-sm text-amber-900/80 mt-0.5 font-medium">Tin nhắn đến</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs text-center">
                  <div className="text-xs sm:text-sm font-mono text-emerald-900 font-bold uppercase tracking-wider">Số ĐT Thật</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 mt-1">428</div>
                  <div className="text-xs sm:text-sm text-emerald-900/80 mt-0.5 font-medium">Để lại tư vấn</div>
                </div>
              </div>

              {/* 3 Action Pillars */}
              <div className="space-y-3.5 pt-2 text-base sm:text-lg font-sans">
                <div className="flex items-start gap-3 text-zinc-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>100% quay bằng 1 điện thoại iPhone</strong>, không dùng ekip quay dựng cồng kềnh.</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Kịch bản One-line 3 cột</strong> bóc đúng điểm nghẽn của người làm kinh doanh.</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Tỷ lệ quan tâm mua đạt 20.8%</strong> (761 hot leads xin báo giá & thông tin lớp học).</span>
                </div>
              </div>
            </div>

            {/* Right Col: Real Dashboard Image (6 Cols) */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#09090b]">
                <img
                  src={proof.dashboardImg}
                  alt="Báo Cáo Đối Soát Meta Business Suite Fanpage 30 Ngày"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery 4 Mockups */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#09090b] mb-3">
              Các Kênh Video Triệu View Được Xây Dựng Từ Con Số 0
            </h3>
            <p className="text-zinc-700 text-base sm:text-lg font-sans">
              Hình ảnh thực tế từ các kênh Fanpage, TikTok và số liệu phân tích chuyển đổi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Fanpage */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white p-3 sm:p-4 shadow-sm group hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden bg-zinc-100 mb-3">
                <img src={proof.mockups.fanpage} alt="Fanpage 38K Người Theo Dõi" className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-sans font-bold text-[#09090b]">
                  Fanpage 38.000 Follower
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed mt-1.5 font-medium">
                  Kênh nội dung xây từ số 0 bằng video chia sẻ chuyên môn thực tế
                </p>
              </div>
            </div>

            {/* Card 2: TikTok */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white p-3 sm:p-4 shadow-sm group hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden bg-zinc-100 mb-3">
                <img src={proof.mockups.tiktok} alt="Kênh TikTok 181K View" className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-sans font-bold text-[#09090b]">
                  TikTok 181.500+ View
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed mt-1.5 font-medium">
                  Kênh @nguyenducviet.viral với chuỗi clip ghim triệu view tự nhiên
                </p>
              </div>
            </div>

            {/* Card 3: Leads Stats */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white p-3 sm:p-4 shadow-sm group hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden bg-zinc-100 mb-3">
                <img src={proof.mockups.leadsStats} alt="Báo Cáo 3.642 Leads" className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-sans font-bold text-[#09090b]">
                  3.642 Leads & 428 Số ĐT
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed mt-1.5 font-medium">
                  Báo cáo chuyển đổi khách hàng tiềm năng thực tế qua tin nhắn Fanpage
                </p>
              </div>
            </div>

            {/* Card 4: FB Reels */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white p-3 sm:p-4 shadow-sm group hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden bg-zinc-100 mb-3">
                <img src={proof.mockups.fbReels} alt="Facebook Reels 154K View" className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-sans font-bold text-[#09090b]">
                  Reels 154.000 View
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed mt-1.5 font-medium">
                  Dàn video ngắn giữ chân người xem và tạo đơn hàng liên tục mỗi ngày
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
