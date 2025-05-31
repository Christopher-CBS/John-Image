export const EVENT_TYPES = [
  "Mariage",
  "Anniversaire",
  "Clip",
  "Baptême",
  "Séance photo",
  "Autre",
];

export const PRESTATIONS = [
  { label: "Photo seulement", value: "photo" },
  { label: "Vidéo seulement", value: "video" },
  { label: "Photo + Vidéo", value: "both" },
];

export const YEARS = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() + i
);

export const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
