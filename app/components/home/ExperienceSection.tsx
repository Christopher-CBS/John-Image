import React from "react";

const ExperienceSection = () => (
  <section className="w-full bg-gradient-to-br from-[#18181b] to-[#232326] py-24 px-4 flex flex-col items-center">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">
      L’<span className="text-[#F5E9C6]">Expérience</span> John Image
    </h2>
    <p className="text-lg text-white/70 mb-12 text-center max-w-2xl">
      Plus qu’un service, une aventure humaine et créative pour sublimer vos
      plus beaux moments.
    </p>
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-[#F5E9C6]/10">
        <span className="text-4xl mb-4">🎥</span>
        <h3 className="text-xl font-semibold text-white mb-2">Créativité</h3>
        <p className="text-white/60 text-center">
          Des idées originales et un regard artistique pour chaque projet.
        </p>
      </div>
      <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-[#F5E9C6]/10">
        <span className="text-4xl mb-4">🤝</span>
        <h3 className="text-xl font-semibold text-white mb-2">
          Accompagnement
        </h3>
        <p className="text-white/60 text-center">
          Un suivi personnalisé, de la première rencontre à la livraison finale.
        </p>
      </div>
      <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-[#F5E9C6]/10">
        <span className="text-4xl mb-4">✨</span>
        <h3 className="text-xl font-semibold text-white mb-2">Émotion</h3>
        <p className="text-white/60 text-center">
          Capturer l’authenticité et l’émotion de chaque instant.
        </p>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
