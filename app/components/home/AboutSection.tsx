"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-black" id="about">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16">
        {/* Image artistique ou portrait */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 w-96 h-96 rounded-full overflow-hidden shadow-2xl group md:mr-12"
          style={{ perspective: 1000 }}
          whileHover={{
            rotateY: 8,
            scale: 1.04,
            boxShadow: "0 8px 40px 0 #fff3",
          }}
        >
          <Image
            src="/images/about-portrait.jpg"
            alt="Portrait"
            width={520}
            height={520}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
          {/* Halo lumineux au survol */}
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none group-hover:shadow-[0_0_60px_10px_rgba(255,255,255,0.15)] transition-all duration-500" />
          {/* Badge signature */}
          <div className="absolute bottom-6 right-6 bg-white/10 px-4 py-1 rounded-full text-xs text-white font-semibold tracking-widest shadow-lg backdrop-blur-sm">
            JOHN IMAGE
          </div>
        </motion.div>

        {/* Texte de présentation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl text-center md:text-left z-10 md:ml-0 flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.15em] mb-8 text-white relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
              À PROPOS
            </span>
            <span
              className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/60 to-white/0 rounded-full animate-pulse"
              style={{ animationDuration: "2s" }}
            />
          </h2>
          <blockquote className="text-2xl md:text-xl italic text-white/80 mb-6 font-serif relative">
            <span className="bg-gradient-to-r from-[#fff] via-[#e0e0e0] to-[#fff] bg-clip-text text-transparent animate-gradient-x">
              &quot;La photographie, c&apos;est l&apos;art de raconter une
              histoire sans dire un mot.&quot;
            </span>
          </blockquote>
          <p className="text-gray-300 text-base md:text-lg mb-8 font-light leading-relaxed">
            Passionné par l&apos;image et l&apos;émotion, je capture vos plus
            beaux instants avec un regard moderne et artistique. Mariages,
            portraits, événements : chaque projet est une nouvelle aventure
            humaine et créative.
          </p>
          {/* Compteurs animés */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-white block">+10</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Années d&apos;expérience
              </span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-white block">+200</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Projets réalisés
              </span>
            </div>
          </div>
          <Link
            href="/univers"
            className="inline-block w-auto mx-auto px-8 py-3 border border-white text-white rounded-full tracking-[0.2em] hover:bg-white hover:text-black transition font-semibold shadow-lg"
          >
            DÉCOUVRIR MON UNIVERS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
