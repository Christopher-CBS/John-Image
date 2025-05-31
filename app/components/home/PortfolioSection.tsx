"use client";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "MARIAGE",
    category: "PHOTOGRAPHIE",
    image: "/images/photo-mariage.JPG",
    theme: "mariage",
  },
  {
    title: "PORTRAIT FAMILLE",
    category: "PHOTOGRAPHIE",
    image: "/images/portrait-famille.jpg",
    theme: "portrait",
  },
  {
    title: "VIDEASTE",
    category: "VIDÉO",
    image: "/images/photo-videaste.JPG",
    theme: "video",
  },
];

export function PortfolioSection() {
  return (
    <section className="py-32 bg-black" id="portfolio">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-4 text-center text-white">
          RÉALISATIONS
        </h2>
        <div className="text-center text-gray-400 mb-16 text-lg font-light tracking-wider">
          Découvrez une sélection de mes plus belles réalisations.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] group rounded-[2rem] overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                  <span className="text-white/80 text-base tracking-[0.3em] mb-4 block font-light">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-light tracking-[0.1em] mb-4">
                    {project.title}
                  </h3>
                  <Link
                    href={`/portfolio/${project.theme}`}
                    className="inline-block px-6 py-2 border border-white/30 text-white/80 tracking-[0.15em] rounded-full hover:bg-white/10 transition font-medium text-xs shadow"
                  >
                    VOIR LE PROJET
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            href="/portfolio"
            className="px-10 py-3 border border-white/20 text-white/80 tracking-[0.2em] rounded-full hover:bg-white/10 transition font-semibold shadow-lg"
          >
            VOIR TOUT LE PORTFOLIO
          </Link>
        </div>
      </div>
    </section>
  );
}
