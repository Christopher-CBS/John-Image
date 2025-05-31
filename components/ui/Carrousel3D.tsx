"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Carrousel3DProps {
  images: { src: string; alt?: string }[];
  height?: string;
  onImageClick?: (index: number) => void;
}

const Carrousel3D: React.FC<Carrousel3DProps> = ({
  images,
  height = "400px",
  onImageClick,
}) => {
  const [imageRatios, setImageRatios] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Précharger les images pour obtenir leurs dimensions
    images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => {
        setImageRatios((prev) => ({
          ...prev,
          [img.src]: image.width / image.height,
        }));
      };
    });
  }, [images]);

  const getSlideWidth = (src: string) => {
    const ratio = imageRatios[src] || 1;
    // Si l'image est en portrait (ratio < 1), on la rend plus large
    // Si l'image est en paysage (ratio > 1), on la rend plus haute
    return ratio < 1 ? "400px" : "320px";
  };

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", height }}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        style={{ height }}
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              width: getSlideWidth(img.src),
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900/80 border-4 border-transparent group cursor-pointer transition-all duration-500 hover:border-indigo-400/40"
              onClick={() => onImageClick?.(idx)}
              style={{
                aspectRatio: imageRatios[img.src] || "auto",
                maxHeight: "90%",
                maxWidth: "90%",
              }}
            >
              <img
                src={img.src}
                alt={img.alt || "image"}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest font-light">
                  CLIQUEZ POUR VOIR
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrousel3D;
