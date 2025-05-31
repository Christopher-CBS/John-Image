import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DAYS, MONTHS, YEARS } from "@/app/constants/reservation";

interface StepEventDateProps {
  eventDay: number | null;
  setEventDay: (day: number | null) => void;
  eventMonth: string;
  setEventMonth: (month: string) => void;
  eventYear: number | null;
  setEventYear: (year: number | null) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepEventDate({
  eventDay,
  setEventDay,
  eventMonth,
  setEventMonth,
  eventYear,
  setEventYear,
  onNext,
  onPrev,
}: StepEventDateProps) {
  return (
    <motion.div
      key="event-date"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      <h2 className="text-3xl md:text-4xl font-light text-center mb-2 tracking-tight">
        Date de l&apos;événement
      </h2>
      <p className="text-white/60 text-center mb-4 max-w-md">
        Indiquez la date exacte de votre événement à couvrir.
      </p>
      <div className="flex gap-4 w-full justify-center">
        <select
          value={eventDay ?? ""}
          onChange={(e) => setEventDay(Number(e.target.value))}
          className="bg-white border-2 border-indigo-200 rounded-xl px-6 py-4 text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md min-w-[90px]"
        >
          <option value="">Jour</option>
          {DAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          value={eventMonth}
          onChange={(e) => setEventMonth(e.target.value)}
          className="bg-white border-2 border-indigo-200 rounded-xl px-6 py-4 text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md min-w-[120px]"
        >
          <option value="">Mois</option>
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={eventYear ?? ""}
          onChange={(e) => setEventYear(Number(e.target.value))}
          className="bg-white border-2 border-indigo-200 rounded-xl px-6 py-4 text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md min-w-[110px]"
        >
          <option value="">Année</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={onNext}
        className="mt-4 w-full max-w-md bg-gradient-to-r from-indigo-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold py-4 text-xl shadow-lg hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!eventDay || !eventMonth || !eventYear}
      >
        Continuer
      </Button>
      <Button
        variant="outline"
        onClick={onPrev}
        className="w-full max-w-xs border-white/20 text-white/60 hover:text-white hover:border-white/40 bg-transparent mt-2"
      >
        Retour
      </Button>
    </motion.div>
  );
}
