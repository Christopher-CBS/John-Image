"use client";

import React, { useState } from "react";
import Image from "next/image";

const VideoSection = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    setShowOverlay(false);
  };

  return (
    <section className="w-full bg-black py-24 px-4 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">
        L&apos;Art de la Vidéo
      </h2>
      <p className="text-lg text-white/70 mb-10 text-center max-w-2xl">
        Découvrez en images notre univers de vidéaste : créativité, émotion et
        storytelling pour sublimer vos événements.
      </p>
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 mb-8 relative">
        {showOverlay ? (
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src="/images/video-cover.jpg"
              alt="Vidéo de présentation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/70 transition-all duration-300 z-10 group"
              onClick={handlePlay}
              aria-label="Lire la vidéo"
            >
              <span className="flex items-center justify-center w-24 h-24 rounded-full bg-white/90 group-hover:bg-[#F5E9C6] shadow-lg transition-all duration-300">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="23"
                    stroke="#18181b"
                    strokeWidth="2"
                    fill="none"
                  />
                  <polygon points="20,16 36,24 20,32" fill="#18181b" />
                </svg>
              </span>
            </button>
          </div>
        ) : (
          <div className="w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src="https://player.vimeo.com/video/1089229105?autoplay=1"
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <a
        href="/portfolio/video"
        className="inline-block mt-4 px-8 py-3 rounded-full bg-[#F5E9C6] text-black font-semibold text-lg shadow hover:bg-[#EADFA9] transition-all"
      >
        Découvrir nos réalisations vidéo
      </a>
    </section>
  );
};

export default VideoSection;
