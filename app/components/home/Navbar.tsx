"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  showNav: boolean;
}

export function Navbar({ showNav }: NavbarProps) {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll.current) {
        // On scroll vers le bas : cacher la navbar
        setVisible(false);
      } else {
        // On scroll vers le haut : montrer la navbar
        setVisible(true);
      }
      lastScroll.current = currentScroll;
      // Réapparaît après un court délai d'arrêt du scroll
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(true), 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-5 left-0 w-full z-40"
      initial={{ y: 0 }}
      animate={{
        y: showNav && visible ? 0 : -100,
        opacity: showNav && visible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center justify-between w-full py-2">
        {/* Logo à gauche */}
        <div className="flex-1 min-w-0">
          <Link
            href="/"
            className="block pl-6 text-lg tracking-[0.2em] font-light text-white/90 hover:text-white transition"
            style={{ marginRight: 0 }}
          >
            JOHN IMAGE
          </Link>
        </div>
        {/* Menu à droite */}
        <div className="flex-1 flex justify-end items-center min-w-0 pr-4 md:pr-12">
          {/* Menu desktop */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-8">
              <Link
                href="#about"
                className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition"
              >
                À PROPOS
              </Link>
              <Link
                href="#services"
                className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition"
              >
                SERVICES
              </Link>
              <Link
                href="#portfolio"
                className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition"
              >
                PORTFOLIO
              </Link>
              <Link
                href="/reserver"
                className="px-6 py-1.5 border border-white/70 text-xs tracking-[0.2em] text-white/90 hover:bg-white hover:text-black transition"
              >
                RÉSERVER
              </Link>
            </div>
          </div>
          {/* Hamburger mobile */}
          <button
            className="md:hidden flex items-center justify-center text-white text-2xl focus:outline-none ml-2"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={32} strokeWidth={2} />
          </button>
        </div>
      </div>
      {/* Overlay menu mobile plein écran avec effet glassmorphism */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center"
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            aria-label="Fermer le menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={36} strokeWidth={2} />
          </button>
          <div className="bg-white/10 rounded-3xl px-10 py-12 shadow-2xl flex flex-col items-center gap-10">
            <span className="text-2xl font-bold text-white mb-4 tracking-widest">
              MENU
            </span>
            <nav className="flex flex-col gap-8 text-center">
              <Link
                href="#about"
                className="text-2xl font-semibold text-white/90 hover:text-[#F5E9C6] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                À PROPOS
              </Link>
              <Link
                href="#services"
                className="text-2xl font-semibold text-white/90 hover:text-[#F5E9C6] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                href="#portfolio"
                className="text-2xl font-semibold text-white/90 hover:text-[#F5E9C6] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                PORTFOLIO
              </Link>
              <Link
                href="/reserver"
                className="text-2xl font-semibold text-[#F5E9C6] border border-[#F5E9C6] px-8 py-2 rounded-full hover:bg-[#F5E9C6] hover:text-black transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                RÉSERVER
              </Link>
            </nav>
            <span className="mt-8 text-white/60 text-xs">© John Image</span>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
