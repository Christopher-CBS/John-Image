"use client";
import React from "react";
import Carrousel3D from "@/components/ui/Carrousel3D";

const demoImages = [
  {
    src: "/images/portfolio/mariage/1.jpg",
    alt: "Mariage 1",
  },
  {
    src: "/images/portfolio/mariage/2.jpg",
    alt: "Mariage 2",
  },
  {
    src: "/images/portfolio/mariage/3.jpg",
    alt: "Mariage 3",
  },
  {
    src: "/images/portfolio/mariage/4.jpg",
    alt: "Mariage 4",
  },
  {
    src: "/images/portfolio/mariage/5.jpg",
    alt: "Mariage 5",
  },
];

export default function CarrouselDemo() {
  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Carrousel 3D
        </h1>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Une démonstration du carrousel 3D avec effet coverflow, navigation et
          pagination. Faites glisser pour voir l&apos;effet 3D en action.
        </p>

        <div className="mb-20">
          <Carrousel3D images={demoImages} height="500px" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Caractéristiques</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• Effet coverflow 3D premium</li>
              <li>• Navigation intuitive</li>
              <li>• Pagination interactive</li>
              <li>• Transitions fluides</li>
              <li>• Responsive design</li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
            <pre className="bg-black p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
              {`<Carrousel3D 
  images={[
    { src: "/image1.jpg", alt: "Image 1" },
    { src: "/image2.jpg", alt: "Image 2" }
  ]} 
  height="500px"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
