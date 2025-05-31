import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRESTATIONS } from "@/app/constants/reservation";

interface StepConfirmationProps {
  rdvDate: Date | undefined;
  eventDay: number | null;
  eventMonth: string;
  eventYear: number | null;
  eventType: string;
  prestation: string;
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  message: string;
}

export function StepConfirmation({
  rdvDate,
  eventDay,
  eventMonth,
  eventYear,
  eventType,
  prestation,
  prenom,
  nom,
  email,
  tel,
  message,
}: StepConfirmationProps) {
  return (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-5xl mb-4">🎉</div>
      <div className="text-2xl font-semibold mb-2 text-center">
        Merci pour votre réservation !
      </div>
      <div className="text-gray-400 mb-4 text-center">
        Nous vous recontacterons très vite pour finaliser votre projet.
      </div>
      <div className="w-full flex flex-col gap-2 text-left text-sm bg-zinc-800 rounded-xl p-4">
        <div>
          <span className="font-bold">RDV :</span>{" "}
          {rdvDate?.toLocaleDateString() || "-"}
        </div>
        <div>
          <span className="font-bold">Événement :</span>{" "}
          {eventDay && eventMonth && eventYear
            ? `${eventDay} ${eventMonth} ${eventYear}`
            : "-"}
        </div>
        <div>
          <span className="font-bold">Type :</span> {eventType}
        </div>
        <div>
          <span className="font-bold">Prestation :</span>{" "}
          {PRESTATIONS.find((p) => p.value === prestation)?.label}
        </div>
        <div>
          <span className="font-bold">Nom :</span> {prenom} {nom}
        </div>
        <div>
          <span className="font-bold">Email :</span> {email}
        </div>
        <div>
          <span className="font-bold">Téléphone :</span> {tel}
        </div>
        {message && (
          <div>
            <span className="font-bold">Message :</span> {message}
          </div>
        )}
      </div>
      <Link href="/" className="w-full max-w-xs">
        <Button className="w-full bg-white text-black rounded-full font-semibold py-3 text-lg shadow-lg hover:bg-zinc-200 transition">
          Retour à l&apos;accueil
        </Button>
      </Link>
    </motion.div>
  );
}
