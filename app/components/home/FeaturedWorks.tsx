"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const FeaturedWorks = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Fond artistique */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* En-tête artistique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Créations Uniques
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-light tracking-[0.1em] text-white/90"
          >
            ŒUVRES D&apos;ART
          </motion.h2>
        </motion.div>

        {/* Grille artistique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image principale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/portrait1.jpg"
                alt="Featured Work 1"
                fill
                className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-white/80 text-xs tracking-[0.2em] block mb-3">
                  PORTRAIT
                </span>
                <h3 className="text-white text-3xl md:text-4xl font-light tracking-[0.1em] mb-4">
                  Regard Profond
                </h3>
                <p className="text-white/60 text-sm tracking-wide max-w-md">
                  Portrait artistique capturant l&apos;essence même du sujet. La
                  lumière naturelle sculpte les traits du visage.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Deux images superposées */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/portrait2.jpg"
                  alt="Featured Work 2"
                  fill
                  className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-white/80 text-xs tracking-[0.2em] block mb-2">
                    MARIAGE
                  </span>
                  <h3 className="text-white text-2xl font-light tracking-[0.1em]">
                    Premier Regard
                  </h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/portrait3.jpg"
                  alt="Featured Work 3"
                  fill
                  className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-white/80 text-xs tracking-[0.2em] block mb-2">
                    PORTRAIT
                  </span>
                  <h3 className="text-white text-2xl font-light tracking-[0.1em]">
                    Expression Pure
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ligne décorative */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-20"
        />
      </div>
    </section>
  );
};
