"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Composant pour vidéo Vimeo avec cover
function VimeoVideo({
  item,
  openLightbox,
  idx,
}: {
  item: any;
  openLightbox: (item: any, idx: number) => void;
  idx: number;
}) {
  const handleClick = () => {
    openLightbox(item, idx);
  };

  return (
    <div
      className="relative w-full h-auto cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={item.poster}
        alt={item.alt}
        width={1200}
        height={800}
        className="object-cover w-full h-auto rounded-3xl transition-transform duration-700 hover:scale-105"
        style={{ display: "block" }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:scale-110 transition-transform duration-300"
        >
          <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7" />
          <polygon points="26,20 48,32 26,44" fill="#222" />
        </svg>
      </div>
    </div>
  );
}

export function GalleryClient({
  gallery,
  theme,
}: {
  gallery: any;
  theme: string;
}) {
  const [lightbox, setLightbox] = useState<null | {
    src?: string;
    alt?: string;
    type: string;
    vimeoUrl?: string;
    title?: string;
  }>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);
  const [isPanoramicMode, setIsPanoramicMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isVideoTheme = theme === "video";

  const openLightbox = (item: any, idx: number) => {
    // if (item.type === "video" && item.vimeoUrl) {
    //   // Si c'est une vidéo Vimeo, ouvrir directement dans un nouvel onglet
    //   window.open(item.vimeoUrl, "_blank");
    //   return;
    // }
    setLightbox(item);
    setLightboxIdx(idx);
    setIsPanoramicMode(true);
  };

  const closeLightbox = () => {
    setLightbox(null);
    setIsPanoramicMode(false);
  };

  const next = () => {
    const nextIdx = (lightboxIdx + 1) % gallery.items.length;
    setLightbox(gallery.items[nextIdx]);
    setLightboxIdx(nextIdx);
  };

  const prev = () => {
    const prevIdx =
      (lightboxIdx - 1 + gallery.items.length) % gallery.items.length;
    setLightbox(gallery.items[prevIdx]);
    setLightboxIdx(prevIdx);
  };

  return (
    <div className="relative w-full">
      {/* Grille Masonry Pinterest */}
      <div
        className={`columns-1 sm:columns-2 ${
          isVideoTheme ? "lg:columns-2" : "lg:columns-3"
        } gap-6 max-w-6xl mx-auto px-2`}
      >
        {gallery.items.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            className="mb-6 break-inside-avoid group cursor-pointer shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => openLightbox(item, idx)}
          >
            {/* Image ou vidéo */}
            <div
              className={`relative overflow-hidden ${
                isVideoTheme ? "rounded-3xl" : "rounded-lg"
              }`}
            >
              {item.type === "video" && item.vimeoUrl ? (
                <VimeoVideo item={item} openLightbox={openLightbox} idx={idx} />
              ) : (
                <div className="relative w-full h-auto">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    style={{ display: "block" }}
                  />
                </div>
              )}
            </div>
            {/* Overlay au hover (peut être ajusté si nécessaire pour le thème vidéo) */}
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:scale-110 transition-transform duration-300"
              >
                <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.7" />
                <polygon points="26,20 48,32 26,44" fill="#222" />
              </svg>
            </div> */}
          </motion.div>
        ))}
      </div>

      {/* Lightbox en mode panoramique */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl z-10"
                onClick={closeLightbox}
                aria-label="Fermer"
              >
                ×
              </button>
              {gallery.items.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 bg-black/30 p-4 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    aria-label="Précédent"
                  >
                    &#8592;
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 bg-black/30 p-4 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    aria-label="Suivant"
                  >
                    &#8594;
                  </button>
                </>
              )}
              {/* Rendu conditionnel du contenu du lightbox */}
              {
                lightbox ? (
                  lightbox.type === "video" && lightbox.vimeoUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center max-w-[90vw] max-h-[90vh]">
                      <iframe
                        src={
                          lightbox.vimeoUrl.replace(
                            "vimeo.com",
                            "player.vimeo.com/video"
                          ) + "?autoplay=1"
                        }
                        className="w-full h-full object-contain rounded-3xl"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : lightbox.type === "image" && lightbox.src ? (
                    <Image
                      src={lightbox.src}
                      alt={lightbox.alt || lightbox.title || "Image"}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                    />
                  ) : (
                    // Fallback pour les cas où l'élément n'est ni une vidéo Vimeo valide ni une image valide
                    <div className="text-white">
                      Impossible d&apos;afficher le contenu ou contenu non
                      supporté.
                    </div>
                  )
                ) : null /* Ne rien afficher si lightbox est null */
              }

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest bg-black/30 px-4 py-2 rounded-full">
                {lightboxIdx + 1} / {gallery.items.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
