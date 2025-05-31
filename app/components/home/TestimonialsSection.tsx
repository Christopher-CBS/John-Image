"use client";
import React, { useState } from "react";

const defaultTestimonials = [
  {
    name: "Sophie Martin",
    role: "Mariée, Paris",
    message:
      "Un regard artistique unique, une équipe à l'écoute, et des souvenirs inoubliables. Merci John Image !",
    avatar: "SM",
  },
  {
    name: "Karim Benali",
    role: "Chef d'entreprise",
    message:
      "Des vidéos et photos sublimes, livrées rapidement. Je recommande à 100 % !",
    avatar: "KB",
  },
  {
    name: "Julie & Thomas",
    role: "Événement familial",
    message:
      "Une équipe passionnée, créative et très professionnelle. Nos invités étaient ravis !",
    avatar: "JT",
  },
];

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });
  const [current, setCurrent] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setTestimonials([
      ...testimonials,
      {
        name: form.name,
        role: "",
        message: form.message,
        avatar: form.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      },
    ]);
    setForm({ name: "", message: "" });
    setShowForm(false);
    setCurrent(testimonials.length); // aller sur le nouveau témoignage
  };

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="w-full bg-black py-24 px-4 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">
        Ils nous ont fait confiance
      </h2>
      <p className="text-lg text-white/70 mb-12 text-center max-w-2xl">
        Découvrez les retours de nos clients, qui ont vécu l&apos;expérience
        John Image.
      </p>
      <div className="relative w-full flex flex-col items-center">
        <div className="max-w-md w-full mx-auto bg-white/5 rounded-2xl shadow-xl px-4 py-8 flex flex-col items-center relative transition-all duration-500">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white border-4 border-[#F5E9C6]/30 mb-3 shadow-lg"
            style={{ background: stringToColor(t.avatar) }}
          >
            {t.avatar}
          </div>
          <span className="absolute left-3 top-4 text-3xl text-[#F5E9C6]/60 select-none">
            “
          </span>
          <p className="text-white/90 text-center italic text-base mb-4 z-10 relative">
            {t.message}
          </p>
          <span className="absolute right-3 bottom-4 text-3xl text-[#F5E9C6]/60 select-none">
            ”
          </span>
          <span className="text-[#F5E9C6] font-semibold text-base mt-2">
            {t.name}
          </span>
          {t.role && <span className="text-white/50 text-xs">{t.role}</span>}
        </div>
        {/* Dots navigation */}
        <div className="flex gap-2 mt-8 justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === current ? "bg-[#F5E9C6] scale-125" : "bg-white/20"
              }`}
              onClick={() => goTo(idx)}
              aria-label={`Témoignage ${idx + 1}`}
            />
          ))}
        </div>
        {/* Flèches navigation (optionnel) */}
        <div className="flex gap-8 mt-4 justify-center">
          <button
            onClick={prev}
            className="text-white/60 hover:text-[#F5E9C6] text-2xl px-2"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="text-white/60 hover:text-[#F5E9C6] text-2xl px-2"
          >
            ›
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        {!showForm && (
          <button
            className="text-xs text-white/60 hover:text-[#F5E9C6] underline underline-offset-4 transition mb-2"
            onClick={() => setShowForm(true)}
          >
            Laisser un avis
          </button>
        )}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 rounded-xl p-6 flex flex-col gap-4 items-center shadow-lg w-full max-w-xs"
          >
            <input
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg px-4 py-2 bg-black/60 border border-white/20 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
              maxLength={32}
              required
            />
            <textarea
              placeholder="Votre message..."
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              className="w-full rounded-lg px-4 py-2 bg-black/60 border border-white/20 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30 min-h-[80px]"
              maxLength={240}
              required
            />
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#F5E9C6] text-black font-semibold text-sm shadow hover:bg-[#EADFA9] transition-all"
              >
                Envoyer
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-full bg-black/40 text-white font-semibold text-sm border border-white/20 hover:bg-black/60 transition-all"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
