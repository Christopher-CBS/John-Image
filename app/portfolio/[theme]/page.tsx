import { GalleryClient } from "./GalleryClient";
import { Navbar } from "@/app/components/home/Navbar";

const GALLERIES = {
  mariage: {
    title: "Mariage",
    description:
      "Découvrez nos plus belles photos de mariage, capturant l'émotion et la magie de chaque instant.",
    items: [
      {
        src: "/images/Mariage/photo1.jpg",
        alt: "Mariage 1",
        type: "image",
      },
      {
        src: "/images/Mariage/photo2.jpg",
        alt: "Mariage 2",
        type: "image",
      },
      {
        src: "/images/Mariage/photo3.jpg",
        alt: "Mariage 3",
        type: "image",
      },
      {
        src: "/images/Mariage/photo4.JPG",
        alt: "Mariage 4",
        type: "image",
      },
      {
        src: "/images/Mariage/photo5.JPG",
        alt: "Mariage 5",
        type: "image",
      },
      {
        src: "/images/Mariage/photo6.JPG",
        alt: "Mariage 6",
        type: "image",
      },
      {
        src: "/images/Mariage/photo7.JPG",
        alt: "Mariage 7",
        type: "image",
      },
      {
        src: "/images/Mariage/photo8.JPG",
        alt: "Mariage 7",
        type: "image",
      },
    ],
  },
  portrait: {
    title: "Portraits",
    description: "Galerie de portraits artistiques et familiaux.",
    items: [
      { src: "/images/portrait1.jpg", alt: "Portrait 1", type: "image" },
      { src: "/images/portrait2.jpg", alt: "Portrait 2", type: "image" },
      { src: "/images/portrait3.jpg", alt: "Portrait 3", type: "image" },
      { src: "/images/portrait4.jpg", alt: "Portrait 4", type: "image" },
      { src: "/images/Portfolio2/photo1.JPG", alt: "Photo 1", type: "image" },
      { src: "/images/Portfolio2/photo5.JPG", alt: "Photo 5", type: "image" },
      { src: "/images/Portfolio2/photo2.JPG", alt: "Photo 2", type: "image" },
      { src: "/images/Portfolio2/photo3.JPG", alt: "Photo 3", type: "image" },
      { src: "/images/Portfolio2/photo4.JPG", alt: "Photo 4", type: "image" },
      // Ajoute d'autres photos de portrait ici
    ],
  },
  video: {
    title: "Vidéaste",
    description:
      "Films et extraits vidéo d'événements, mariages et projets corporate.",
    items: [
      {
        src: "/videos/first-video.mp4",
        alt: "Vidéo événementielle",
        type: "video",
        poster: "/images/Portfolio3/cover.jpg",
        vimeoUrl: "https://vimeo.com/1089230578?share=copy#t=0",
      },
      {
        src: "/videos/video2.mp4",
        alt: "Vidéo mariage",
        type: "video",
        poster: "/images/video-cover.jpg",
        vimeoUrl: "https://vimeo.com/1089229105?share=copy",
      },
    ],
  },
};

export default function GalleryPage({ params }: { params: { theme: string } }) {
  const gallery = GALLERIES[params.theme as keyof typeof GALLERIES];
  if (!gallery)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Galerie introuvable.
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white py-24 px-4">
      <Navbar showNav={true} />
      <div className="mx-auto">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] mb-4 text-center">
          {gallery.title}
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg font-light">
          {gallery.description}
        </p>
        <GalleryClient gallery={gallery} theme={params.theme} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ theme: "mariage" }, { theme: "portrait" }, { theme: "video" }];
}
