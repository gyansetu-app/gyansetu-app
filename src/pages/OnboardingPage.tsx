import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "or", label: "ଓଡ଼ିଆ (Oriya)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
];

const bgColors = ["#FFFBEB", "#FEF3C7"]; // amber-50, amber-100

import { useNavigate } from "react-router-dom";

// Inside OnboardingPage

function TypewriterHeading() {
  return (
    <h1 className="text-3xl font-bold text-gray-800 z-10 mb-8">
      <Typewriter
        words={[
          "Welcome to GyanSetu",
          "ज्ञानसेतु में आपका स्वागत है",
          "জ্ঞানসেতুতে স্বাগতম",
          "ज्ञानसेतुमध्ये आपले स्वागत",
          "ਗਿਆਨਸੇਤੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਹੈ",
          "جیانسیٹو میں خوش آمدید",
        ]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </h1>
  );
}

function LanguageStep({
  selectedLang,
  setSelectedLang,
  onNext,
}: {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  onNext: () => void;
}) {
  return (
    <>
      <TypewriterHeading />
      <div className="grid grid-cols-2 gap-4 mt-6 w-80">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`p-6 rounded-base text-lg border-2 font-semibold transition shadow-shadow active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none ${
              selectedLang === lang.code
                ? "bg-main text-main-foreground !shadow-none"
                : "bg-white text-gray-800 hover:bg-amber-300"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <Button
        size="lg"
        className="mt-10 w-full"
        onClick={onNext}
        disabled={!selectedLang}
      >
        Next
      </Button>
    </>
  );
}

function ClassStep({
  selectedClass,
  setSelectedClass,
  onContinue,
}: {
  selectedClass: number | null;
  setSelectedClass: (cls: number) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Select Your Class</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {Array.from({ length: 7 }, (_, i) => i + 6).map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`p-6 rounded-base text-lg border-2 font-semibold transition shadow-shadow active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none ${
              selectedClass === cls
                ? "bg-main text-main-foreground !shadow-none"
                : "bg-white text-gray-800 hover:bg-amber-300"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>
      <Button
        size="lg"
        className="mt-10 w-full"
        onClick={onContinue}
        disabled={!selectedClass}
      >
        Continue
      </Button>
    </>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  // Inside OnboardingPage
  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="relative flex flex-col items-center justify-center h-screen overflow-hidden w-full"
          initial={{ opacity: 0, backgroundColor: bgColors[step - 1] }}
          animate={{ opacity: 1, backgroundColor: bgColors[step - 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 flex flex-col items-center ">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  <LanguageStep
                    selectedLang={selectedLang}
                    setSelectedLang={setSelectedLang}
                    onNext={() => setStep(2)}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  <ClassStep
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    onContinue={() => navigate("/")} // redirect to home
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
