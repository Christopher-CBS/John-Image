"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200); // Simule l'envoi
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center md:items-start">
        {/* Coordonnées & réseaux */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-8 md:sticky md:top-32"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-2">
            CONTACT
          </h1>
          <p className="text-white/60 mb-4 max-w-md">
            Un projet, une question, une collaboration&nbsp;? Remplissez le
            formulaire ou contactez-moi directement&nbsp;:
          </p>
          <div className="flex flex-col gap-2 text-white/80 text-base">
            <span>
              Email&nbsp;:{" "}
              <a
                href="mailto:contact@johnimage.fr"
                className="underline hover:text-indigo-400 transition"
              >
                contact@johnimage.fr
              </a>
            </span>
            <span>
              Téléphone&nbsp;:{" "}
              <a
                href="tel:+33612345678"
                className="underline hover:text-indigo-400 transition"
              >
                06 12 34 56 78
              </a>
            </span>
          </div>
          <div className="flex gap-6 mt-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/60 hover:text-pink-500 transition text-2xl"
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
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white/60 hover:text-black transition text-2xl"
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
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/60 hover:text-green-500 transition text-2xl"
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
        </motion.div>

        {/* Formulaire */}
        <motion.form
          className="w-full md:w-1/2 bg-zinc-900/80 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border border-white/10 backdrop-blur-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-light mb-2 tracking-[0.15em]">
            Envoyer un message
          </h2>
          <FloatingLabelInput
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FloatingLabelInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FloatingLabelTextarea
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <motion.button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition mt-2"
            whileTap={{ scale: 0.97 }}
            disabled={loading || sent}
          >
            {loading ? "Envoi..." : sent ? "Message envoyé !" : "Envoyer"}
          </motion.button>
          {sent && (
            <motion.p
              className="text-green-400 text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Merci pour votre message, je vous répondrai rapidement !
            </motion.p>
          )}
        </motion.form>
      </div>
    </main>
  );
}

function FloatingLabelInput({ label, ...props }: any) {
  return (
    <div className="relative">
      <input
        {...props}
        className="peer w-full bg-transparent border-b-2 border-white/20 text-white placeholder-transparent focus:outline-none focus:border-indigo-400 transition py-3 px-2 text-base"
        placeholder={label}
        autoComplete="off"
      />
      <label className="absolute left-2 top-3 text-white/40 text-base pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-indigo-400 bg-black/80 px-1">
        {label}
      </label>
    </div>
  );
}

function FloatingLabelTextarea({ label, ...props }: any) {
  return (
    <div className="relative">
      <textarea
        {...props}
        className="peer w-full bg-transparent border-b-2 border-white/20 text-white placeholder-transparent focus:outline-none focus:border-indigo-400 transition py-3 px-2 text-base min-h-[120px] resize-none"
        placeholder={label}
        autoComplete="off"
      />
      <label className="absolute left-2 top-3 text-white/40 text-base pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-indigo-400 bg-black/80 px-1">
        {label}
      </label>
    </div>
  );
}
