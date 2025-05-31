"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/landing.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-center h-full px-4 md:px-20">
        {/* Bloc texte à gauche */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-start md:items-start justify-center md:justify-center text-left md:mt-40"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            className="text-xs md:text-base text-gray-400 mb-4 tracking-[0.25em] uppercase"
            variants={fadeIn}
          >
            Photographe & vidéaste d&apos;émotions
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-extralight tracking-[0.08em] mb-8 leading-tight"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block">CAPTUREZ</span>
            <span className="block mt-2">VOS INSTANTS</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg max-w-xl mb-10 text-gray-300 tracking-[0.08em] font-light"
            variants={fadeIn}
          >
            Mariages, événements, portraits&nbsp;: immortalisez vos plus beaux
            moments avec un regard artistique et moderne.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto"
            variants={fadeIn}
          >
            <Link
              href="/reserver"
              className="w-full md:w-auto px-8 py-4 text-base border border-white text-white tracking-[0.2em] font-semibold rounded transition hover:bg-white hover:text-black shadow-lg shadow-black/10 text-center"
            >
              DÉMARRER VOTRE PROJET
            </Link>
            <Link
              href="/portfolio"
              className="w-full md:w-auto px-6 py-3 text-sm border border-white/30 text-white/80 tracking-[0.2em] font-medium rounded transition hover:bg-white/10 hover:text-white text-center"
            >
              VOIR LE PORTFOLIO
            </Link>
          </motion.div>
        </motion.div>
        {/* Bloc vide à droite pour équilibrer sur desktop */}
        <div className="hidden md:block w-1/2" />
      </div>
    </section>
  );
}
