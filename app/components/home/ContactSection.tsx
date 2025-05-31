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

export function ContactSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-black" id="contact">
      <motion.div
        className="max-w-7xl mx-auto px-4"
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
            CONTACT
          </span>
        </motion.h2>
        <div className="text-center text-gray-400 mb-16 text-lg font-light tracking-wider">
          Discutons de votre projet.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div variants={fadeIn} className="space-y-8">
            <div>
              <h3 className="text-white text-xl font-light tracking-[0.1em] mb-4">
                COORDONNÉES
              </h3>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Paris, France</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <a
                    href="mailto:contact@john-doe.com"
                    className="hover:text-white transition-colors"
                  >
                    contact@john-doe.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <a
                    href="tel:+33123456789"
                    className="hover:text-white transition-colors"
                  >
                    +33 1 23 45 67 89
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white text-xl font-light tracking-[0.1em] mb-4">
                RÉSEAUX SOCIAUX
              </h3>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  📸
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  👥
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  💼
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="bg-zinc-900/80 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-white text-xl font-light tracking-[0.1em] mb-8">
              ENVOYEZ-MOI UN MESSAGE
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  className="bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-lg font-semibold tracking-[0.1em] hover:bg-gray-200 transition-colors"
              >
                ENVOYER
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
