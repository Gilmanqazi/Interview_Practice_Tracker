import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useQuestion } from "../../context/QuestionContext";
import QuestionCard from "./QuestionCard";
import FilterBar from "./FilterBar";

/* ---------- Illustrations (inline SVG, no image files) ---------- */

const EmptyIllustration = ({ animated }) => (
  <motion.svg
    viewBox="0 0 220 180"
    className="w-48 h-40 mx-auto"
    animate={animated ? { y: [0, -6, 0] } : undefined}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    aria-hidden="true"
  >
    <ellipse cx="110" cy="166" rx="70" ry="8" fill="#DDE3EE" />
    {/* sheet */}
    <rect x="44" y="16" width="132" height="142" rx="8" fill="#fff" stroke="#1C2541" strokeWidth="3" />
    {[48, 84, 120].map((y) => (
      <g key={y}>
        <rect x="62" y={y - 9} width="18" height="18" rx="4" fill="#fff" stroke="#1C2541" strokeWidth="2.5" />
        <rect x="94" y={y - 4} width="60" height="8" rx="4" fill="#DDE3EE" />
      </g>
    ))}
    {/* check that draws itself */}
    <motion.path
      d="M65 48 l5 5 l9 -11"
      fill="none"
      stroke="#1F9D6B"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={animated ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
      transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.3, 0.8, 1] }}
    />
    {/* pencil */}
    <g transform="rotate(38 162 132)">
      <rect x="154" y="98" width="16" height="56" rx="3" fill="#F5B72E" stroke="#1C2541" strokeWidth="3" />
      <polygon points="154,154 170,154 162,170" fill="#F6D9B0" stroke="#1C2541" strokeWidth="3" strokeLinejoin="round" />
    </g>
  </motion.svg>
);

const NoMatchIllustration = ({ animated }) => (
  <motion.svg
    viewBox="0 0 220 180"
    className="w-44 h-36 mx-auto"
    animate={animated ? { rotate: [-4, 4, -4] } : undefined}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    aria-hidden="true"
  >
    <ellipse cx="110" cy="166" rx="64" ry="8" fill="#DDE3EE" />
    <line x1="134" y1="114" x2="170" y2="150" stroke="#1C2541" strokeWidth="12" strokeLinecap="round" />
    <circle cx="100" cy="80" r="46" fill="#fff" stroke="#1C2541" strokeWidth="6" />
    <circle cx="84" cy="72" r="5" fill="#2B50FF" />
    <circle cx="116" cy="72" r="5" fill="#2B50FF" />
    <path d="M82 102 Q100 88 118 102" stroke="#2B50FF" strokeWidth="5" fill="none" strokeLinecap="round" />
  </motion.svg>
);

/* ---------- Animation variants ---------- */

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
};

/* ---------- Component ---------- */

const QuestionList = () => {
  const { questions = [] } = useQuestion();
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredQuestions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const cat = selectedCategory.trim().toLowerCase();
    const stat = selectedStatus.trim().toLowerCase();

    return (questions || []).filter((q) => {
      const matchesSearch = !term || q?.title?.toLowerCase().includes(term);
      const matchesCategory =
        selectedCategory === "All" || q.category?.trim().toLowerCase() === cat;
      const matchesStatus =
        selectedStatus === "All" || q.status?.trim().toLowerCase() === stat;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [questions, searchTerm, selectedCategory, selectedStatus]);

  const hasActiveFilters =
    searchTerm.trim() || selectedCategory !== "All" || selectedStatus !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  /* Nothing added yet */
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-[#C3CBDA] bg-white/70 px-6 py-12 text-center">
        <EmptyIllustration animated={animated} />
        <p className="mt-4 font-display text-xl font-bold text-[#1C2541]">
          No questions yet
        </p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-[#5B6578]">
          Add your first interview question in the form above, then mark it
          done once you can answer it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <p className="text-sm text-[#5B6578]" aria-live="polite">
        Showing{" "}
        <span className="font-semibold text-[#1C2541]">
          {filteredQuestions.length}
        </span>{" "}
        of {questions.length}
      </p>

      {filteredQuestions.length > 0 ? (
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                layout={animated}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <QuestionCard question={question} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-2 border-dashed border-[#C3CBDA] bg-white/70 px-6 py-10 text-center"
        >
          <NoMatchIllustration animated={animated} />
          <p className="mt-3 font-display text-xl font-bold text-[#1C2541]">
            No matching questions
          </p>
          <p className="mt-1 text-sm text-[#5B6578]">
            Try a different keyword, category, or status.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1C2541] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2B3760] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B50FF] focus-visible:ring-offset-2"
            >
              <RotateCcw size={16} />
              Clear filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default QuestionList;