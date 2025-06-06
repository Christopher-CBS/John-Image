"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Carrousel3D from "@/components/ui/Carrousel3D";
import { Navbar } from "../components/home/Navbar";
import Link from "next/link";

// Définition du type pour les items
type GalleryItem = {
  src?: string;
  alt?: string;
  type: "image" | "video";
  category: string;
  title: string;
  location: string;
  date: string;
  desc: string;
  details?: string;
  equipment?: string;
  poster?: string;
  vimeoUrl?: string;
  tags: string[];
};

const ALL_ITEMS: GalleryItem[] = [
  // Mariage
  {
    src: "/images/Mariage/photo1.jpg",
    alt: "Mariage 1",
    type: "image",
    category: "Mariage",
    title: "Immortalisez le plus beau jour de votre vie",
    location: "Parc",
    date: "15 Juin 2023",
    desc: "Un moment unique capturé lors d'un mariage inoubliable.",
    tags: ["Mariage", "Cérémonie", "Émotion"],
  },
  {
    src: "/images/Mariage/photo2.jpg",
    alt: "Mariage 2",
    type: "image",
    category: "Mariage",
    title: "Chaque instant mérite d'être capturé",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  {
    src: "/images/Mariage/photo3.jpg",
    alt: "Mariage 3",
    type: "image",
    category: "Mariage",
    title: "Des photos pleines d'émotion et d'élégance",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  {
    src: "/images/Mariage/photo4.JPG",
    alt: "Mariage 4",
    type: "image",
    category: "Mariage",
    title: "L'art de raconter votre histoire d'amour en images",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  {
    src: "/images/Mariage/photo5.JPG",
    alt: "Mariage 5",
    type: "image",
    category: "Mariage",
    title: "Des clichés qui traversent le temps",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  {
    src: "/images/Mariage/photo6.JPG",
    alt: "Mariage 6",
    type: "image",
    category: "Mariage",
    title: "Mariages uniques, souvenirs inoubliables",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  {
    src: "/images/Mariage/photo7.JPG",
    alt: "Mariage 7",
    type: "image",
    category: "Mariage",
    title: "Mariages uniques, souvenirs inoubliables",
    location: "Parc",
    date: "22 Juillet 2023",
    desc: "Émotion et élégance lors de cette cérémonie.",
    tags: ["Mariage", "Premier Regard", "Extérieur"],
  },
  // Portrait
  {
    src: "/images/Portrait/photo1.jpg",
    alt: "Portrait 1",
    type: "image",
    category: "Portrait",
    title: "Regard Profond",
    location: "Studio Paris",
    date: "10 Mai 2023",
    desc: "Portrait artistique en lumière naturelle.",
    details:
      "Portrait en noir et blanc capturant l'essence même du sujet. La lumière naturelle sculpte les traits du visage, révélant une profondeur émotionnelle rare.",
    equipment: "Leica M10, 35mm f/1.4",
    tags: ["Portrait", "Noir & Blanc", "Studio"],
  },
  {
    src: "/images/Portrait/photo2.JPG",
    alt: "Portrait 2",
    type: "image",
    category: "Portrait",
    title: "Expression Pure",
    location: "Studio Lyon",
    date: "5 Août 2023",
    desc: "Expression et intensité du regard.",
    details:
      "Portrait minimaliste mettant en valeur l'expression authentique du sujet. L'utilisation de la lumière directionnelle crée un contraste dramatique.",
    equipment: "Fujifilm GFX 100S, 110mm f/2",
    tags: ["Portrait", "Minimaliste", "Studio"],
  },
  {
    src: "/images/Portrait/photo3.jpg",
    alt: "Portrait 3",
    type: "image",
    category: "Portrait",
    title: "Expression Pure",
    location: "Studio Lyon",
    date: "5 Août 2023",
    desc: "Expression et intensité du regard.",
    details:
      "Portrait minimaliste mettant en valeur l'expression authentique du sujet. L'utilisation de la lumière directionnelle crée un contraste dramatique.",
    equipment: "Fujifilm GFX 100S, 110mm f/2",
    tags: ["Portrait", "Minimaliste", "Studio"],
  },
  {
    src: "/images/Portrait/photo4.jpg",
    alt: "Portrait 4",
    type: "image",
    category: "Portrait",
    title: "Expression Pure",
    location: "Studio Lyon",
    date: "5 Août 2023",
    desc: "Expression et intensité du regard.",
    details:
      "Portrait minimaliste mettant en valeur l'expression authentique du sujet. L'utilisation de la lumière directionnelle crée un contraste dramatique.",
    equipment: "Fujifilm GFX 100S, 110mm f/2",
    tags: ["Portrait", "Minimaliste", "Studio"],
  },
  {
    src: "/images/Portrait/photo5.jpg",
    alt: "Portrait 5",
    type: "image",
    category: "Portrait",
    title: "Expression Pure",
    location: "Studio Lyon",
    date: "5 Août 2023",
    desc: "Expression et intensité du regard.",
    details:
      "Portrait minimaliste mettant en valeur l'expression authentique du sujet. L'utilisation de la lumière directionnelle crée un contraste dramatique.",
    equipment: "Fujifilm GFX 100S, 110mm f/2",
    tags: ["Portrait", "Minimaliste", "Studio"],
  },
  {
    src: "/images/Portrait/photo6.jpg",
    alt: "Portrait 6",
    type: "image",
    category: "Portrait",
    title: "Expression Pure",
    location: "Studio Lyon",
    date: "5 Août 2023",
    desc: "Expression et intensité du regard.",
    details:
      "Portrait minimaliste mettant en valeur l'expression authentique du sujet. L'utilisation de la lumière directionnelle crée un contraste dramatique.",
    equipment: "Fujifilm GFX 100S, 110mm f/2",
    tags: ["Portrait", "Minimaliste", "Studio"],
  },
  // Vidéos
  {
    type: "video",
    category: "Vidéaste",
    title: "Clip Vidéo Mariage",
    location: "",
    date: "",
    desc: "Vidéo corporate.",
    poster: "/images/Portfolio3/cover.jpg",
    vimeoUrl: "https://vimeo.com/1089230578?share=copy#t=0",
    tags: ["Vidéaste", "Corporate"],
  },
  // Nouvelle vidéo 1
  {
    type: "video",
    category: "Vidéaste",
    title: "Célébrattion Mariage",
    location: "", // Optionnel
    date: "", // Optionnel
    desc: "Description de votre nouvelle vidéo 1.",
    poster: "/images/video-cover.jpg", // Utilisation de l'image de couverture générale pour les vidéos
    vimeoUrl: "https://vimeo.com/1089229105?share=copy", // Remplacez par l'ID de votre vidéo Vimeo
    tags: ["Vidéaste"],
  },
];

const categories = Array.from(new Set(ALL_ITEMS.map((i) => i.category)));

export default function PortfolioPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<null | (typeof ALL_ITEMS)[0]>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const items = currentCategory
    ? ALL_ITEMS.filter((i) => i.category === currentCategory)
    : ALL_ITEMS;

  const isVideoCategorySelected = currentCategory === "Vidéaste";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar showNav={true} />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="w-full flex flex-col items-center px-8 mb-12 gap-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em]">
            PORTFOLIO
          </h1>
          <p className="text-white/60 text-center max-w-2xl text-sm md:text-base tracking-wide">
            Découvrez une sélection de mes meilleures réalisations, capturant
            des moments uniques et des émotions authentiques. Chaque image
            raconte une histoire, chaque cliché immortalise un instant précieux.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full border border-white/20 text-xs tracking-widest font-semibold transition-all ${
                  currentCategory === cat
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/10"
                }`}
                onClick={() =>
                  setCurrentCategory(currentCategory === cat ? null : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille Pinterest (Masonry) */}
        <div
          className={`columns-1 sm:columns-2 ${
            isVideoCategorySelected ? "lg:columns-2" : "lg:columns-3"
          } gap-4 max-w-7xl mx-auto px-4`}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative mb-4 break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              {/* Image ou vidéo */}
              <div
                className={`relative overflow-hidden ${
                  isVideoCategorySelected ? "rounded-3xl" : "rounded-lg"
                }`}
              >
                {item.type === "video" ? (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={item.poster || "/images/video-cover.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      priority={idx < 4}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="32"
                          fill="white"
                          fillOpacity="0.7"
                        />
                        <polygon points="26,20 48,32 26,44" fill="#222" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src || "/images/placeholder.jpg"}
                    alt={item.alt || item.title}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 4}
                    onError={(e) => {
                      console.error(`Error loading image: ${item.src}`);
                      e.currentTarget.src = "/images/placeholder.jpg";
                    }}
                  />
                )}
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end">
                  <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white/80 text-xs tracking-[0.2em] block font-light uppercase mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg font-light tracking-[0.1em]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="relative max-w-full w-full flex flex-col items-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 flex items-center gap-4">
                  <div className="text-white/60 text-sm">
                    {lightbox.title} • {lightbox.location}
                  </div>
                  <button
                    className="text-white/80 hover:text-white text-4xl z-10 bg-black/40 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-white/10 backdrop-blur"
                    onClick={() => setLightbox(null)}
                    aria-label="Fermer"
                  >
                    ×
                  </button>
                </div>
                {lightbox.type === "video" && lightbox.vimeoUrl ? (
                  <div className="w-full max-h-[95vh] aspect-video">
                    <iframe
                      src={lightbox.vimeoUrl.replace(
                        "vimeo.com",
                        "player.vimeo.com/video"
                      )}
                      className="w-full h-full rounded-3xl"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <Image
                    src={lightbox.src || "/images/placeholder.jpg"}
                    alt={lightbox.alt || lightbox.title}
                    width={1600}
                    height={1200}
                    className="w-full max-h-[95vh] object-contain rounded-3xl bg-black shadow-2xl"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
