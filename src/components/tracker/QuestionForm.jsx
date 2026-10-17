import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { QuestionContext } from "../../context/QuestionContext";
import { CATEGORIES, STATUSES } from "../../utils/constants";
import { categoryColor, STATUS_TONE } from "../common/Badge";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const Pills = ({ name, options, register, tone }) => (
  <div className="flex flex-wrap gap-1.5">
    {options.map((o) => (
      <label key={o} className="cursor-pointer">
        <input type="radio" value={o} {...register(name)} className="peer sr-only" />
        <span className="flex items-center gap-1.5 rounded-full border border-[#D5DAE3] bg-white px-3 py-1.5 text-sm font-medium text-[#1C2541] transition-colors hover:border-[#1C2541] peer-checked:border-[#1C2541] peer-checked:bg-[#1C2541] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#2B50FF] peer-focus-visible:ring-offset-2">
          {tone && (
            <span
              className="w-2 h-2 rounded-[2px]"
              style={{ background: tone(o) }}
            />
          )}
          {o}
        </span>
      </label>
    ))}
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <span className="text-xs font-semibold text-[#5B6578] sm:w-20 shrink-0">
      {label}
    </span>
    {children}
  </div>
);

const QuestionForm = () => {
  const { addQuestion } = useContext(QuestionContext);
  const [added, setAdded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "DSA",
      difficulty: "Easy",
      status: "Pending",
    },
  });

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const submitHandle = (formData) => {
    addQuestion(formData);
    reset();
    setAdded(true);
  };

  return (
    <div className="bg-white rounded-xl border border-[#D5DAE3] p-5 mb-8">
      <h2 className="font-display text-xl font-bold text-[#1C2541] mb-4">
        Add a question
      </h2>

      <form onSubmit={handleSubmit(submitHandle)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="e.g. Binary Tree Inorder Traversal"
            className="w-full rounded-lg border border-[#D5DAE3] bg-[#F8F9FC] px-3.5 py-2.5 text-[#1C2541] placeholder:text-[#8A94A6] focus:outline-none focus:border-[#2B50FF] focus:bg-white focus:ring-2 focus:ring-[#2B50FF]/20 transition"
          />
          <AnimatePresence>
            {errors.title && (
              <motion.p
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-[#C62F3B] text-sm mt-1.5"
                role="alert"
              >
                {errors.title.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Field label="Category">
          <Pills name="category" options={CATEGORIES} register={register} tone={categoryColor} />
        </Field>
        <Field label="Difficulty">
          <Pills name="difficulty" options={DIFFICULTIES} register={register} />
        </Field>
        <Field label="Status">
          <Pills
            name="status"
            options={STATUSES}
            register={register}
            tone={(s) => STATUS_TONE[s]?.solid || "#64748B"}
          />
        </Field>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="self-start inline-flex items-center gap-2 rounded-lg bg-[#2B50FF] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#1F3FD6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B50FF] focus-visible:ring-offset-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="inline-flex items-center gap-2"
              >
                <Check size={18} /> Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="inline-flex items-center gap-2"
              >
                <Plus size={18} /> Add question
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </div>
  );
};

export default QuestionForm;