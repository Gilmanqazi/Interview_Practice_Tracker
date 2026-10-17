import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Trash2, X } from "lucide-react";
import { useQuestion } from "../../context/QuestionContext";
import Badge, { STATUS_TONE } from "../common/Badge";
import { STATUSES } from "../../utils/constants";

const speakStatus = (questionTitle, newStatus, lang = "hi") => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance();

  if (lang === "hi") {
    // eslint-disable-next-line no-useless-assignment
    let hindiMsg = "";
    if (newStatus === "Completed") {
      hindiMsg = `${questionTitle} poora ho gaya hai!`;
    } else if (newStatus === "In Progress") {
      hindiMsg = `${questionTitle} par kaam chal raha hai.`;
    } else {
      hindiMsg = `${questionTitle} pending mein hai.`;
    }
    utterance.text = hindiMsg;
    utterance.lang = "hi-IN";
  } else {
    // eslint-disable-next-line no-useless-assignment
    let englishMsg = "";
    if (newStatus === "Completed") {
      englishMsg = `Great job! ${questionTitle} is marked as Completed.`;
    } else if (newStatus === "In Progress") {
      englishMsg = `${questionTitle} is now In Progress.`;
    } else {
      englishMsg = `${questionTitle} set to Pending.`;
    }
    utterance.text = englishMsg;
    utterance.lang = "en-IN";
  }

  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const executeSpeech = () => {
    const voices = window.speechSynthesis.getVoices();

    if (lang === "hi") {
      const hindiVoice = voices.find(
        (v) => v.lang === "hi-IN" || v.lang.toLowerCase().includes("hi")
      );
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      const enVoice = voices.find(
        (v) => v.lang === "en-IN" || v.lang === "en-US"
      );
      if (enVoice) utterance.voice = enVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    executeSpeech();
  } else {
    window.speechSynthesis.onvoiceschanged = executeSpeech;
  }
};

const QuestionCard = ({ question }) => {
  const { updateStatus, deleteQuestions } = useQuestion();
  const [confirming, setConfirming] = useState(false);
  const [stamp, setStamp] = useState(false);

  
  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(t);
  }, [confirming]);


  useEffect(() => {
    if (!stamp) return;
    const t = setTimeout(() => setStamp(false), 1500);
    return () => clearTimeout(t);
  }, [stamp]);

  if (!question) return null;

  const isDone = question.status === "Completed";
  const barColor = STATUS_TONE[question.status]?.solid || "#5B6578";

  const handleStatusChange = (newStatus) => {
    if (newStatus === question.status) return;
    updateStatus(question.id, newStatus);
    speakStatus(question.title, newStatus, "hi");
    if (newStatus === "Completed") setStamp(true);
  };

  return (
    <article className="relative overflow-hidden rounded-lg border border-[#D5DAE3] bg-white py-4 pl-6 pr-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-[#1C2541]">
      {/* status colour bar */}
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-1.5"
        animate={{ backgroundColor: barColor }}
        transition={{ duration: 0.3 }}
      />

      <div className="space-y-2 min-w-0">
        <h3
          className={`font-display text-lg font-semibold leading-snug transition-colors ${
            isDone
              ? "text-[#5B6578] line-through decoration-[#1F9D6B] decoration-2"
              : "text-[#1C2541]"
          }`}
        >
          {question.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <Badge text={question.category} />
          <Badge text={question.difficulty} />
        </div>
      </div>

      <div className="flex items-center gap-3 self-end md:self-auto">
        {/* segmented status control */}
        <div
          role="radiogroup"
          aria-label="Status"
          className="flex rounded-full bg-[#EEF1F6] p-1"
        >
          {STATUSES.map((s) => {
            const active = s === question.status;
            const tone = STATUS_TONE[s];
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => handleStatusChange(s)}
                className="relative rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B50FF]"
                style={{ color: active ? tone?.on : "#5B6578" }}
              >
                {active && (
                  <motion.span
                    layoutId={`seg-${question.id}`}
                    className="absolute inset-0"
                    style={{ background: tone?.solid, borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative">{s}</span>
              </button>
            );
          })}
        </div>

        {/* delete with inline confirm */}
        <div className="w-[72px] flex justify-end">
          <AnimatePresence mode="wait" initial={false}>
            {confirming ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.12 }}
                className="flex gap-1"
              >
                <button
                  type="button"
                  onClick={() => deleteQuestions(question.id)}
                  aria-label="Confirm delete"
                  className="p-1.5 rounded-md bg-[#E0434F] text-white hover:bg-[#C62F3B]"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  aria-label="Cancel delete"
                  className="p-1.5 rounded-md bg-[#EEF1F6] text-[#5B6578] hover:bg-[#E0E5EE]"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="trash"
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.12 }}
                onClick={() => setConfirming(true)}
                title="Delete question"
                aria-label="Delete question"
                className="p-1.5 rounded-md text-[#8A94A6] hover:text-[#C62F3B] hover:bg-[#FDECEE] transition-colors"
              >
                <Trash2 size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DONE stamp, plays when a question is marked Completed */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <AnimatePresence>
          {stamp && (
            <motion.div
              initial={{ scale: 2.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="rounded-md border-[3px] border-[#1F9D6B] bg-white/80 px-4 py-1 font-display text-2xl font-extrabold tracking-wide text-[#1F9D6B]"
            >
              DONE
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default QuestionCard;