"use client";

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-10 flex flex-col items-center gap-6">
      {/* Logo */}
      <div className="text-2xl font-light tracking-[0.2em] text-white/90 mb-2 select-none">
        JOHN IMAGE
      </div>
      {/* Réseaux sociaux */}
      <div className="flex gap-6 mb-2">
        {/* Instagram */}
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/60 hover:text-pink-500 transition text-3xl"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              rx="7"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <path
              d="M16.5 7.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-4.5 1.25A3.25 3.25 0 1 1 8.75 12 3.25 3.25 0 0 1 12 8.75Zm0 5.25A2 2 0 1 0 10 12a2 2 0 0 0 2 2Zm4.25-5.5a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 7.25 8.5v7A2.25 2.25 0 0 0 9.5 17.75h4.5A2.25 2.25 0 0 0 16.75 15.5v-7ZM12 15.25A3.25 3.25 0 1 1 15.25 12 3.25 3.25 0 0 1 12 15.25Zm4.5-7.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
              fill="currentColor"
            />
          </svg>
        </a>
        {/* TikTok */}
        <a
          href="https://tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-white/60 hover:text-black transition text-3xl"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              rx="7"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <path
              d="M16.5 8.5c-.7 0-1.27-.57-1.27-1.27V6.5a.5.5 0 0 0-.5-.5h-1.23a.5.5 0 0 0-.5.5v7.23a1.73 1.73 0 1 1-1.73-1.73.5.5 0 0 0 .5-.5V11a.5.5 0 0 0-.5-.5A3.23 3.23 0 1 0 14.23 13V9.77c.36.16.76.23 1.18.23h1.09a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5H16.5Z"
              fill="currentColor"
            />
          </svg>
        </a>
        {/* WhatsApp */}
        <a
          href="https://wa.me/33695341031"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-white/60 hover:text-green-500 transition text-3xl"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              rx="7"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <path
              d="M12 4a8 8 0 0 0-6.93 11.64L4 20l4.49-1.05A8 8 0 1 0 12 4Zm0 14.5a6.48 6.48 0 0 1-3.31-.9l-.24-.14-2.67.62.57-2.6-.16-.25A6.5 6.5 0 1 1 12 18.5Zm3.54-4.13c-.19-.1-1.12-.55-1.29-.61-.17-.06-.29-.1-.41.1-.12.19-.47.61-.58.73-.1.12-.21.14-.4.05-.19-.1-.8-.29-1.52-.92-.56-.5-.94-1.12-1.05-1.31-.11-.19-.01-.29.08-.39.08-.08.19-.21.28-.32.09-.11.12-.19.18-.31.06-.12.03-.23-.01-.32-.05-.1-.41-.98-.56-1.34-.15-.36-.3-.31-.41-.32-.11-.01-.23-.01-.36-.01-.12 0-.32.05-.49.23-.17.18-.65.64-.65 1.56 0 .92.67 1.81.76 1.93.09.12 1.32 2.02 3.2 2.76.45.16.8.25 1.07.32.45.11.86.1 1.18.06.36-.05 1.12-.46 1.28-.9.16-.44.16-.82.11-.9-.05-.08-.17-.12-.36-.21Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      {/* Navigation rapide */}
      <div className="flex gap-8 text-white/50 text-sm tracking-wider mb-2">
        <a href="#about" className="hover:text-white transition-colors">
          À propos
        </a>
        <a href="#services" className="hover:text-white transition-colors">
          Services
        </a>
        <a href="/portfolio" className="hover:text-white transition-colors">
          Portfolio
        </a>
      </div>
      {/* Copyright & Créateur */}
      <div className="flex flex-col items-center gap-1 text-xs text-white/40 mt-2">
        <span>
          © 2025 JOHN IMAGE. Tous droits réservés. •{" "}
          <a
            href="/mentions legales/mentions_legales_john_image.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Mentions Légales
          </a>
        </span>
        <span>
          Site créé par{" "}
          <a
            href="https://www.wideweb.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            wideweb.fr
          </a>
        </span>
      </div>
    </footer>
  );
}
