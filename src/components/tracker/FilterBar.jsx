import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { CATEGORIES, STATUSES } from "../../utils/constants";
import { categoryColor, STATUS_TONE } from "../common/Badge";

const Chips = ({ id, label, options, value, onChange, tone }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <span className="text-xs font-semibold text-[#5B6578] sm:w-16 shrink-0">
      {label}
    </span>
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {["All", ...options].map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`relative rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B50FF] focus-visible:ring-offset-2 ${
              active
                ? "border-transparent"
                : "border-[#D5DAE3] bg-white hover:border-[#1C2541]"
            }`}
            style={{ color: active ? "#fff" : "#1C2541" }}
          >
            {active && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 bg-[#1C2541]"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {opt !== "All" && (
                <span
                  className="w-2 h-2 rounded-[2px]"
                  style={{ background: tone(opt) }}
                />
              )}
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A94A6]"
        />
        <input
          type="text"
          placeholder="Search questions by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-[#D5DAE3] bg-white py-2.5 pl-10 pr-10 text-sm text-[#1C2541] placeholder:text-[#8A94A6] focus:outline-none focus:border-[#2B50FF] focus:ring-2 focus:ring-[#2B50FF]/20 transition"
        />
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#5B6578] hover:bg-[#EEF1F6]"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Chips
        id="pill-category"
        label="Category"
        options={CATEGORIES}
        value={selectedCategory}
        onChange={setSelectedCategory}
        tone={categoryColor}
      />
      <Chips
        id="pill-status"
        label="Status"
        options={STATUSES}
        value={selectedStatus}
        onChange={setSelectedStatus}
        tone={(s) => STATUS_TONE[s]?.solid || "#64748B"}
      />
    </div>
  );
};

export default FilterBar;