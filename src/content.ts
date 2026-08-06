import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";

export interface BlocksMeta {
  order: string[];
  hidden: string[];
  media: Record<string, any[]>;
  custom: Record<string, { title: string; body: string }>;
}

export interface SkillCard {
  n: string;
  title: string;
  desc: string;
  warn?: string;
  gif?: string;
  youtubeId?: string;
  aspectRatio?: string;
}
export interface Stage { n: string; title: string; sub?: string; desc?: string; gif?: string }
export interface ValueLine { label: string; price: string }

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroAccentLine: string;
  heroSub: string;
  heroCta: string;
  heroSubPrice?: string;
  heroVideoYoutubeId?: string;
  heroPoem?: string[];

  painLabel: string;
  painHeading: string;
  painQuote: string;
  painSub: string;
  pains: string[];
  painConclusion?: string;

  // ── Attention (3 cách gây chú ý) ──
  attentionLabel: string;
  attentionHeading: string;
  attentionPara: string;
  attentionItems: { icon: string; title: string; desc: string }[];

  // ── Rule 7-11-4 ──
  ruleLabel: string;
  ruleHeading: string;
  rulePara: string;
  ruleItems: { fail: string; why: string }[];
  ruleConclusion: string;

  cycleLabel: string;
  cycleHeading: string;
  cyclePara: string;
  cycleItems: { fail: string; why: string }[];
  
  discoveryLabel: string;
  discoveryHeading: string;
  discoverySub: string;
  discoveryItems: { title: string; desc: string }[];

  solutionLabel: string;
  solutionHeading: string;
  solutionSub: string;
  solutionItems: string[];

  skillsLabel: string;
  skillsHeading: string;
  skillCards: SkillCard[];

  midCtaHeading: string;
  midCtaSub: string;
  midCtaBtn: string;

  baLabel: string;
  baHeading: string;
  baSub: string;
  baBeforeMedia?: string;
  baAfterMedia?: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];

  roadmapLabel: string;
  roadmapHeading: string;
  roadmapPreviewHeading?: string;
  roadmapPreviewDesc?: string;
  roadmapIframeUrl?: string;
  roadmapChaptersHeading?: string;
  stages: Stage[];

  instructorLabel: string;
  instructorHeading: string;
  instructorInitials: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string[];
  instructorInsight?: string;

  urgencyBar: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaSub: string;
  countdownLabel: string;
  valueStackTitle: string;
  valueStack: ValueLine[];
  guarantee: string;

  footerBrand: string;
  footerDot: string;
  footerTagline: string;
  footerLinks: string[];
  bonusLabel: string;
  bonusHeading: string;
  bonusSub: string;
  bonusItems: { id: string; title: string; desc: string; audioDemo?: string; youtubeDemo?: string; gifDemo?: string }[];

  blocksMeta: BlocksMeta;
}

const CONTENT_SCHEMA_VERSION = 7;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: "299.000",
  value: "3.500.000",

  // ── Hero ──
  heroBadge: "🔥 THỬ THÁCH 30 NGÀY VIDEO VIRAL — CHỈ VỚI 1 ĐIỆN THOẠI",
  heroHeadline1: "THỬ THÁCH 30 NGÀY VIDEO VIRAL",
  heroHeadline2: "Tự tay quay dựng 30 video bán hàng triệu view mượt mà chỉ bằng điện thoại.",
  heroPoem: [
    "30 ngày biến đổi kênh thành công,",
    "Tư duy điện ảnh, đơn hàng về ngập lòng."
  ],
  heroAccentLine: "Bí quyết kết hợp giữa Kỹ Nghệ Điện Ảnh Đắt Giá (Nguyễn Đức Việt) & Lộ Trình 30 Ngày Content Matrix AI.",
  heroSub: "Không cần đu trend nhảm, không lạm dụng kỹ xảo, không cần máy ảnh đắt tiền. Bạn sở hữu lộ trình thực chiến 30 ngày từng bước + 4 nguyên lý hình ảnh cuốn hút + bộ công cụ 3s Hook triệu view để tạo ra video bán hàng liên tục mỗi ngày.",
  heroCta: "THAM GIA THỬ THÁCH 30 NGÀY NGAY — CHỈ 299.000Đ",
  heroVideoYoutubeId: "CaDZiACYrV8",
  heroSubPrice: "(Học Online mọi lúc, mọi nơi, xem lại trọn đời. Cam kết hoàn tiền 100% trong 7 ngày)",

  // ── Pain (Nỗi đau) ──
  painLabel: "DẤU HIỆU THẤT BẠI KHI XÂY KÊNH",
  painHeading: "Bạn đăng video mỗi ngày nhưng view vẫn lẹt đẹt và không ra đơn?",
  painQuote: "Sự mượt mà và khả năng bán hàng của video không đến từ hiệu ứng app hay máy ảnh đắt tiền — nó đến từ Tư duy hình ảnh điện ảnh + Lộ trình kịch bản có định hướng chuyển đổi.",
  painSub: "4 căn bệnh phổ biến khiến video của bạn bị ngó lơ dù bạn đã cố gắng hết sức:",
  pains: [
    "❌ 01. Cắt cảnh giật cục, thô sượng — lạm dụng hiệu ứng lật trang 3D sến súa của CapCut khiến video trông nghiệp dư.",
    "❌ 02. Cạn ý tưởng & không biết viết kịch bản — ngồi hàng giờ trước điện thoại nhưng không biết bắt đầu nói từ đâu.",
    "❌ 03. 3 giây đầu bị trôi tuột — thiếu công thức Hook thu hút sự chú ý, khán giả lướt qua chỉ sau 1.5 giây.",
    "❌ 04. Bối cảnh tối om phẳng lì — một góc máy đứng im gây nhàm chán, thiếu ánh sáng tôn khối chuyên nghiệp."
  ],

  // ── Attention (3 cách gây chú ý) ──
  attentionLabel: "BA CÁCH GÂY CHÚ Ý PHỔ BIẾN NHẤT",
  attentionHeading: "Ba thứ khiến khán giả dừng lướt trong 3 giây đầu",
  attentionPara: "Để biến người lướt qua thành người mua hàng, bạn cần kết hợp tư duy giữ chân khán giả và công thức Hook chuẩn thị giác.",
  attentionItems: [
    {
      icon: "✦",
      title: "Hook Thị giác (Visual Cut-on-Action)",
      desc: "Chuyển động tàng hình ngay 1 giây đầu kéo mắt khán giả vào câu chuyện. Mắt tự động bám theo hình ảnh trước khi não kịp bấm lướt."
    },
    {
      icon: "✦",
      title: "Hook Vấn đề / Khát khao",
      desc: "Chạm ngay vào nỗi đau hoặc mong muốn thầm kín của khách hàng mục tiêu bằng mẫu kịch bản AI đã tối ưu hóa."
    },
    {
      icon: "✦",
      title: "Đổi Cỡ Cảnh Nhanh (3s Rhythm)",
      desc: "Thay đổi góc Toàn - Trung - Cận liên tục mỗi 3 giây tạo cảm giác điện ảnh mượt mà, ép khán giả xem hết video."
    }
  ],

  // ── Rule 7-11-4 ──
  ruleLabel: "LUẬT CHƠI TIẾP THỊ SỐ 30 NGÀY",
  ruleHeading: "Quy tắc 7-11-4 & Đòn Bẩy Video Viral 30 Ngày",
  rulePara: "Một người lạ chỉ xuống tiền mua hàng khi họ đã tích lũy đủ 7 tiếng xem nội dung, qua 11 lần gặp trên 4 nền tảng. Thử thách 30 ngày giúp bạn:",
  ruleItems: [
    { 
      fail: "Phủ sóng 30 video chuyển đổi cao liên tục", 
      why: "Tự động phủ TikTok, Facebook Reels, YouTube Shorts & Zalo mà không tốn chi phí quảng cáo." 
    },
    { 
      fail: "Bao bọc thương hiệu bằng bao bì điện ảnh đắt giá", 
      why: "Góc máy sáng đẹp, vết cắt tàng hình nâng tầm uy tín cá nhân và sản phẩm gấp 5 lần." 
    },
    { 
      fail: "AI Workflow rút ngắn 80% thời gian làm nội dung", 
      why: "Lên ý tưởng, phân cảnh shot-list và chỉnh sửa video chỉ trong 15 phút mỗi ngày." 
    }
  ],
  ruleConclusion: "Không ai mua hàng từ một video mờ nhạt hay cắt ghép giật cục. Kết hợp Tư duy Quay Dựng Fedu & Lộ Trình 30 Ngày Viral chính là vũ khí giúp bạn đột phá doanh số!",

  // ── Section 3: Đập tan ảo giác ──
  cycleLabel: "ĐẬP TAN ẢO GIÁC LÀM VIDEO",
  cycleHeading: "Sự thu hút không sinh ra từ thiết bị đắt tiền hay phần mềm xa xỉ.",
  cyclePara: "Nhiều người nghĩ phải mua iPhone Pro Max hay máy ảnh hàng chục triệu mới làm được video đẹp. Thực tế hoàn toàn ngược lại!",
  cycleItems: [
    { 
      fail: "Khác biệt giữa 'Người đăng video ngẫu nhiên' và 'Master Video Viral'", 
      why: "Master hiểu rõ nguyên lý Không gian & Nhịp điệu cắt cảnh. Họ dùng 1 chiếc điện thoại tầm trung nhưng biết cách mượn đà chuyển động vật lý thật để tạo thước phim cuốn hút." 
    }
  ],

  // ── Section 4: Công thức thị giác ──
  discoveryLabel: "CÔNG THỨC THỊ GIÁC VIRAL",
  discoveryHeading: "Làm chủ 3 tuyệt chiêu tạo nét điện ảnh ngay trên điện thoại",
  discoverySub: "Đóng gói những lý thuyết nghệ thuật phức tạp nhất thành 3 bước đơn giản:",
  discoveryItems: [
    {
      title: "Cơ học Chuyển động > Transition App sến",
      desc: "Bỏ ngay các chuyển cảnh lật trang 3D sến súa. Mượn đà lướt tay hoặc di chuyển đồ vật để nối 10 clip thành 1 thước phim liền mạch vô lý.",
      gif: "/gifs/mechanical-cut.gif",
      placeholderLabel: "GIF Minh họa: Lướt tay che ống kính chuyển cảnh"
    },
    {
      title: "Luân chuyển Cỡ cảnh 3 giây",
      desc: "Xóa sổ góc quay chết đứng im. Đổi điệu nghệ giữa Cảnh Toàn - Trung - Cận để dẫn dắt cảm xúc người xem liên tục.",
      gif: "/gifs/spatial-direction.gif",
      placeholderLabel: "GIF Minh họa: Video luân chuyển Toàn - Trung - Cận"
    },
    {
      title: "Ánh sáng 3D Tôn khối Đắt giá",
      desc: "Sự 'sang trọng' của video đến từ ánh sáng bóc tách nhân vật khỏi phông nền với 2 chiếc đèn cơ bản, không phải camera đắt tiền.",
      gif: "/gifs/lighting-art.gif",
      placeholderLabel: "GIF Minh họa: Bật tắt đèn nền background tạo chiều sâu"
    }
  ],

  // ── Section 5: Solution ──
  solutionLabel: "VŨ KHÍ ĐỘC QUYỀN VƯỢT TRỘI",
  solutionHeading: "Giải pháp hợp nhất 2-trong-1: Kỹ nghệ Điện ảnh + Lộ trình 30 Ngày Viral",
  solutionSub: "Trang bị trọn gói hệ thống kiến thức giúp bạn tự tin làm chủ video ngắn:",
  solutionItems: [
    "❌ Cắt ghép giật cục ➞ ✅ Cut-on-Action tàng hình: Nối cảnh mượt mà dựa theo chuyển động tự nhiên.",
    "❌ Cạn ý tưởng nội dung ➞ ✅ AI Content Matrix: Tạo 30 kịch bản bán hàng chuẩn SEO trong 15 phút.",
    "❌ Góc máy phẳng lì ➞ ✅ Ánh sáng 3D bóc tách: Phân lớp sáng tối rõ rệt cho bối cảnh phòng nhỏ.",
    "❌ Người xem lướt qua ➞ ✅ Bộ 100+ Hook 3s Triệu View: Giữ chân khán giả ngay từ khoảnh khắc đầu tiên."
  ],

  skillsLabel: "4 NGUYÊN LÝ KHUNG HÌNH ĐIỆN ẢNH",
  skillsHeading: "Bốn kỹ thuật cốt lõi giúp bạn tự tay sản xuất video cuốn hút:",
  skillCards: [
    { n: "01", title: "Điểm nối tàng hình (Cut-on-Action)", desc: "Mượn các chuyển động vật lý tự nhiên (vung tay, lướt đồ vật, bước chân) làm cầu nối giữa hai bối cảnh. Khán giả bị cuốn theo nhịp điệu mà không hề thấy vết cắt.", gif: "/gifs/invisible-cut.gif" },
    { n: "02", title: "Ánh sáng tôn khối 3D", desc: "Chỉ cần 2 chiếc đèn đặt góc Key & Back light, khuôn mặt và bối cảnh lập tức có chiều sâu nghệ thuật, giải quyết triệt để video bị phẳng lì.", gif: "/gifs/lighting-3d.gif" },
    { n: "03", title: "Điều hướng Cỡ cảnh 3s", desc: "Luân chuyển Toàn - Trung - Cận có chủ đích để giữ mắt người xem không bị mỏi hay nhàm chán.", gif: "/gifs/shot-sizes.gif" },
    { n: "04", title: "Bằng chứng thị giác (B-roll)", desc: "Lồng ghép các bối cảnh phụ B-roll vừa để che lỗi vấp nói, vừa tăng gấp đôi độ thuyết phục cho sản phẩm.", youtubeId: "Ew-yWd0riEQ", aspectRatio: "9 / 16" }
  ],

  // ── Section 7: Mid CTA ──
  midCtaHeading: "Sẵn sàng chinh phục Thử thách 30 Ngày Video Viral ngay hôm nay!",
  midCtaSub: "Sở hữu toàn bộ tư duy điện ảnh + kịch bản AI + công thức viral bán hàng chỉ với 1 điện thoại.",
  midCtaBtn: "THAM GIA THỬ THÁCH CHỈ 299K",

  // ── Section 8: Before & After ──
  baLabel: "SỰ LỚN MẠNH SAU 30 NGÀY",
  baHeading: "Bảng so sánh trước và sau khi hoàn thành Thử thách 30 Ngày:",
  baSub: "",
  baBeforeMedia: "",
  baAfterMedia: "",
  beforeLabel: "Trước khi tham gia",
  afterLabel: "Sau 30 ngày thử thách",
  beforeItems: [
    "Đăng video thất thường, cạn ý tưởng",
    "Cắt ghép giật cục, lộ vết cắt thô sượng",
    "Lạm dụng hiệu ứng lật trang 3D sến",
    "Ánh sáng phẳng lì, bối cảnh nham nhở",
    "3 giây đầu trôi tuột, 0 lượt chuyển đổi",
    "Quay đi quay lại hàng chục lần vì nói vấp"
  ],
  afterItems: [
    "Sở hữu Matrix 30 video sản xuất hàng loạt",
    "Nối cảnh Cut-on-Action tàng hình mượt mà",
    "Tư duy điện ảnh tinh tế, không cần kỹ xảo",
    "Setup ánh sáng 3D đắt giá chỉ 10 phút",
    "Bẫy chú ý 3s Hook chuẩn, tăng tỉ lệ chuyển đổi",
    "B-roll che lỗi vấp mượt như đạo diễn chuyên nghiệp"
  ],

  // ── Section 9: Lộ trình tinh gọn ──
  roadmapLabel: "LỘ TRÌNH THỰC CHIẾN 30 NGÀY",
  roadmapHeading: "Cấu trúc Thử thách 30 Ngày Video Viral có gì?",
  roadmapPreviewHeading: "Xem bài học trải nghiệm mẫu",
  roadmapPreviewDesc: "Trực quan, thực chiến, không lý thuyết suông — xem xong áp dụng được ngay trên điện thoại.",
  roadmapIframeUrl: "https://www.youtube.com/embed/NmazSvfOs84?rel=0&modestbranding=1",
  roadmapChaptersHeading: "4 Tuần chinh phục 30 Video Bán Hàng Triệu View:",
  stages: [
    { n: "Tuần 1", title: "Setup Chuẩn Điện Ảnh & 4 Nguyên Lý Hình Ảnh", desc: "Chuẩn hóa góc quay điện thoại, setup ánh sáng tôn khối 3D phòng nhỏ và làm chủ kỹ thuật Cut-on-Action giấu vết cắt tàng hình.", sub: "Hoàn thành 7 video chuẩn kỹ thuật đầu tiên" },
    { n: "Tuần 2", title: "AI Script Generator & Matrix 30 Ý Tưởng Content", desc: "Ứng dụng Prompt AI lên kịch bản bán hàng hàng loạt, làm chủ bộ 100+ Tiêu đề Hook 3s thu hút người xem từ giây đầu.", sub: "Đóng gói 14 kịch bản bán hàng thu hút" },
    { n: "Tuần 3", title: "Dựng Video Mượt Mà & Bộ SFX Âm Thanh Điện Ảnh", desc: "Thực hành dựng CapCut chuyên nghiệp, chèn âm thanh SFX có lực, lồng ghép B-roll che lỗi vấp nói mượt mà.", sub: "Hoàn thiện 21 video chất lượng điện ảnh" },
    { n: "Tuần 4", title: "Đóng Gói & Đòn Bẩy Chuyển Đổi Doanh Số", desc: "Tối ưu hóa đăng video đa kênh (TikTok, Reels, Shorts), gắn link sản phẩm/giỏ hàng và kích hoạt đòn bẩy đơn hàng.", sub: "Bứt phá 30 video viral & đo lường chuyển đổi" }
  ],

  // ── Section 10: Instructor ──
  instructorLabel: "GIẢNG VIÊN ĐỒNG HÀNH",
  instructorHeading: "Tư duy đi trước, Kỹ nghệ theo sau\nKhóa học làm thay đổi cách bạn tạo ra video",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Software (ĐH Bách Khoa HN). 15 năm Giảng viên Mỹ thuật đa phương tiện tại FPT Arena.",
  instructorBio: [
    "Với kinh nghiệm 15 năm đào tạo hàng ngàn học viên thiết kế và dựng phim, thầy Việt mang đến phương pháp đóng gói trực quan nhất: biến lý thuyết điện ảnh phức tạp thành lộ trình 30 ngày đơn giản, giúp bất kỳ ai cũng có thể làm chủ chiếc điện thoại để tạo ra những thước phim bán hàng cuốn hút."
  ],

  // ── Bonus (Quà tặng) ──
  bonusLabel: "BỘ QUÀ TẶNG ĐỘC QUYỀN ĐI KÈM",
  bonusHeading: "Nhận trọn bộ 6 công cụ nâng cấp video trị giá 1.500.000đ",
  bonusSub: "Đặc quyền dành riêng cho học viên đăng ký trong chương trình Thử Thách 30 Ngày",
  bonusItems: [
    {
      id: "01",
      title: "Kho 50+ Âm Thanh Điện Ảnh (SFX Pro)",
      desc: "Thư viện hiệu ứng âm thanh chuẩn cinema (Whoosh, Impact, Rise, Hit) giúp điểm cắt có lực và tạo cảm xúc mạnh mẽ cho video.<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🔥 <b>Sâu, đậm chất điện ảnh</b></li><li>🎧 <b>100% No Copyright - Sạch bản quyền</b></li><li>✂️ <b>Chỉ cần kéo thả vào CapCut</b></li></ul>"
    },
    {
      id: "02",
      title: "Kho Nhạc Nền 'MasterClass' AI Độc Bản",
      desc: "Giai điệu sản xuất bằng AI chuyên dụng, hoàn toàn độc quyền không lo đánh gậy bản quyền trên TikTok/YouTube/Reels.",
      audioDemo: "/boardroom-siege.mp3"
    },
    {
      id: "03",
      title: "Bộ 100+ Tiêu Đề Hook 3s 'Triệu View'",
      desc: "Tổng hợp các mẫu câu Hook hạ gục thị giác và tâm lý người xem trong 3 giây đầu tiên, giúp tỉ lệ giữ chân khán giả tăng gấp 3 lần."
    },
    {
      id: "04",
      title: "Sơ Đồ Đánh Sáng 3 Điểm Cho Phòng Nhỏ",
      desc: "Sơ đồ bố trí đèn cực chuẩn cho phòng ngủ hay phòng làm việc hẹp, tạo chiều sâu 3D sang trọng chỉ với 2 đèn cơ bản."
    },
    {
      id: "05",
      title: "Bộ Prompt AI Viết Kịch Bản & Shot-List Tự Động",
      desc: "Chỉ cần nhập tên sản phẩm, ChatGPT/Claude sẽ tự phân chia phân cảnh Toàn - Trung - Cận chi tiết từng giây."
    },
    {
      id: "06",
      title: "Checklist Đăng Bài & Theo Dõi Tiến Độ 30 Ngày",
      desc: "Bảng theo dõi và nhắc nhở lộ trình hàng ngày giúp bạn duy trì kỷ luật, sản xuất 30 video mà không bị bỏ cuộc giữa chừng.",
      gifDemo: "/edit-ai-promo.gif"
    }
  ],

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ ƯU ĐÃI ĐẶC QUYỀN CÓ HẠN — CHỈ CÒN 299.000 VNĐ",
  ctaLabel: "// ĐĂNG KÝ THAM GIA",
  ctaHeading: "Bắt đầu Thử Thách 30 Ngày Video Viral ngay hôm nay!",
  ctaSub: "Sở hữu tư duy quay dựng điện ảnh đắt giá + Lộ trình 30 ngày từng bước + Bộ công cụ AI hỗ trợ. Cam kết hoàn tiền 100% trong 7 ngày nếu không hài lòng.",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ TOÀN BỘ CHƯƠNG TRÌNH:",
  valueStack: [
    { label: "Khóa học Thử Thách 30 Ngày Video Viral", price: "2.000.000 VNĐ" },
    { label: "Bộ 6 Quà Tặng Độc Quyền (Value Stack)", price: "1.500.000 VNĐ" }
  ],
  guarantee: "Bảo hành chất lượng 100%: Xem xong bài đầu tiên là tự tin cầm điện thoại thực hành ngay!",

  // ── Footer ──
  footerBrand: "FEDU",
  footerDot: ".",
  footerTagline: "\"Tư duy đi trước, Kỹ nghệ theo sau\n30 ngày làm chủ, đơn về dạt dào!\"",
  footerLinks: [],
  footerCopyright: "COPYRIGHT 2026 | 30NGAYVIRAL.FEDU.VN — FEDU EDUCATION",

  blocksMeta: {
    order: ["hero", "pain", "attention", "rule", "cycle", "discovery", "solution", "skills", "midCta", "before-after", "roadmap", "instructor", "bonus", "cta", "footer"],
    hidden: ["attention", "rule", "discovery", "solutions", "solution"],
    media: {},
    custom: {},
  },
};

export const ContentCtx = createContext<PageContent>(DEFAULT_CONTENT);

export function useContent(): PageContent {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  return createElement(ContentCtx.Provider, { value: DEFAULT_CONTENT }, children);
}
