export interface ContentData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    tags: string[];
    meta: { label: string; value: string; desc: string }[];
    cta: string;
    ctaNote: string;
  };
  proof: {
    badge: string;
    headline: string;
    revenue: string;
    timeline: string;
    dailyPeak: string;
    description: string;
    dashboardImg: string;
    offlineClassImg: string;
    mockups: {
      fanpage: string;
      tiktok: string;
      leadsStats?: string;
      tiktokStats: string;
      fbReels: string;
      tiktokVideo: string;
    };
  };
  chart: {
    badge: string;
    headline: string;
    description: string;
    data: { month: string; marketing: number; normal: number }[];
    bullets: { title: string; normal: string; marketing: string }[];
  };
  painPoints: {
    badge: string;
    headline: string;
    subheadline: string;
    tabs: {
      id: string;
      title: string;
      subtitle: string;
      points: string[];
      outcome: string;
      media: string;
      videoId?: string;
      videoTitle?: string;
      videoSubtitle?: string;
      cards: { title: string; desc: string }[];
    }[];
    brollVideos: {
      id: string;
      title: string;
      subtitle: string;
      youtubeUrl: string;
      videoId: string;
      poster: string;
      desc: string;
    }[];
    scriptVideos: {
      id: string;
      title: string;
      subtitle: string;
      youtubeUrl: string;
      videoId: string;
      poster: string;
      desc: string;
    }[];
    lightingVideos: {
      id: string;
      title: string;
      subtitle: string;
      youtubeUrl: string;
      videoId: string;
      poster: string;
      desc: string;
    }[];
    processVideos: {
      id: string;
      title: string;
      subtitle: string;
      youtubeUrl: string;
      videoId: string;
      poster: string;
      desc: string;
    }[];
  };
  metaphors: {
    badge: string;
    headline: string;
    subheadline: string;
    items: {
      id: string;
      icon: string;
      title: string;
      subtitle: string;
      videoUrl: string;
      poster: string;
      youtubeId: string;
      youtubeUrl: string;
      output: string;
      relief: string;
      application: string;
      howTo?: string;
      strength?: string;
    }[];
  };
  curriculum: {
    badge: string;
    headline: string;
    subheadline: string;
    days: {
      dayNumber: string;
      timeRange: string;
      title: string;
      badgeCount: string;
      goal: string;
      morning: {
        sessionName: string;
        time: string;
        title: string;
        items: string[];
      };
      afternoon: {
        sessionName: string;
        time: string;
        title: string;
        items: string[];
      };
    }[];
    bonus: {
      tag: string;
      title: string;
      desc: string;
    };
  };
  showcase: {
    badge: string;
    headline: string;
    subheadline: string;
    videos: {
      id: string;
      title: string;
      author: string;
      role: string;
      desc: string;
      poster: string;
      youtubeUrl: string;
    }[];
  };
  caseStudies: {
    badge: string;
    headline: string;
    subheadline?: string;
    items: {
      name: string;
      role: string;
      niche: string;
      stats: string;
      story: string;
      videoId?: string;
      youtubeUrl?: string;
      poster?: string;
      highlights?: string[];
    }[];
  };
  targetAudience: {
    badge: string;
    headline: string;
    fit: { title: string; desc: string }[];
    notFit: { title: string; desc: string }[];
  };
  instructor: {
    badge: string;
    name: string;
    role: string;
    avatar: string;
    bio: string[];
    stats: { number: string; label: string }[];
    quote: string;
  };
  faqs: { q: string; a: string }[];
}

export const content: ContentData = {
  hero: {
    badge: "GẶP MẶT TRỰC TIẾP · HÀ NỘI · SĨ SỐ GIỚI HẠN",
    headline: "Biến Chuyên Môn Của Bạn Thành Video Marketing Đắt Giá",
    subheadline: "Khóa học offline 2 ngày cầm tay chỉ việc giúp chủ doanh nghiệp, chuyên gia, bác sĩ, giảng viên và người làm dịch vụ làm chủ toàn bộ quy trình: Viết kịch bản One-line, setup 2 góc quay điện thoại, edit video chuyên nghiệp và ứng dụng AI tự động hóa. Không cần giỏi kỹ thuật từ trước.",
    tags: [
      "KỊCH BẢN CHUYỂN ĐỔI",
      "SETUP 2 GÓC QUAY",
      "QUAY 2 CAM ĐIỆN THOẠI",
      "EDIT CHUYÊN NGHIỆP",
      "AI TỰ ĐỘNG HÓA"
    ],
    meta: [
      { label: "THỜI GIAN", value: "2 Ngày Thực Chiến", desc: "Thứ 7 & Chủ Nhật (08:30 - 17:30)" },
      { label: "ĐỊA ĐIỂM", value: "Hà Nội", desc: "Phòng Studio tiêu chuẩn chuyên nghiệp" },
      { label: "QUY MÔ", value: "≤ 40 Học Viên", desc: "Kèm cặp 1-1 ra sản phẩm ngay tại lớp" }
    ],
    cta: "ĐĂNG KÝ GIỮ CHỖ NGAY",
    ctaNote: "Chỉ nhận tối đa 40 học viên mỗi đợt để đảm bảo chất lượng cầm tay chỉ việc."
  },
  proof: {
    badge: "DỮ LIỆU ĐỐI SOÁT TỪ META BUSINESS",
    headline: "Chuyển Đổi Thực Tế Từ Fanpage 30 Ngày Học Làm Nội Dung Viral",
    revenue: "38.780+ Follower · 3.642 Leads",
    timeline: "3.642 Khách Hàng Nhắn Tin Tư Vấn",
    dailyPeak: "428 Số ĐT Để Lại Mua Khóa Học",
    description: "Toàn bộ số liệu được đối soát trực tiếp từ Meta Business Suite của Fanpage '30 Ngày Học Làm Nội Dung Viral'. Không chạy tool, không mua follow ảo — toàn bộ học viên và số điện thoại đều đến từ các video ngắn có cấu trúc chuyển đổi.",
    dashboardImg: "/assets/facebook_real_page_dashboard.png",
    offlineClassImg: "/assets/image_1781257789234-CGDyQOer.png",
    mockups: {
      fanpage: "/assets/fanpage_nguyenducviet.png",
      tiktok: "/assets/tiktok_nguyenducviet.png",
      leadsStats: "/assets/facebook_leads_stats.png",
      tiktokStats: "/assets/image_1781281379611-PpKU1pTE.png",
      fbReels: "/assets/image_1781281388562-DGSN1Etr.png",
      tiktokVideo: "/assets/image_1781281916199-DoWUR6eO.png"
    }
  },
  chart: {
    badge: "HIỆU SUẤT TĂNG TRƯỞNG",
    headline: "Video Marketing Đem Lại Thu Nhập & Thương Hiệu Gấp 10 Lần",
    description: "Khi làm video theo bản năng, bạn tốn rất nhiều thời gian nhưng người xem lướt qua nhanh và không có chuyển đổi. Khi có cấu trúc kịch bản và góc quay chuyển đổi, từng video đều trở thành cỗ máy thu hút khách hàng tiềm năng 24/7.",
    data: [
      { month: "Tháng 1", marketing: 20, normal: 18 },
      { month: "Tháng 2", marketing: 28, normal: 20 },
      { month: "Tháng 3", marketing: 64, normal: 30 },
      { month: "Tháng 4", marketing: 56, normal: 35 },
      { month: "Tháng 5", marketing: 75, normal: 48 },
      { month: "Tháng 6", marketing: 90, normal: 52 }
    ],
    bullets: [
      {
        title: "Khả năng giữ chân người xem (Retention Rate)",
        normal: "Lướt qua sau 1-2 giây vì mở đầu dài dòng, thiếu điểm nhấn",
        marketing: "Hook 3 giây sắc bén bóc đúng nỗi đau, giữ chân >60% tới cuối video"
      },
      {
        title: "Tỷ lệ chuyển đổi ra đơn (Conversion Rate)",
        normal: "Nhiều lượt xem ảo nhưng không ai inbox mua hàng hay đăng ký",
        marketing: "Điều hướng tự nhiên về phễu bán hàng, biến người xem thành khách hàng thực"
      },
      {
        title: "Sự bền bỉ và tính nhất quán (Consistency)",
        normal: "Làm vài video rồi cạn ý tưởng, nản lòng vì không có kết quả",
        marketing: "Quy trình đóng gói kịch bản và kho tư liệu B-roll quay 1 lần dùng cả tháng"
      }
    ]
  },
  painPoints: {
    badge: "BẠN ĐANG GẶP PHẢI ĐIỀU NÀY?",
    headline: "Tháo Gỡ 4 Nút Thắt Khiến Video Của Bạn Không Có Chuyển Đổi",
    subheadline: "Hầu hết mọi người bỏ cuộc không phải vì thiếu chuyên môn, mà vì mắc kẹt ở 4 cạm bẫy kỹ thuật và tư duy làm video sai cách.",
    tabs: [
      {
        id: "tab-1",
        title: "Bí Ý Khi Lên Hình",
        subtitle: "Đứng trước camera bị gượng gạo, mặt đơ, quên sạch lời thoại",
        points: [
          "Càng cố học thuộc lòng kịch bản thì mặt càng đơ, mắt đảo lia lịa đọc chữ.",
          "Nói vấp liên tục, quay đi quay lại cả chục lần vẫn không ưng ý.",
          "Mất hàng giờ đồng hồ chỉ để hoàn thành 1 đoạn video ngắn ngủi 30 giây."
        ],
        outcome: "Giải pháp: Phương pháp kịch bản One-line 3 cột + Kỹ thuật B-roll Bank (chèn cảnh trám 2-3s đè timeline) giúp bạn nói tự nhiên, che 100% lỗi nói vấp và mắt đơ.",
        media: "/assets/formats/voiceover_poster.jpg",
        cards: [
          { title: "Kịch bản One-line", desc: "Chỉ nhìn 1 từ khóa cốt lõi cho mỗi ý, nói chuyện như đang tâm sự với 1 người bạn thân." },
          { title: "Kho B-Roll Bank Xử Lý", desc: "Băm nhỏ 10-15 cảnh thao tác tay ngắn 2-3s chèn đè lên nhịp nói, che sạch lỗi vấp và mắt đơ khi lên hình." }
        ]
      },
      {
        id: "tab-2",
        title: "Lan Man Khi Viết Kịch Bản",
        subtitle: "Viết kịch bản kín chữ, thu voice đều đều như trả bài khiến khán giả lướt qua sau 3s",
        points: [
          "Viết kịch bản kín đặc trang giấy: Cố nhồi nhét quá nhiều từ ngữ chuyên môn, đọc lên bị sượng miệng và mất trọn nhịp thở tự nhiên.",
          "Hình ảnh bị ép khung theo lời đọc: Cố kéo dãn hoặc cắt vụn clip cho vừa khớp từng chữ, khiến video bị giật cục và thiếu cảm xúc.",
          "Khán giả nhận ra mùi 'đọc bài': Nghe 2 giây đầu là nhận ra giọng đọc sáo rỗng, thiếu tính đời thường và lập tức lướt qua."
        ],
        outcome: "Giải pháp: Quy trình Kịch bản One-line 3 cột & Dựng phim câm: Bẻ nhỏ kịch bản thành từng câu 5s tương ứng cảnh B-roll → Dựng phim câm khóa nhịp 0.8s-2.5s trước → Nhìn timeline thu voice trực tiếp để giữ trọn cảm xúc thật.",
        media: "/assets/showcase/vananh.jpg",
        cards: [
          { title: "Kịch bản One-line 3 cột", desc: "1 câu thoại ngắn đi kèm 1 hành động B-roll cụ thể, nhìn từ khóa là nói được ngay không lo lan man." },
          { title: "Dựng phim câm trước khi thu voice", desc: "Cắt gọt hình ảnh B-roll đạt độ cuốn hút trước, sau đó nhìn chuyển động nói trực tiếp vào CapCut." }
        ]
      },
      {
        id: "tab-3",
        title: "Quay Rồi Nhưng Chưa Chuyên Nghiệp",
        subtitle: "Hình ảnh tối tăm, âm thanh rè, góc quay đơn điệu như camera an ninh",
        points: [
          "Góc máy chính diện đơn điệu như camera an ninh, người xem nhìn 3 giây là chán.",
          "Mặt bị bóng dầu hoặc tối sầm vì không biết cách mượn ánh sáng tự nhiên và đèn cơ bản.",
          "Âm thanh lẫn tạp âm, tiếng vọng phòng làm giảm 80% độ uy tín của chuyên gia."
        ],
        outcome: "Giải pháp: Kỹ thuật setup 2 góc quay điện thoại (Góc chính diện + Góc cận 45 độ) tạo chiều sâu điện ảnh kết hợp lọc âm trong vắt.",
        media: "/assets/lighting/light_talkinghead.jpg",
        cards: [
          { title: "Setup 2 Cam Điện Thoại", desc: "Tận dụng ngay 2 chiếc smartphone có sẵn để tạo hiệu ứng chuyển góc như talkshow truyền hình." },
          { title: "Ánh sáng & Lọc tạp âm", desc: "Kỹ thuật đánh sáng 3 điểm tối giản và lọc âm AI khử 100% tiếng ồn phòng." }
        ]
      },
      {
        id: "tab-4",
        title: "Muốn Làm Đều Nhưng Không Biết Bắt Đầu",
        subtitle: "Không có quy trình sản xuất bền bỉ, mất cả ngày làm 1 clip rồi bỏ bẵng cả tháng",
        points: [
          "Mỗi lần quay là một cực hình: Từ nghĩ ý tưởng, dựng bối cảnh đến cắt ghép mất nguyên cả ngày cuối tuần.",
          "Không có kho tư liệu dự trữ: Cứ có việc bận kinh doanh là kênh bị bỏ hoang hàng tuần, mất sạch tương tác và đề xuất.",
          "Không đo lường chuyển đổi: Làm video theo cảm tính, không biết clip nào kéo khách để nhân bản mô hình."
        ],
        outcome: "Giải pháp: Đóng gói quy trình sản xuất video 1 buổi/tuần: Quay 1 buổi tích lũy kho 50+ tư liệu B-roll dùng cho cả tháng, kết hợp phễu thu thập số điện thoại và data khách tự động.",
        media: "/assets/showcase/multicam.jpg",
        cards: [
          { title: "Kho B-Roll Bank 50+ clip", desc: "Quay sẵn kho cảnh làm việc, tư vấn, đóng gói để ghép video quanh năm không bao giờ cạn ý tưởng." },
          { title: "Tự động hóa phễu ra đơn", desc: "Gắn liên kết phễu tự động thu thập data khách hàng về Google Sheet & Telegram ngay sau khi xem video." }
        ]
      }
    ],
    brollVideos: [
      {
        id: "broll-1",
        title: "Voice Over & B-Roll Đè Hình",
        subtitle: "Không cần lộ mặt, thu voice đè lên cảnh quay đời thực",
        youtubeUrl: "https://youtu.be/ZQ1Qfpln29o",
        videoId: "ZQ1Qfpln29o",
        poster: "/assets/formats/voiceover_poster.jpg",
        desc: "Quay sẵn 10-15 cảnh thao tác tay ngắn 2-3s, dựng clip trước rồi thu âm đè lên như đang tâm sự."
      },
      {
        id: "broll-2",
        title: "B-Roll Cận Cảnh Thao Tác Tay",
        subtitle: "Góc quay cận cảnh sản phẩm & thao tác làm việc",
        youtubeUrl: "https://youtu.be/IEeClHjueyk",
        videoId: "IEeClHjueyk",
        poster: "/assets/showcase/nguyet.jpg",
        desc: "Kỹ thuật quay Cutaway và Insert shot chi tiết, che sạch lỗi mắt đơ và tăng độ uy tín."
      },
      {
        id: "broll-3",
        title: "B-Roll Lifestyle Điện Ảnh",
        subtitle: "Quay dôi dư 3s, dựng phim câm trước khi thu tiếng",
        youtubeUrl: "https://youtu.be/alNkUUuE7fE",
        videoId: "alNkUUuE7fE",
        poster: "/assets/showcase/vananh.jpg",
        desc: "Tận dụng ánh sáng tự nhiên và bối cảnh đời thường tạo cảm xúc chân thật chạm người xem."
      }
    ],
    scriptVideos: [
      {
        id: "script-1",
        title: "Kịch Bản One-Line & Dựng Phim Câm",
        subtitle: "Bẻ nhỏ kịch bản 5s, dựng B-roll trước rồi thu voice",
        youtubeUrl: "https://youtu.be/alNkUUuE7fE",
        videoId: "alNkUUuE7fE",
        poster: "/assets/showcase/vananh.jpg",
        desc: "Kỹ thuật khóa nhịp cắt 0.8s-2.5s trước trên CapCut, thu âm trực tiếp để giữ nhịp thở tự nhiên."
      },
      {
        id: "script-2",
        title: "Ngắt Nhịp 5s Không Sợ Nói Vấp",
        subtitle: "Nói từng câu ngắn độc lập, không cần học thuộc lòng",
        youtubeUrl: "https://youtu.be/zcaVzUlj37s",
        videoId: "zcaVzUlj37s",
        poster: "/assets/showcase/phuong.jpg",
        desc: "Chỉ nhìn 1 từ khóa cốt lõi cho mỗi câu, nói tự nhiên như đang tâm sự với bạn thân."
      },
      {
        id: "script-3",
        title: "Dựng Ghép B-Roll Hoàn Chỉnh Tại Lớp",
        subtitle: "Kỹ thuật chèn cảnh trám và âm thanh SFX",
        youtubeUrl: "https://youtu.be/fzKa6bZPw40",
        videoId: "fzKa6bZPw40",
        poster: "/assets/showcase/thuy.jpg",
        desc: "Đồng bộ hình ảnh và câu nói, tự tay dựng xong video hoàn chỉnh ngay trong buổi học."
      }
    ],
    lightingVideos: [
      {
        id: "light-1",
        title: "Setup Ánh Sáng Talking Head",
        subtitle: "Đèn thanh Keylight 45° + Đèn ven tóc + Máy ảnh",
        youtubeUrl: "https://youtu.be/Pem27DMrkVE",
        videoId: "Pem27DMrkVE",
        poster: "/assets/lighting/light_talkinghead.jpg",
        desc: "Kỹ thuật đánh sáng 3 điểm tối giản, mặt sáng đều, da nét mịn màng không bóng dầu."
      },
      {
        id: "light-2",
        title: "Setup Ánh Sáng 2 Đèn Spotlight",
        subtitle: "1 đèn thanh + 1 đèn pin rọi phông màu tạo chiều sâu",
        youtubeUrl: "https://youtu.be/vZUmtQA2Ryc",
        videoId: "vZUmtQA2Ryc",
        poster: "/assets/lighting/light_2den_spotlight.jpg",
        desc: "Cách dùng đèn pin spotlight chiếu điểm tạo mảng màu nghệ thuật tách chủ thể khỏi nền."
      },
      {
        id: "light-3",
        title: "Setup Ánh Sáng Phỏng Vấn Podcast",
        subtitle: "Lấy sáng chuẩn phỏng vấn talkshow truyền hình",
        youtubeUrl: "https://youtu.be/Zw4Lav1FO1g",
        videoId: "Zw4Lav1FO1g",
        poster: "/assets/lighting/light_podcast_dt.jpg",
        desc: "Cân bằng ánh sáng môi trường và đèn phụ trợ để khung hình có chiều sâu điện ảnh."
      },
      {
        id: "light-4",
        title: "Setup Đèn Mini Ulanzi & Smartphone",
        subtitle: "Tối ưu cho quay di động, vlog thực chiến",
        youtubeUrl: "https://youtu.be/jO0v5kDLnk4",
        videoId: "jO0v5kDLnk4",
        poster: "/assets/lighting/light_ulanzi_aida.jpg",
        desc: "Dùng đèn LED bỏ túi kẹp trực tiếp vào smartphone để quay video sắc nét mọi lúc mọi nơi."
      }
    ],
    processVideos: [
      {
        id: "proc-1",
        title: "Quy Trình 5 Bước Sản Xuất 1 Buổi/Tuần",
        subtitle: "Ý tưởng → Kịch bản → Bấm máy → Edit CapCut → Xuất bản đều đặn",
        youtubeUrl: "https://youtu.be/-1ddyry_Qs0",
        videoId: "-1ddyry_Qs0",
        poster: "/assets/showcase/multicam.jpg",
        desc: "Quy trình tinh gọn giúp bạn sản xuất 1 buổi có sẵn 15-20 video cho cả tháng mà không bị quá tải."
      },
      {
        id: "proc-2",
        title: "Edit Timeline CapCut Siêu Tốc",
        subtitle: "Khóa nhịp cắt 0.8s-2.5s, chèn text động và âm thanh SFX",
        youtubeUrl: "https://youtu.be/AqeJxr6W6Ws",
        videoId: "AqeJxr6W6Ws",
        poster: "/assets/lighting/light_talkinghead.jpg",
        desc: "Thao tác cắt ghép trực tiếp trên màn hình, tối ưu thời gian dựng dưới 15 phút mỗi clip."
      },
      {
        id: "proc-3",
        title: "Thực Hành 1-1 Đóng Gói Tại Lớp K2",
        subtitle: "Thầy Việt trực tiếp hướng dẫn bấm máy và hoàn thiện video",
        youtubeUrl: "https://youtu.be/WV8rggcgmGA",
        videoId: "WV8rggcgmGA",
        poster: "/assets/showcase/lop_k2.jpg",
        desc: "Học viên tự tay bấm máy, dựng và xuất bản video hoàn chỉnh ngay trong 2 ngày học."
      }
    ]
  },
  metaphors: {
    badge: "4 ĐỊNH DẠNG VIDEO MARKETING THỰC CHIẾN",
    headline: "Làm Chủ 4 Định Dạng Video Giúp Ra Đơn Bền Vững",
    subheadline: "Không cần kỹ xảo phức tạp hay studio đắt tiền. Bạn chỉ cần chọn đúng 1 trong 4 định dạng phù hợp với tính cách và lĩnh vực của mình để bắt đầu quay ngay.",
    items: [
      {
        id: "format-1",
        icon: "🎙️",
        title: "Voice Over",
        subtitle: "Định dạng \"hái ra tiền\" Affiliate & TikTok Shop",
        videoUrl: "/assets/formats/voiceover.mp4",
        poster: "/assets/formats/voiceover_poster.jpg",
        youtubeId: "tjetAj9A-Ps",
        youtubeUrl: "https://youtube.com/shorts/tjetAj9A-Ps",
        output: "Định dạng phổ biến & dễ ăn đề xuất nhất trên TikTok/Shopee. Giữ chân người xem >68% nhờ nhịp cắt 1.5s, tỷ lệ click vào giỏ hàng/affiliate tăng 250%.",
        relief: "Không cần lộ mặt, không cần nói hay trước cam. Chỉ cần quay cận cảnh thao tác tay/sản phẩm rồi thu voice tâm sự hoặc ghép giọng đọc đè lên.",
        application: "Video review sản phẩm, Affiliate TikTok Shop/Shopee, unbox quà tặng, quy trình làm việc."
      },
      {
        id: "format-2",
        icon: "🚶‍♂️",
        title: "Walk and Talk",
        subtitle: "Vừa đi vừa nói tự nhiên",
        videoUrl: "/assets/formats/walktalk.mp4",
        poster: "/assets/formats/walktalk_poster.jpg",
        youtubeId: "VCLHRm_3d-k",
        youtubeUrl: "https://www.youtube.com/watch?v=VCLHRm_3d-k",
        output: "45 giây đi dạo là xong 1 clip. Khung cảnh chuyển động kéo thời lượng xem tăng 240%, tăng 300% lượt comment tranh luận.",
        relief: "Không cần studio hay kịch bản chi tiết. Cầm điện thoại đi dạo nói 1 góc nhìn ngắn như đang nói chuyện với bạn thân.",
        application: "Bàn luận chủ đề nóng, góc nhìn kinh doanh, chia sẻ trải nghiệm, gỡ rối cho khách."
      },
      {
        id: "format-3",
        icon: "🎯",
        title: "Talking Head",
        subtitle: "Chia sẻ chuyên môn (2 góc máy)",
        videoUrl: "/assets/formats/talkinghead.mp4",
        poster: "/assets/formats/talkinghead_poster.jpg",
        youtubeId: "bHzSw0csp3g",
        youtubeUrl: "https://www.youtube.com/watch?v=bHzSw0csp3g",
        output: "Tăng 400% uy tín chuyên gia từ 3s đầu. Khách hàng tin tưởng chủ động chốt các gói dịch vụ giá trị cao từ 10tr – 50tr+.",
        relief: "Không cần học thuộc lòng, nói từng câu 5s theo kịch bản One-line. Nói vấp chỉ cần đổi góc máy là che 100% lỗi.",
        application: "Bác sĩ, chủ doanh nghiệp, tư vấn tài chính, BĐS, khóa học & dịch vụ chuyên gia."
      },
      {
        id: "format-4",
        icon: "📖",
        title: "Storytelling",
        subtitle: "Kể chuyện chuyển đổi cảm xúc",
        videoUrl: "/assets/formats/storytelling.mp4",
        poster: "/assets/formats/storytelling_poster.jpg",
        youtubeId: "hkumWP1gLmo",
        youtubeUrl: "https://www.youtube.com/watch?v=hkumWP1gLmo",
        output: "Dễ dàng cán mốc 100K – 500K views hữu cơ. Tỷ lệ chuyển đổi người xem thành khách hàng thực tế đạt 15% – 20%.",
        relief: "Khách hàng tự nhìn thấy nỗi đau của chính mình trong câu chuyện và tự tìm đến mua, bạn không phải nài ép hay chào mời.",
        application: "Tâm sự khởi nghiệp, case study khách hàng trước & sau, bán sản phẩm giá trị cao."
      }
    ]
  },
  curriculum: {
    badge: "LỘ TRÌNH LỚP HỌC 2 NGÀY",
    headline: "Nội Dung Chi Tiết Theo Từng Ngày",
    subheadline: "Đi trọn quy trình sản xuất video marketing chuyển đổi cao: Từ viết kịch bản, quay 2 góc máy, làm chủ CapCut đến ứng dụng AI xây kênh tự động.",
    days: [
      {
        dayNumber: "01",
        timeRange: "09:00 – 17:00",
        title: "Viết Kịch Bản Quảng Cáo · Setup Quay 2 Cam · Edit Video Thành Phẩm",
        badgeCount: "14 nội dung chính",
        goal: "Mục tiêu ngày 1 là giúp học viên đi trọn quy trình sản xuất một video quảng cáo: từ viết kịch bản one-line, phát triển nội dung, setup ánh sáng – máy quay, quay 2 cam và edit thành video hoàn chỉnh.",
        morning: {
          sessionName: "Ca sáng",
          time: "09:00 – 12:00",
          title: "Viết kịch bản video quảng cáo chuyển đổi cao",
          items: [
            "Phân tích video quảng cáo giáo dục vs. video giải trí",
            "Các ví dụ video quảng cáo hiệu quả và lý do giữ chân",
            "Công thức viết kịch bản one-line: vấn đề, đối tượng, kết quả",
            "Cách phát triển kịch bản từ one-line thành video hoàn chỉnh",
            "Cấu trúc video: Hook → Vấn đề → Insight → Giải pháp → CTA",
            "Cách viết hook để người xem dừng lại trong 3 giây đầu",
            "Cách viết CTA dẫn người xem comment, inbox hoặc đăng ký"
          ]
        },
        afternoon: {
          sessionName: "Ca chiều",
          time: "12:00 – 17:00",
          title: "Setup ánh sáng, quay 2 cam và edit video thành phẩm",
          items: [
            "Setup bối cảnh quay đơn giản nhưng chuyên nghiệp",
            "Cách đặt ánh sáng để mặt sáng rõ, hình ảnh sạch và có chiều sâu",
            "Cách set máy quay: khung hình, tiêu cự, góc máy, chiều cao camera",
            "Quay 2 cam: góc chính và góc phụ để video sinh động hơn",
            "Cách diễn trước camera: nói rõ ý, ngắt nhịp, giữ năng lượng",
            "Import footage vừa quay và dựng bản edit đầu tiên",
            "Cắt nhịp, thêm chữ, B-roll, âm thanh, CTA và xuất video"
          ]
        }
      },
      {
        dayNumber: "02",
        timeRange: "09:00 – 17:00",
        title: "Làm Chủ Công Cụ Edit & Tư Duy Làm Video Đẹp",
        badgeCount: "14 nội dung chính",
        goal: "Mục tiêu ngày 2 là giúp học viên nắm được phần mềm edit cơ bản (CapCut), biết cách xử lý một video từ source có sẵn, đồng thời hiểu vì sao có những video nhìn 'cuốn', 'sạch', 'chuyên nghiệp' hơn dù cùng một nội dung.",
        morning: {
          sessionName: "Ca sáng",
          time: "09:00 – 12:00",
          title: "Thực hành edit với source có sẵn",
          items: [
            "Làm quen giao diện phần mềm edit CapCut",
            "Import video, âm thanh, hình ảnh vào project",
            "Cắt bỏ đoạn thừa, lỗi nói, khoảng lặng",
            "Sắp xếp timeline để video có nhịp xem mượt hơn",
            "Thêm chữ, phụ đề, tiêu đề và điểm nhấn",
            "Thêm nhạc nền, hiệu ứng và điều chỉnh âm lượng",
            "Xuất video đúng định dạng cho TikTok, Reels, Shorts"
          ]
        },
        afternoon: {
          sessionName: "Ca chiều",
          time: "13:00 – 17:00",
          title: "Biết edit rồi thì làm thế nào để video đẹp hơn?",
          items: [
            "Vì sao video edit xong vẫn nhìn 'thô' hoặc thiếu chuyên nghiệp?",
            "Cách chọn bố cục khung hình để video dễ xem hơn",
            "Cách dùng chữ trên video: font, size, màu, vị trí",
            "Cách xử lý nhịp cắt để video không bị lê thê",
            "Cách thêm B-roll, zoom, chuyển cảnh vừa đủ",
            "Cách phối nhạc, tiếng nói, sound effect có cảm xúc",
            "Checklist video đủ đẹp, đủ rõ và đủ chuyên nghiệp"
          ]
        }
      }
    ],
    bonus: {
      tag: "BONUS ĐẶC QUYỀN",
      title: "Ứng dụng AI để edit video xây kênh chỉ 5 phút mỗi ngày",
      desc: "Tự động hóa bóc tách ý tưởng, tạo hook viral, phụ đề tự động và nhân bản video đa kênh bằng công cụ AI thế hệ mới."
    }
  },
  showcase: {
    badge: "THÀNH PHẨM THỰC TẾ HỌC VIÊN",
    headline: "Xem Video Do Chính Học Viên Sản Xuất Sau Khóa Học",
    subheadline: "Từ những người chưa từng biết cầm máy hay edit, đây là những video thành phẩm được quay và dựng hoàn chỉnh 100%.",
    videos: [
      {
        id: "zcaVzUlj37s",
        title: "Tự Tin Nói Trước Camera 1 Chạm · Không Sợ Nói Vấp",
        author: "Bạn Phương",
        role: "Học Viên K2 · Bán Hàng & Đào Tạo",
        desc: "Ứng dụng kịch bản One-line và kỹ thuật ngắt nhịp 5 giây. Từ một người ngại lên hình, chỉ sau 2 ngày Phương đã tự tin quay video Talking Head chia sẻ chuyên môn cực kỳ tự nhiên, giữ chân người xem từ đầu đến cuối.",
        poster: "/assets/showcase/phuong.jpg",
        youtubeUrl: "https://youtu.be/zcaVzUlj37s"
      },
      {
        id: "alNkUUuE7fE",
        title: "Thước Phim Voice-Over Giàu Cảm Xúc & B-Roll Điện Ảnh",
        author: "Bạn Vân Anh",
        role: "Học Viên K2 · Sáng Tạo Nội Dung",
        desc: "Tận dụng không gian ánh sáng tự nhiên và kỹ thuật quay B-roll dôi dư 3 giây. Dựng phim câm trước rồi thu voice trực tiếp trên timeline CapCut, tạo nên video tâm sự chân thật, chạm sâu vào cảm xúc người xem.",
        poster: "/assets/showcase/vananh.jpg",
        youtubeUrl: "https://youtu.be/alNkUUuE7fE"
      },
      {
        id: "fzKa6bZPw40",
        title: "Từ Con Số 0 Đến Tự Tay Sản Xuất Video Hoàn Chỉnh Tại Lớp",
        author: "Bạn Thúy",
        role: "Học Viên K2 · Chủ Doanh Nghiệp",
        desc: "Chưa từng biết cầm máy hay sử dụng phần mềm edit. Sau khi được thầy cầm tay chỉ việc setup ánh sáng và cắt gọt CapCut, Thúy đã tự dựng xong video hoàn chỉnh ngay trong buổi chiều ngày thứ 2.",
        poster: "/assets/showcase/thuy.jpg",
        youtubeUrl: "https://youtu.be/fzKa6bZPw40"
      },
      {
        id: "Oa_U20Cih90",
        title: "Làm Chủ Quy Trình Video Marketing Không Phụ Thuộc Agency",
        author: "Chị Halona",
        role: "Học Viên K2 · Sáng Lập Halona",
        desc: "Trước đây tốn hàng chục triệu thuê đội ngũ quay dựng nhưng không ra đơn vì thiếu chất thật. Khóa học giúp chị tự lên kịch bản, tự quay bằng 2 chiếc điện thoại và chủ động xuất bản video hàng tuần.",
        poster: "/assets/showcase/halona.jpg",
        youtubeUrl: "https://youtu.be/Oa_U20Cih90"
      },
      {
        id: "IEeClHjueyk",
        title: "Kỹ Thuật Quay B-Roll Thao Tác Tay Đặc Tả Chi Tiết Sản Phẩm",
        author: "Chị Nguyệt",
        role: "Học Viên K2 · Bán Lẻ & Dịch Vụ",
        desc: "Áp dụng trọn vẹn kỹ thuật quay Cutaway và Insert Shot trong studio. Hình ảnh cận cảnh sắc nét, da sáng mịn, xóa sạch cảm giác nghiệp dư dù chỉ quay bằng smartphone.",
        poster: "/assets/showcase/nguyet.jpg",
        youtubeUrl: "https://youtu.be/IEeClHjueyk"
      },
      {
        id: "WV8rggcgmGA",
        title: "Cầm Tay Chỉ Việc 1-1 · Bấm Máy & Chỉnh Sửa Từng Cử Chỉ",
        author: "Lớp Offline K2",
        role: "Thực Hành Trực Tiếp Tại Studio",
        desc: "Không khí thực hành sôi nổi tại studio tiêu chuẩn. Giảng viên trực tiếp chỉnh góc máy, đo sáng, hướng dẫn khẩu hình và sửa lỗi trực tiếp trên máy tính từng học viên.",
        poster: "/assets/showcase/lop_k2.jpg",
        youtubeUrl: "https://youtu.be/WV8rggcgmGA"
      },
      {
        id: "ktBAEQCC9ik",
        title: "Ghép Nối 2 Góc Máy Mượt Mà Chuẩn Talkshow Truyền Hình",
        author: "Thực Hành Multicam",
        role: "Kỹ Thuật Dựng 2 Cam Tại Lớp",
        desc: "Học viên trực tiếp thực hành đồng bộ âm thanh đa máy quay, cắt chuyển góc đúng nhịp cảm xúc trên CapCut, che 100% lỗi nói vấp mà không cần quay lại.",
        poster: "/assets/showcase/multicam.jpg",
        youtubeUrl: "https://youtu.be/ktBAEQCC9ik"
      }
    ]
  },
  caseStudies: {
    badge: "KẾT QUẢ THỰC TẾ HỌC VIÊN",
    headline: "Học Xong Là Tự Sản Xuất Video Quảng Cáo Tuyển Sinh",
    subheadline: "Từ một giáo viên dạy tiếng Anh ngại quay mặt, bạn Nương đã tự viết kịch bản, quay bối cảnh đời thực và dựng hoàn thiện video quảng cáo thu hút hàng trăm học viên.",
    items: [
      {
        name: "Bạn Nương",
        role: "Giáo Viên & Sáng Lập Lớp Tiếng Anh Giao Tiếp",
        niche: "Đào Tạo Ngoại Ngữ & Tiếng Anh",
        stats: "Tuyển sinh >150 học viên/tháng nhờ video ngắn",
        videoId: "GqLHBWSiWDI",
        youtubeUrl: "https://youtu.be/GqLHBWSiWDI",
        poster: "/assets/showcase/nuong.jpg",
        story: "Trước đây chạy quảng cáo bài viết hình ảnh rất tốn kém mà ít người nhắn tin. Sau khóa học video thực chiến của thầy Việt, Nương tự tin cầm mic ra hiệu sách và không gian ngoài trời quay video giải quyết nỗi sợ bận rộn không có thời gian học tiếng Anh. Video tự nhiên, không diễn gượng, giữ chân người xem và mang về danh sách học viên đăng ký đều đặn mỗi ngày.",
        highlights: [
          "Áp dụng cấu trúc kịch bản Hook 3s bóc đúng tâm lý 'bận rộn'",
          "Tự tin cầm mic DJI quay ngoại cảnh không gian mở tự nhiên",
          "Dựng CapCut chèn sticker, text động và nhạc nền vui tươi",
          "Chi phí sản xuất 0đ — Chuyển đổi tuyển sinh gấp 3 lần"
        ]
      }
    ]
  },
  targetAudience: {
    badge: "BỘ LỌC ĐỐI TƯỢNG HỌC VIÊN",
    headline: "Khóa Học Này Dành Cho Ai?",
    fit: [
      {
        title: "Chủ Doanh Nghiệp, Chủ Cơ Sở Dịch Vụ, Spa, Thẩm Mỹ, Bán Lẻ",
        desc: "Muốn tự xây dựng kênh video marketing mang lại khách hàng bền vững mà không phụ thuộc hoàn toàn vào chạy quảng cáo đắt đỏ."
      },
      {
        title: "Chuyên Gia, Bác Sĩ, Coach, Giảng Viên, Người Làm Giáo Dục",
        desc: "Đã có sẵn kiến thức và chuyên môn sâu, muốn đóng gói thành các video giá trị cao để xây dựng nhân hiệu và bán khóa học/dịch vụ tư vấn."
      },
      {
        title: "Người Đang Kinh Doanh Tự Do Muốn Đột Phá Doanh Thu",
        desc: "Đã thử tự quay video nhưng lúng túng, hình ảnh xấu, nói vấp và video không có người xem hay tương tác mua hàng."
      },
      {
        title: "Người Muốn Làm Chủ Kỹ Năng Video Chuyên Nghiệp Trong 2 Ngày",
        desc: "Cần lộ trình thực chiến cầm tay chỉ việc, được thực hành bấm máy và sửa bài 1-1 tại phòng studio thay vì tự mò mẫm hàng tháng trời."
      }
    ],
    notFit: [
      {
        title: "Người Tìm Kiếm Chiêu Trò Câu View Rác",
        desc: "Khóa học tập trung vào video marketing có cấu trúc tạo ra chuyển đổi và thương hiệu bền vững, không dạy chiêu trò giật gân rẻ tiền."
      },
      {
        title: "Người Không Muốn Trực Tiếp Bấm Máy Thực Hành",
        desc: "100% thời lượng khóa học là bài tập thực hành. Nếu bạn chỉ muốn nghe lý thuyết suông mà không chịu làm bài tập, khóa học này không phù hợp."
      },
      {
        title: "Người Kỳ Vọng 'Làm Giàu Sau 1 Đêm'",
        desc: "Video marketing là tài sản tích lũy dài hạn. Nó đòi hỏi bạn áp dụng đúng quy trình và sự kiên trì trong ít nhất 30 - 60 ngày."
      }
    ]
  },
  instructor: {
    badge: "NGƯỜI TRỰC TIẾP HƯỚNG DẪN BẠN",
    name: "Thầy Nguyễn Đức Việt",
    role: "Giảng viên Multimedia & Chuyên gia Đào tạo Video Marketing (15+ năm kinh nghiệm)",
    avatar: "/assets/image_1781192246239-Dsb4zlhm.png",
    bio: [
      "15+ năm trực tiếp giảng dạy và đào tạo thiết kế, mỹ thuật đa phương tiện, lập trình và video marketing tại FPT Arena Multimedia và các hệ thống giáo dục hàng đầu.",
      "Tác giả & Mentor trang '30 Ngày Học Làm Nội Dung Viral' (23.000+ thành viên), sở hữu các kênh video chuyên môn thu hút hàng chục nghìn lượt theo dõi thực chất.",
      "Đã trực tiếp đào tạo và đồng hành cùng hơn 50.000+ học viên từ người mới bắt đầu đến khi làm chủ kỹ năng quay dựng và xây dựng kênh kinh doanh tự động hóa."
    ],
    stats: [
      { number: "15+", label: "Năm Giảng Dạy" },
      { number: "50.000+", label: "Học Viên Đã Đào Tạo" },
      { number: "23.000+", label: "Cộng Đồng Viral Content" },
      { number: "100%", label: "Cầm Tay Chỉ Việc 1-1" }
    ],
    quote: "Làm video marketing không phải là phô diễn kỹ xảo đắt tiền, mà là dùng hình ảnh và âm thanh chân thật để bóc đúng nỗi đau khách hàng và trao giải pháp tốt nhất."
  },
  faqs: [
    {
      q: "Tôi chưa từng biết quay dựng video hay dùng CapCut bao giờ, có học được không?",
      a: "Hoàn toàn học được. Khóa học được thiết kế từ con số 0 dành riêng cho người không chuyên. Thầy và đội ngũ trợ giảng sẽ kèm cặp 1-1 từng thao tác bấm máy, cắt ghép ngay trên chính chiếc điện thoại của bạn."
    },
    {
      q: "Tôi có cần phải mua máy ảnh xịn hay máy tính cấu hình khủng không?",
      a: "Không cần. Bạn chỉ cần mang theo 1-2 chiếc điện thoại thông minh (iPhone hoặc Android) và laptop cá nhân. Khóa học hướng dẫn bạn tận dụng tối đa thiết bị sẵn có để tạo ra chất lượng hình ảnh tốt nhất."
    },
    {
      q: "Lớp học tổ chức ở đâu và vào thời gian nào?",
      a: "Lớp học diễn ra trong 2 ngày Thứ 7 & Chủ Nhật (08:30 - 17:30) tại phòng Studio tiêu chuẩn chuyên nghiệp tại Hà Nội. Địa chỉ chi tiết sẽ được gửi qua Zalo/Email ngay sau khi bạn hoàn tất đăng ký giữ chỗ."
    },
    {
      q: "Sau 2 ngày học offline, tôi có được hỗ trợ tiếp không?",
      a: "Có. Bạn sẽ được tham gia nhóm Zalo kèm cặp riêng của lớp, được thầy sửa bài tập thực tế trong 30 ngày tiếp theo và nhận trọn bộ tài liệu, slide bài giảng, preset màu và kho âm thanh bản quyền."
    },
    {
      q: "Tôi rất ngại nói trước ống kính, khóa học có giúp tôi tự tin hơn không?",
      a: "Đây chính là vấn đề 90% học viên gặp phải. Với phương pháp kịch bản One-line 3 cột và kỹ thuật quay ngắt câu 5 giây, bạn sẽ thấy việc đứng trước ống kính nhẹ nhàng như đang nói chuyện với một người bạn."
    },
    {
      q: "Học phí và chính sách hoàn tiền như thế nào?",
      a: "Khóa học cam kết: Nếu sau ngày học đầu tiên bạn cảm thấy nội dung không thực tế hoặc không thể áp dụng được, ban tổ chức sẽ hoàn lại 100% học phí mà không hỏi thêm bất kỳ câu hỏi nào."
    },
    {
      q: "Sĩ số lớp là bao nhiêu học viên?",
      a: "Để đảm bảo chất lượng cầm tay chỉ việc và mọi học viên đều có sản phẩm video mang về, mỗi lớp được giới hạn nghiêm ngặt tối đa không quá 40 học viên."
    }
  ]
};
