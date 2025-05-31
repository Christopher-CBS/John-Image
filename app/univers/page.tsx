"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Navbar } from "@/app/components/home/Navbar";
import { Footer } from "@/app/components/home/Footer";

const sections = [
  {
    title: "Inspiration",
    text: "Des univers cinématographiques, la lumière naturelle, et l'émotion brute. Chaque projet est une nouvelle histoire à raconter.",
    img: "/images/Mariage/photo1.jpg",
  },
  {
    title: "Style",
    text: "Un style moderne, épuré, où chaque détail compte. J'aime jouer avec les contrastes, les couleurs, et les textures pour sublimer chaque instant.",
    img: "/images/Mariage/photo6.jpg",
  },
  {
    title: "Art de la vidéo",
    text: "La vidéo, c'est l'art de capturer le mouvement et l'émotion. Découvrez comment je transforme vos moments en histoires cinématographiques.",
    img: "/images/video-cover.jpg",
    videoUrl: "https://vimeo.com/VOTRE_ID_VIDEO", // Remplacez par votre ID Vimeo
    isVideo: true,
  },
  {
    title: "Behind the scenes",
    text: "L'envers du décor : la préparation, la recherche de la lumière parfaite, la complicité avec mes clients. C'est là que la magie opère.",
    img: "/images/photo3.jpg",
  },
];

export default function UniversPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Parallax pour le héros
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-30%"]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      <Navbar showNav={true} />
      {/* Héros Parallax */}
      <div className="relative w-full flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extralight tracking-[0.15em] mb-4 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Laissez-vous inspirer par la beauté du{" "}
            <span className="text-[#F5E9C6]">moment</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Un regard artistique pour révéler l&apos;extraordinaire dans
            l&apos;ordinaire.
          </motion.p>
        </div>
      </div>

      {/* Sections Parallax */}
      <div className="relative z-10 flex flex-col gap-32 py-24">
        {sections.map((section, idx) => (
          <ParallaxSection key={idx} {...section} reverse={idx % 2 === 1} />
        ))}
      </div>

      {/* Call to action final */}
      <div className="w-full flex flex-col items-center justify-center py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Prêt à vivre l&nbsp;expérience&nbsp;?
        </motion.h2>
        <Link
          href="/portfolio"
          className="px-10 py-3 rounded-full border-2 border-[#F5E9C6] text-[#F5E9C6] font-semibold shadow-lg hover:bg-[#F5E9C6]/90 hover:text-black transition text-lg tracking-widest backdrop-blur-sm"
        >
          DÉCOUVRIR LE PORTFOLIO
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function ParallaxSection({
  title,
  text,
  img,
  reverse = false,
  videoUrl,
  isVideo = false,
}: {
  title: string;
  text: string;
  img: string;
  reverse?: boolean;
  videoUrl?: string;
  isVideo?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-12 max-w-6xl mx-auto px-4`}
    >
      <motion.div
        className={`relative w-full md:w-1/2 h-[340px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl ${
          isVideo ? "cursor-pointer group" : ""
        }`}
        style={{ y }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onClick={handleClick}
      >
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        )}
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-white via-indigo-300 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
          {title}
        </h2>
        <p className="text-white/80 text-lg mb-2 max-w-xl text-center md:text-left">
          {text}
        </p>
        {isVideo && (
          <p className="text-white/60 text-sm mt-2">
            Cliquez pour regarder la vidéo sur Vimeo
          </p>
        )}
      </motion.div>
    </div>
  );
}
