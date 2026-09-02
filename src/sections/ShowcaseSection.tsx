import React, { useState } from 'react';
import { content } from '../content';
import { Sparkles, Play, CheckCircle2, X, ExternalLink } from 'lucide-react';

export const ShowcaseSection: React.FC = () => {
  const { showcase } = content;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const selectedVideo = showcase.videos.find((v) => v.id === activeVideoId);

  return (
    <section id="showcase" className="py-24 px-4 bg-[#09090b] border-y border-zinc-800/80 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{showcase.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-[1.18] [text-wrap:balance]">
            {showcase.headline}
          </h2>
          <p className="font-sans text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto [text-wrap:balance]">
            {showcase.subheadline}
          </p>
        </div>

        {/* 7 YouTube Responsive Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {showcase.videos.map((vid, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border border-zinc-800 bg-zinc-900/90 shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-emerald-950/30 transition-all duration-300 group"
            >
              <div>
                {/* 9:16 Vertical Video Poster & Play Button Container */}
                <div
                  onClick={() => setActiveVideoId(vid.id)}
                  className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-950 mb-5 border border-zinc-800 relative cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 shadow-inner"
                >
                  <img
                    src={vid.poster}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Red YouTube-style Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-2xl bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transition-all duration-200 group-hover:scale-110">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Top Badge: Author & Tag */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white z-10">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      {vid.author}
                    </span>
                    <span className="bg-red-600/90 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                      YouTube
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="font-sans font-bold text-white text-base sm:text-lg">
                      {vid.author}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/30 truncate">
                    {vid.role}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {vid.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans mt-1.5">
                  {vid.desc}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <button
                  onClick={() => setActiveVideoId(vid.id)}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>XEM VIDEO</span>
                </button>
                <a
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <span>Mở YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  {selectedVideo.role}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-0.5">
                  {selectedVideo.author}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoId(null)}
                className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner mb-4">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Description */}
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {selectedVideo.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};


