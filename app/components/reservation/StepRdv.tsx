import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StepRdvProps {
  rdvDate: Date | undefined;
  setRdvDate: (date: Date | undefined) => void;
  onNext: () => void;
}

export function StepRdv({ rdvDate, setRdvDate, onNext }: StepRdvProps) {
  return (
    <motion.div
      key="rdv"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      <h1 className="text-3xl md:text-5xl font-light text-center mb-2 tracking-tight">
        Réservez un appel découverte
      </h1>
      <p className="text-white/60 text-center mb-4 max-w-md">
        Choisissez la date et l&apos;heure pour discuter de votre projet, poser
        vos questions ou obtenir un devis personnalisé.
      </p>
      <Calendar
        mode="single"
        selected={rdvDate}
        onSelect={setRdvDate}
        className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-2xl w-full max-w-lg text-black"
        classNames={{
          day_selected:
            "bg-indigo-500 text-white hover:bg-indigo-600 focus:bg-indigo-600",
          day_today: "border-2 border-indigo-400",
          day: "font-semibold",
        }}
      />
      <Button
        onClick={onNext}
        className="mt-4 w-full max-w-md bg-gradient-to-r from-indigo-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold py-4 text-xl shadow-lg hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!rdvDate}
      >
        Continuer
      </Button>
    </motion.div>
  );
}
