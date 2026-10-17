import { motion } from "framer-motion";

const StatsCard = ({
  title,
  count,
  total,
  subTitle,
  color = "#2B50FF",
  bgColor = "bg-white",
}) => {
  const hasTotal = typeof total === "number";
  const pct = hasTotal && total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div
      className={`rounded-lg border border-[#D5DAE3] p-4 ${bgColor}`}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-[3px]"
          style={{ background: color }}
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-[#5B6578]">{title}</p>
      </div>

      <p className="font-display text-3xl font-extrabold text-[#1C2541] mt-2 tabular-nums">
        {count}
        {hasTotal && (
          <span className="text-base font-semibold text-[#8A94A6]"> / {total}</span>
        )}
      </p>

      {hasTotal && (
        <div className="mt-3 h-1.5 rounded-full bg-[#E6EAF1] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      )}

      {subTitle && <p className="text-xs text-[#8A94A6] mt-2">{subTitle}</p>}
    </div>
  );
};

export default StatsCard;