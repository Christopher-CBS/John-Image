import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { EVENT_TYPES, PRESTATIONS } from "@/app/constants/reservation";

interface StepDetailsProps {
  eventType: string;
  setEventType: (type: string) => void;
  prestation: string;
  setPrestation: (prestation: string) => void;
  nom: string;
  setNom: (nom: string) => void;
  prenom: string;
  setPrenom: (prenom: string) => void;
  email: string;
  setEmail: (email: string) => void;
  tel: string;
  setTel: (tel: string) => void;
  message: string;
  setMessage: (message: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepDetails({
  eventType,
  setEventType,
  prestation,
  setPrestation,
  nom,
  setNom,
  prenom,
  setPrenom,
  email,
  setEmail,
  tel,
  setTel,
  message,
  setMessage,
  onNext,
  onPrev,
}: StepDetailsProps) {
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      <h2 className="text-3xl md:text-4xl font-light text-center mb-2 tracking-tight">
        Détails du projet
      </h2>
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {EVENT_TYPES.map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => setEventType(type)}
            className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
              eventType === type
                ? "bg-white text-black border-white"
                : "bg-zinc-900 border-white/20 text-white/80 hover:bg-white/10"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {PRESTATIONS.map((p) => (
          <button
            type="button"
            key={p.value}
            onClick={() => setPrestation(p.value)}
            className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
              prestation === p.value
                ? "bg-white text-black border-white"
                : "bg-zinc-900 border-white/20 text-white/80 hover:bg-white/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Input
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="bg-white border-2 border-indigo-200 text-black text-lg font-semibold rounded-xl py-4 px-6 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Input
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="bg-white border-2 border-indigo-200 text-black text-lg font-semibold rounded-xl py-4 px-6 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-2 border-indigo-200 text-black text-lg font-semibold rounded-xl py-4 px-6 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Input
          placeholder="Téléphone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="bg-white border-2 border-indigo-200 text-black text-lg font-semibold rounded-xl py-4 px-6 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <Textarea
        placeholder="Votre message (optionnel)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-white border-2 border-indigo-200 text-black text-lg font-semibold rounded-xl py-4 px-6 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px] mt-4"
      />
      <Button
        onClick={onNext}
        className="mt-4 w-full max-w-md bg-gradient-to-r from-indigo-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold py-4 text-xl shadow-lg hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={
          !eventType || !prestation || !nom || !prenom || !email || !tel
        }
      >
        Envoyer
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
