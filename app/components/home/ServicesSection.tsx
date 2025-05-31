"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCamera, FiVideo, FiFilm } from "react-icons/fi";

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

const services = [
  {
    title: "PHOTOGRAPHIE DE MARIAGE",
    desc: "Capturez votre journée spéciale avec une vision artistique et une attention aux détails.",
    icon: (
      <FiCamera className="text-4xl text-white/80 mx-auto mb-4 group-hover:text-[#F5E9C6] transition duration-300" />
    ),
    theme: "mariage",
  },
  {
    title: "COUVERTURE ÉVÉNEMENTIELLE",
    desc: "Couverture professionnelle pour vos événements d'entreprise, fêtes et occasions spéciales.",
    icon: (
      <FiVideo className="text-4xl text-white/80 mx-auto mb-4 group-hover:text-[#F5E9C6] transition duration-300" />
    ),
    theme: "video",
  },
  {
    title: "PRODUCTION VIDÉO",
    desc: "Films de mariage cinématographiques et montages événementiels qui racontent votre histoire.",
    icon: (
      <FiFilm className="text-4xl text-white/80 mx-auto mb-4 group-hover:text-[#F5E9C6] transition duration-300" />
    ),
    theme: "video",
  },
];

export function ServicesSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-black" id="services">
      {/* Motif SVG décoratif */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#fff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-4 text-center text-white relative"
          variants={fadeIn}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
            SERVICES
          </span>
        </motion.h2>
        <div className="text-center text-gray-400 mb-16 text-lg font-light tracking-wider">
          Des prestations sur-mesure pour sublimer vos plus beaux moments.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-zinc-900/80 rounded-2xl p-10 shadow-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-zinc-800/60 overflow-hidden flex flex-col justify-between"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
              style={{ minHeight: "420px" }}
            >
              {/* Effet glassmorphism au hover */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {/* Light sweep */}
              <div className="absolute left-[-60%] top-0 w-1/2 h-full bg-gradient-to-r from-white/10 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:left-[110%] pointer-events-none" />
              <div className="flex-1 flex flex-col">
                <div className="mb-6 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-light tracking-[0.1em] mb-4 text-white text-center relative">
                  {service.title}
                  {/* Soulignement animé doré-beige au hover */}
                  <span className="block h-0.5 w-0 group-hover:w-16 bg-white/40 group-hover:bg-[#F5E9C6] rounded-full transition-all duration-500 mx-auto mt-2"></span>
                </h3>
                <p className="text-gray-400 text-sm tracking-[0.1em] leading-relaxed text-center mb-6 flex-1">
                  {service.desc}
                </p>
                <div className="flex justify-center mt-auto mb-2">
                  <Link
                    href={`/portfolio/${service.theme}`}
                    className="inline-block px-6 py-2 border border-white/30 text-white/80 tracking-[0.15em] rounded-full hover:bg-white/10 transition font-medium text-xs shadow"
                  >
                    VOIR LE PROJET
                  </Link>
                </div>
                {/* Badge flèche animé */}
                <span className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white/70 text-2xl select-none">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Link
            href="/reserver"
            className="px-10 py-3 border border-white/20 text-white/80 tracking-[0.2em] rounded-full hover:bg-white/10 transition font-semibold shadow-lg"
          >
            DEMANDER UN DEVIS
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
