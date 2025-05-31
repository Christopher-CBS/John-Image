"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUser,
  FaCog,
  FaShoppingCart,
  FaPalette,
  FaSearch,
  FaFile,
  FaFileInvoice,
  FaPaintBrush,
  FaFolder,
  FaFileUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaVideo,
  FaVideoSlash,
  FaCamera,
  FaFilm,
  FaRegSmile,
  FaPlane,
  FaUsers,
  FaBookOpen,
  FaPlayCircle,
  FaBroadcastTower,
} from "react-icons/fa";
import { SiGooglemeet, SiZoom } from "react-icons/si";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/app/components/home/Navbar";
import { useRouter } from "next/navigation";
import { Footer } from "@/app/components/home/Footer";

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Date du Rendez-vous",
    icon: FaCalendarAlt,
  },
  {
    id: 2,
    title: "Informations Client",
    icon: FaUser,
  },
  {
    id: 3,
    title: "Type d'événement",
    icon: FaFolder,
  },
  {
    id: 4,
    title: "Détails de l'événement",
    icon: FaCalendarAlt,
  },
  {
    id: 5,
    title: "Services souhaités",
    icon: FaCog,
  },
  {
    id: 6,
    title: "Référent sur place",
    icon: FaUser,
  },
  {
    id: 7,
    title: "Livraison & options",
    icon: FaFileInvoice,
  },
  {
    id: 8,
    title: "Consentement & questions",
    icon: FaCheckCircle,
  },
  {
    id: 9,
    title: "Récapitulatif",
    icon: FaCheck,
  },
];

const serviceTypes: ServiceType[] = [
  {
    id: "photo-reportage",
    name: "Reportage photo événementiel",
    description: "Couverture photographique professionnelle de votre événement",
    icon: FaCamera,
  },
  {
    id: "video-reportage",
    name: "Reportage vidéo événementiel",
    description: "Captation vidéo HD/4K de tous les moments clés",
    icon: FaVideo,
  },
  {
    id: "aftermovie",
    name: "Aftermovie / Montage vidéo",
    description: "Montage dynamique et créatif de votre événement",
    icon: FaFilm,
  },
  {
    id: "photobooth",
    name: "Photobooth / Animation photo",
    description: "Installation d'un photobooth interactif pour vos invités",
    icon: FaRegSmile,
  },
  {
    id: "drone",
    name: "Prises de vue drone",
    description: "Photos et vidéos aériennes pour un rendu spectaculaire",
    icon: FaPlane,
  },
  {
    id: "portraits",
    name: "Portraits individuels ou de groupe",
    description: "Portraits professionnels sur place, individuels ou en groupe",
    icon: FaUsers,
  },
  {
    id: "galerie-en-ligne",
    name: "Livraison galerie en ligne",
    description:
      "Accès privé à une galerie web pour visualiser et partager les photos",
    icon: FaGlobe,
  },
  {
    id: "tirages-albums",
    name: "Tirages / Albums photo",
    description: "Impression de tirages ou création d'albums personnalisés",
    icon: FaBookOpen,
  },
  {
    id: "teaser-clip",
    name: "Teaser / Clip promotionnel",
    description: "Vidéo courte et impactante pour promouvoir votre événement",
    icon: FaPlayCircle,
  },
  {
    id: "live-streaming",
    name: "Diffusion en direct (live streaming)",
    description: "Retransmission en direct de votre événement sur internet",
    icon: FaBroadcastTower,
  },
];

const timeSlots = [
  "09h00",
  "09h30",
  "10h00",
  "10h30",
  "11h00",
  "11h30",
  "14h00",
  "14h30",
  "15h00",
  "15h30",
];

interface FileWithPreview extends File {
  preview?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  selectedServices: string[];
  files: FileWithPreview[];
  meetingPlatform?: "zoom" | "meet" | null;
  eventDate?: string;
  numberOfGuests?: number;
  eventLocation?: string;
  eventPostalCode?: string;
  eventCity?: string;
  eventDuration?: string;
  specialRequirements?: string;
  referentName?: string;
  referentPhone?: string;
  deliveryFormat?: string;
  deliveryDelay?: string;
  deliveryExpress?: boolean;
  consentImageRights?: boolean;
  additionalQuestions?: string;
  deliveryFormats?: string[];
}

interface RecapBlockProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const RecapBlock: React.FC<RecapBlockProps> = ({ icon, title, content }) => (
  <div className="bg-[#19191d] rounded-2xl shadow-sm p-6 flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[#F5E9C6] text-lg">{icon}</span>
      <span className="uppercase text-xs tracking-widest text-[#F5E9C6]/80 font-semibold">
        {title}
      </span>
    </div>
    <div className="pl-7">{content}</div>
  </div>
);

const Contact = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    selectedServices: [],
    files: [],
    meetingPlatform: null,
    eventDate: "",
    numberOfGuests: undefined,
    eventLocation: "",
    eventPostalCode: "",
    eventCity: "",
    eventDuration: "",
    specialRequirements: "",
    referentName: "",
    referentPhone: "",
    deliveryFormats: [],
    deliveryDelay: "",
    deliveryExpress: false,
    consentImageRights: undefined,
    additionalQuestions: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [dateQuotaReached, setDateQuotaReached] = useState<boolean>(false);
  const [dateCheckLoading, setDateCheckLoading] = useState<boolean>(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [eventType, setEventType] = useState<string>("");
  const [otherEventType, setOtherEventType] = useState<string>("");

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handleDateSelect = async (dateString: string) => {
    setSelectedDate(dateString);
    setDateCheckLoading(true);
    setDateQuotaReached(false);
    try {
      const start = Date.now();
      const res = await fetch(
        `/api/check-date?date=${encodeURIComponent(dateString)}`
      );
      const data = await res.json();
      const elapsed = Date.now() - start;
      const minDelay = 5000; // 2 secondes
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }
      if (data.count >= 6) {
        setDateQuotaReached(true);
      } else {
        setDateQuotaReached(false);
      }
    } catch (e) {
      setDateQuotaReached(false);
    } finally {
      setDateCheckLoading(false);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate === date.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(date.toDateString())}
          disabled={isPast}
          className={`h-12 rounded-lg flex items-center justify-center text-black font-semibold transition-all duration-200
            ${
              isSelected
                ? "bg-[#F5E9C6] text-black shadow-lg ring-2 ring-[#F5E9C6]"
                : isToday
                ? "bg-white/90"
                : "bg-white hover:bg-[#F5E9C6]/60 hover:text-black"
            }
            ${isPast ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(selectedDate);
      case 2:
        return Boolean(
          formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.phone
        );
      case 3:
        return Boolean(eventType && (eventType !== "autre" || otherEventType));
      case 4:
        return Boolean(
          formData.eventDate &&
            formData.numberOfGuests &&
            formData.eventLocation &&
            formData.eventPostalCode &&
            formData.eventCity &&
            formData.eventDuration
        );
      case 5:
        return formData.selectedServices.length > 0;
      case 6:
        return Boolean(formData.referentName && formData.referentPhone);
      case 7:
        return (
          Array.isArray(formData.deliveryFormats) &&
          formData.deliveryFormats.length > 0
        );
      case 8:
        return typeof formData.consentImageRights === "boolean";
      case 9:
        return true; // Récapitulatif, pas de validation
      default:
        return true;
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      selectedServices: [],
      files: [],
      meetingPlatform: null,
      eventDate: "",
      numberOfGuests: undefined,
      eventLocation: "",
      eventPostalCode: "",
      eventCity: "",
      eventDuration: "",
      specialRequirements: "",
      referentName: "",
      referentPhone: "",
      deliveryFormats: [],
      deliveryDelay: "",
      deliveryExpress: false,
      consentImageRights: undefined,
      additionalQuestions: "",
    });
    setSelectedDate("");
    setProjectDescription("");
    setBudget("");
    setDeadline("");
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage("");
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          selectedDate,
          eventType,
          otherEventType,
          eventDate: formData.eventDate,
          eventDuration: formData.eventDuration,
          numberOfGuests: formData.numberOfGuests,
          eventLocation: formData.eventLocation,
          eventPostalCode: formData.eventPostalCode,
          eventCity: formData.eventCity,
          selectedServices: formData.selectedServices,
          deliveryFormats: formData.deliveryFormats,
          referentName: formData.referentName,
          referentPhone: formData.referentPhone,
          consentImageRights: formData.consentImageRights,
          additionalQuestions: formData.additionalQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      setShowSuccess(true);
      setShowError(false);
      setErrorMessage("");
    } catch (error) {
      setShowError(true);
      setErrorMessage(
        "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Marquer l'étape actuelle comme complétée
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      if (currentStep < 10) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(new Event("submit") as any);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-blue-400" />;
      case "pdf":
        return <FaFilePdf className="text-red-400" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-600" />;
      default:
        return <FaFile className="text-purple" />;
    }
  };

  const calculateTotalProgress = (
    currentStep: number,
    completedSteps: number[],
    uploadProgress: { [key: string]: number }
  ) => {
    // Calcul de base (80% pour les étapes principales)
    const baseProgress = (currentStep / 10) * 80;

    // Calcul pour l'upload (20% restants)
    let uploadContribution = 0;
    if (Object.keys(uploadProgress).length > 0) {
      const avgUploadProgress =
        Object.values(uploadProgress).reduce((a, b) => a + b, 0) /
        Object.keys(uploadProgress).length;
      uploadContribution = (avgUploadProgress / 100) * 20;
    } else if (currentStep === 10) {
      // Si on est à l'étape 10 mais sans fichiers (optionnel), on donne quand même les 20%
      uploadContribution = 20;
    }

    return Math.min(Math.round(baseProgress + uploadContribution), 100);
  };

  // Progression rapide mais fluide
  const animateTo100 = (fileName: string, from: number, done: () => void) => {
    let progress = from;
    const duration = 300; // ms
    const steps = 20;
    const increment = (100 - from) / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      progress += increment;
      currentStep++;
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: Math.floor(progress),
      }));
      if (currentStep >= steps) {
        clearInterval(interval);
        setUploadProgress((prev) => ({ ...prev, [fileName]: 100 }));
        done();
      }
    }, duration / steps);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files) as FileWithPreview[];
      Promise.all(
        fileList.map(
          (file) =>
            new Promise<FileWithPreview>((resolve) => {
              setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
              const reader = new FileReader();
              reader.onload = (event) => {
                file.preview = event.target?.result as string;
                // Animation fluide jusqu'à 100%
                animateTo100(file.name, uploadProgress[file.name] || 0, () =>
                  resolve(file)
                );
              };
              reader.readAsDataURL(file);
            })
        )
      ).then((filesWithPreview) => {
        setFormData((prevData) => ({ ...prevData, files: filesWithPreview }));
      });
    }
  };

  // Mettre à jour la progression totale quand l'étape change
  useEffect(() => {
    setTotalProgress(
      calculateTotalProgress(currentStep, completedSteps, uploadProgress)
    );
  }, [currentStep, completedSteps, uploadProgress]);

  const getStepStatus = (step: number) => {
    if (completedSteps.includes(step)) return "completed";
    if (step === currentStep) return "current";
    return "pending";
  };

  // Ajouter un console.log pour déboguer
  console.log("Current state:", {
    currentStep,
    showSuccess,
    isLoading,
    completedSteps,
  });

  const handleCancelProject = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    router.push("/");
  };

  // Dans la partie CSS globale (ajoutez ces classes dans votre fichier CSS global)
  const styles = `
    .fade-content {
      transition: opacity 0.5s ease-in-out;
    }

    .fade-out {
      opacity: 0;
    }
  `;

  const renderMeetingPlatforms = () => (
    <div className="mt-8">
      <h3 className="text-white font-medium mb-4">
        Choisissez une plateforme de réunion (optionnel)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              meetingPlatform: prev.meetingPlatform === "zoom" ? null : "zoom",
            }))
          }
          className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${
            formData.meetingPlatform === "zoom"
              ? "border-purple bg-purple/10"
              : "border-white/10 hover:border-purple/50"
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <SiZoom className="text-2xl text-blue-500" />
          </div>
          <div className="text-left">
            <h4 className="text-white font-medium">Zoom</h4>
            <p className="text-white/60 text-sm">
              Réunion vidéo HD (optionnel)
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              meetingPlatform: prev.meetingPlatform === "meet" ? null : "meet",
            }))
          }
          className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${
            formData.meetingPlatform === "meet"
              ? "border-purple bg-purple/10"
              : "border-white/10 hover:border-purple/50"
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <SiGooglemeet className="text-2xl text-green-500" />
          </div>
          <div className="text-left">
            <h4 className="text-white font-medium">Google Meet</h4>
            <p className="text-white/60 text-sm">
              Réunion via Google (optionnel)
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  // Drag & Drop pour l'upload de fichiers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files) as FileWithPreview[];
      Promise.all(
        fileList.map(
          (file) =>
            new Promise<FileWithPreview>((resolve) => {
              setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
              const reader = new FileReader();
              reader.onload = (event) => {
                file.preview = event.target?.result as string;
                animateTo100(file.name, uploadProgress[file.name] || 0, () =>
                  resolve(file)
                );
              };
              reader.readAsDataURL(file);
            })
        )
      ).then((filesWithPreview) => {
        setFormData((prevData) => ({
          ...prevData,
          files: [...prevData.files, ...filesWithPreview],
        }));
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };
  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour formater le numéro de téléphone avec un espace toutes les deux chiffres
  function formatPhoneNumber(value: string) {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  if (showSuccess) {
    return (
      <>
        <style jsx global>
          {styles}
        </style>
        <Navbar showNav={true} />
        <div className="min-h-screen bg-gradient-to-b from-[#1c1c22] to-[#27272c] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto bg-[#27272c]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 bg-gradient-to-tr from-[#F5E9C6] to-[#EADFA9] rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <FaCheck className="text-5xl text-green-600" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 tracking-widest">
                  Demande envoyée !
                </h2>
                <p className="text-white/70 text-lg mb-6">
                  Merci pour votre confiance.
                  <br />
                  Nous reviendrons vers vous très rapidement pour finaliser
                  votre projet.
                </p>
                <Button
                  className="px-8 py-3 bg-[#F5E9C6] text-black rounded-xl font-semibold text-lg shadow hover:bg-[#EADFA9] transition-all mt-4"
                  onClick={() => router.push("/")}
                >
                  Retour à l&apos;accueil
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style jsx global>
        {styles}
      </style>
      <Navbar showNav={true} />
      <section className="pt-24 md:pt-32 pb-0 bg-black min-h-screen flex flex-col items-center justify-start">
        <div className="max-w-2xl w-full mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] mb-4 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x section-title">
            RÉSERVEZ VOTRE EXPÉRIENCE
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light section-subtitle max-w-xl mx-auto">
            Un accompagnement sur-mesure, du premier contact à la concrétisation
            de votre projet. Sélectionnez vos besoins, partagez vos envies, et
            laissez-vous guider.
          </p>
        </div>
        <div className="w-full max-w-7xl bg-[#18181b] rounded-3xl shadow-2xl border border-white/10 p-6 md:p-12 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Timeline à gauche */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col gap-8 sticky top-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index + 1 === currentStep
                            ? "bg-white/10 border border-white"
                            : "bg-[#232326] border border-white/10"
                        }`}
                      >
                        <div
                          className={`text-xl ${
                            index + 1 === currentStep
                              ? "text-white"
                              : "text-white/40"
                          }`}
                        >
                          <step.icon className="text-2xl" />
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute left-1/2 h-full w-0.5 -bottom-8 ${
                            index + 1 === currentStep
                              ? "bg-white"
                              : "bg-white/10"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          index + 1 === currentStep
                            ? "text-white"
                            : "text-white/40"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Formulaire à droite */}
            <div className="w-full lg:w-1/2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#232326] rounded-2xl p-6 sm:p-10 shadow-xl border border-white/10"
              >
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="bg-[#18181b] rounded-xl border border-white/10 p-2 sm:p-6 w-full max-w-full">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={prevMonth}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          aria-label="Mois précédent"
                        >
                          <FaChevronLeft className="text-white/60" />
                        </button>
                        <h3 className="text-white font-medium tracking-widest uppercase">
                          {currentMonth.toLocaleDateString("fr-FR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h3>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          aria-label="Mois suivant"
                        >
                          <FaChevronRight className="text-white/60" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(
                          (day) => (
                            <div
                              key={day}
                              className="h-8 flex items-center justify-center text-xs text-white/40 font-semibold tracking-widest"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1 sm:gap-2">
                        {generateCalendarDays()}
                      </div>
                      {dateCheckLoading && (
                        <div className="text-yellow-400 mt-2 text-sm flex items-center gap-2">
                          <span role="img" aria-label="Chargement">
                            ⏳
                          </span>{" "}
                          Vérification des disponibilités...
                        </div>
                      )}
                      {!dateCheckLoading &&
                        selectedDate &&
                        !dateQuotaReached && (
                          <div className="text-green-500 mt-2 text-sm font-semibold flex items-center gap-2">
                            <span role="img" aria-label="Disponible">
                              😊
                            </span>{" "}
                            Date disponible !
                          </div>
                        )}
                      {dateQuotaReached && !dateCheckLoading && (
                        <div className="text-red-500 mt-2 text-sm font-semibold flex items-center gap-2">
                          <span role="img" aria-label="Complet">
                            😢
                          </span>{" "}
                          Cette date est déjà complète, merci d&apos;en choisir
                          une autre.
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleCancelProject}
                      >
                        Annuler
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={!selectedDate || dateQuotaReached}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        type="text"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            firstName: e.target.value,
                          }))
                        }
                        className="w-full bg-[#1c1c22] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                      />
                      <Input
                        type="text"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            lastName: e.target.value,
                          }))
                        }
                        className="w-full bg-[#1c1c22] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Adresse e-mail"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1c1c22] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                    />
                    <Input
                      type="tel"
                      placeholder="Téléphone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          phone: formatPhoneNumber(e.target.value),
                        }))
                      }
                      className="w-full bg-[#1c1c22] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          !formData.email ||
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.phone
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Quel type d&apos;événement souhaitez-vous réserver ?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Mariage", value: "mariage" },
                        { label: "Portrait", value: "portrait" },
                        { label: "Événement corporate", value: "corporate" },
                        { label: "Famille", value: "famille" },
                        { label: "Autre", value: "autre" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setEventType(option.value);
                            if (option.value !== "autre") setOtherEventType("");
                          }}
                          className={`w-full px-6 py-4 rounded-xl border transition-all font-medium text-lg
                            ${
                              eventType === option.value
                                ? "border-[#F5E9C6] bg-[#F5E9C6]/10 text-[#F5E9C6] shadow"
                                : "border-white/10 text-white hover:border-[#F5E9C6]/60 hover:text-[#F5E9C6]"
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    {eventType === "autre" && (
                      <div className="mt-4">
                        <label className="text-sm text-white/60 mb-2 block">
                          Précisez le type d&apos;événement
                        </label>
                        <Input
                          type="text"
                          placeholder="Type d'événement..."
                          value={otherEventType}
                          onChange={(e) => setOtherEventType(e.target.value)}
                          className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                        />
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          !eventType ||
                          (eventType === "autre" && !otherEventType)
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Détails de votre{" "}
                      {eventType === "mariage"
                        ? "mariage"
                        : eventType === "portrait"
                        ? "séance photo"
                        : eventType === "corporate"
                        ? "événement"
                        : eventType === "famille"
                        ? "séance famille"
                        : "événement"}
                    </h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 bg-[#1c1c22] p-6 rounded-xl border border-white/10"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm text-white/60">
                            Date de l&apos;événement
                          </label>
                          <Input
                            type="date"
                            value={formData.eventDate || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                eventDate: e.target.value,
                              }))
                            }
                            className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-white/60">
                            Nombre de personnes
                          </label>
                          <Input
                            type="number"
                            min="1"
                            value={formData.numberOfGuests || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                numberOfGuests:
                                  parseInt(e.target.value) || undefined,
                              }))
                            }
                            className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm text-white/60">
                            Adresse
                          </label>
                          <Input
                            type="text"
                            placeholder="Adresse"
                            value={formData.eventLocation || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                eventLocation: e.target.value,
                              }))
                            }
                            className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/60">
                            Code postal
                          </label>
                          <Input
                            type="text"
                            placeholder="Code postal"
                            value={formData.eventPostalCode || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                eventPostalCode: e.target.value,
                              }))
                            }
                            className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/60">Ville</label>
                          <Input
                            type="text"
                            placeholder="Ville"
                            value={formData.eventCity || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                eventCity: e.target.value,
                              }))
                            }
                            className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/60">
                            Durée estimée
                          </label>
                          <select
                            value={formData.eventDuration || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                eventDuration: e.target.value,
                              }))
                            }
                            className="w-full bg-[#232326] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                          >
                            <option value="">Sélectionnez une durée</option>
                            <option value="2h">2 heures</option>
                            <option value="4h">4 heures</option>
                            <option value="6h">6 heures</option>
                            <option value="8h">8 heures</option>
                            <option value="full-day">Journée complète</option>
                            <option value="custom">Durée personnalisée</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-white/60">
                          Besoins particuliers ou commentaires
                        </label>
                        <Textarea
                          placeholder="Décrivez vos besoins spécifiques, préférences ou questions..."
                          value={formData.specialRequirements || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              specialRequirements: e.target.value,
                            }))
                          }
                          className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30 min-h-[100px]"
                        />
                      </div>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          !formData.eventDate ||
                          !formData.numberOfGuests ||
                          !formData.eventLocation ||
                          !formData.eventPostalCode ||
                          !formData.eventCity ||
                          !formData.eventDuration
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Quels services souhaitez-vous pour votre événement ?
                    </h3>
                    <div className="flex gap-4">
                      {[
                        { label: "Photos", value: "photos" },
                        { label: "Vidéo", value: "video" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => {
                              const alreadySelected =
                                prev.selectedServices.includes(option.value);
                              return {
                                ...prev,
                                selectedServices: alreadySelected
                                  ? prev.selectedServices.filter(
                                      (s) => s !== option.value
                                    )
                                  : [...prev.selectedServices, option.value],
                              };
                            });
                          }}
                          className={`px-8 py-4 rounded-xl border transition-all font-medium text-lg
                            ${
                              formData.selectedServices.includes(option.value)
                                ? "border-[#F5E9C6] bg-[#F5E9C6]/10 text-[#F5E9C6] shadow"
                                : "border-white/10 text-white hover:border-[#F5E9C6]/60 hover:text-[#F5E9C6]"
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={formData.selectedServices.length === 0}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Coordonnées du référent sur place
                    </h3>
                    <Input
                      type="text"
                      placeholder="Nom du référent"
                      value={formData.referentName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          referentName: e.target.value,
                        }))
                      }
                      className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                    />
                    <Input
                      type="tel"
                      placeholder="Téléphone du référent"
                      value={formData.referentPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          referentPhone: formatPhoneNumber(e.target.value),
                        }))
                      }
                      className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          !formData.referentName || !formData.referentPhone
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Livraison & options
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-white/60 mb-2 block">
                          Format(s) de livraison
                        </label>
                        <div className="flex gap-4 flex-wrap">
                          {[
                            { label: "Galerie en ligne", value: "galerie" },
                            { label: "Clé USB", value: "usb" },
                            { label: "Album photo", value: "album" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center gap-2 cursor-pointer text-white/80"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  formData.deliveryFormats?.includes(
                                    option.value
                                  ) || false
                                }
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    const arr = prev.deliveryFormats || [];
                                    return {
                                      ...prev,
                                      deliveryFormats: e.target.checked
                                        ? [...arr, option.value]
                                        : arr.filter((f) => f !== option.value),
                                    };
                                  });
                                }}
                                className="accent-[#F5E9C6] w-5 h-5 rounded"
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          !Array.isArray(formData.deliveryFormats) ||
                          formData.deliveryFormats.length === 0
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Consentement & questions complémentaires
                    </h3>
                    <div className="flex flex-col gap-2 mb-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="consentImageRights"
                          checked={formData.consentImageRights === true}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              consentImageRights: true,
                            }))
                          }
                          className="accent-[#F5E9C6]"
                        />
                        <span className="text-green-400 font-semibold">
                          Oui
                        </span>
                        <span className="text-white/70 text-xs">
                          J&apos;autorise l&apos;utilisation de mes
                          images/vidéos à des fins de communication (portfolio,
                          réseaux sociaux, etc.).
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="consentImageRights"
                          checked={formData.consentImageRights === false}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              consentImageRights: false,
                            }))
                          }
                          className="accent-[#F5E9C6]"
                        />
                        <span className="text-red-400 font-semibold">Non</span>
                        <span className="text-white/70 text-xs">
                          Je refuse l&apos;utilisation de mes images/vidéos à
                          des fins de communication.
                        </span>
                      </label>
                    </div>
                    {typeof formData.consentImageRights === "boolean" && (
                      <div className="mb-4 text-sm">
                        {formData.consentImageRights ? (
                          <span className="text-green-400">
                            Merci pour votre autorisation.
                          </span>
                        ) : (
                          <span className="text-red-400">
                            Aucune image/vidéo ne sera utilisée à des fins de
                            communication.
                          </span>
                        )}
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">
                        Questions ou demandes complémentaires
                      </label>
                      <Textarea
                        placeholder="Vos demandes, précisions ou questions…"
                        value={formData.additionalQuestions || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            additionalQuestions: e.target.value,
                          }))
                        }
                        className="w-full bg-[#232326] border-white/10 text-white placeholder:text-white/40 focus:border-[#F5E9C6] focus:ring-[#F5E9C6]/30 min-h-[100px]"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="w-full bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleNext}
                        disabled={
                          typeof formData.consentImageRights !== "boolean"
                        }
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
                {currentStep === 9 && (
                  <div className="space-y-10">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center tracking-widest">
                      Récapitulatif de votre demande
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                      {/* Colonne 1 */}
                      <div className="space-y-6">
                        {/* Identité */}
                        <RecapBlock
                          icon={<FaUser />}
                          title="Identité"
                          content={
                            <>
                              <div className="text-white text-lg font-semibold">
                                {formData.firstName} {formData.lastName}
                              </div>
                              <div className="text-white text-base font-medium break-all">
                                {formData.email}
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.phone}
                              </div>
                            </>
                          }
                        />
                        {/* Date du rendez-vous */}
                        <RecapBlock
                          icon={<FaCalendarAlt />}
                          title="Date du rendez-vous"
                          content={
                            <div className="text-white text-lg font-semibold">
                              {selectedDate &&
                                new Date(selectedDate).toLocaleDateString(
                                  "fr-FR"
                                )}
                            </div>
                          }
                        />
                        {/* Événement */}
                        <RecapBlock
                          icon={<FaFolder />}
                          title="Événement"
                          content={
                            <>
                              <div className="text-white text-lg font-semibold">
                                {eventType === "autre"
                                  ? otherEventType
                                  : eventType}
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.eventDate &&
                                  new Date(
                                    formData.eventDate
                                  ).toLocaleDateString("fr-FR")}{" "}
                                ({formData.eventDuration})
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.numberOfGuests} personnes
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.eventLocation},{" "}
                                {formData.eventPostalCode} {formData.eventCity}
                              </div>
                            </>
                          }
                        />
                      </div>
                      {/* Colonne 2 */}
                      <div className="space-y-6">
                        {/* Services */}
                        <RecapBlock
                          icon={<FaCog />}
                          title="Services"
                          content={
                            <div className="flex gap-2 flex-wrap">
                              {formData.selectedServices.map((s) => (
                                <span
                                  key={s}
                                  className="bg-[#F5E9C6]/10 border border-[#F5E9C6] text-[#F5E9C6] rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                                >
                                  {s === "photos"
                                    ? "PHOTOS"
                                    : s === "video"
                                    ? "VIDÉO"
                                    : s}
                                </span>
                              ))}
                            </div>
                          }
                        />
                        {/* Livraison */}
                        <RecapBlock
                          icon={<FaFileInvoice />}
                          title="Livraison"
                          content={
                            <div className="flex gap-2 flex-wrap">
                              {formData.deliveryFormats?.map((f) => (
                                <span
                                  key={f}
                                  className="bg-[#F5E9C6]/10 border border-[#F5E9C6] text-[#F5E9C6] rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                                >
                                  {f === "galerie"
                                    ? "GALERIE EN LIGNE"
                                    : f === "usb"
                                    ? "CLÉ USB"
                                    : f === "album"
                                    ? "ALBUM PHOTO"
                                    : f}
                                </span>
                              ))}
                            </div>
                          }
                        />
                        {/* Référent */}
                        <RecapBlock
                          icon={<FaUser />}
                          title="Référent"
                          content={
                            <>
                              <div className="text-white text-lg font-semibold">
                                {formData.referentName}
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.referentPhone}
                              </div>
                            </>
                          }
                        />
                        {/* Consentement */}
                        <RecapBlock
                          icon={<FaCheckCircle />}
                          title="Consentement"
                          content={
                            <div className="text-white text-lg font-semibold">
                              {formData.consentImageRights ? "Oui" : "Non"}
                            </div>
                          }
                        />
                        {/* Questions complémentaires */}
                        {formData.additionalQuestions && (
                          <RecapBlock
                            icon={<FaCheckCircle />}
                            title="Questions complémentaires"
                            content={
                              <div className="text-white/60 text-sm">
                                {formData.additionalQuestions}
                              </div>
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-black bg-black text-[#E9D8B4] hover:bg-[#18181b] hover:text-[#F5E9C6] focus:ring-2 focus:ring-[#E9D8B4] shadow-sm transition-all duration-200 font-semibold"
                        onClick={handleBack}
                      >
                        Modifier
                      </Button>
                      <Button
                        className="w-full sm:w-auto bg-[#F5E9C6] text-black hover:bg-[#EADFA9] hover:shadow-lg focus:ring-2 focus:ring-[#F5E9C6] font-semibold transition-all duration-200"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? "Envoi en cours..." : "Valider ma demande"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </section>

      {/* Modal de confirmation */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1c1c22] p-6 rounded-xl shadow-xl border border-white/10 max-w-md w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Êtes-vous sûr de vouloir annuler ?
                </h3>
                <p className="text-white/60 mb-6">
                  Toutes les informations saisies seront perdues.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                  >
                    Continuer le projet
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors w-full sm:w-auto"
                  >
                    Oui, annuler
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message d'erreur */}
      {showError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        </motion.div>
      )}
    </>
  );
};

export default Contact;
