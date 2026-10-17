import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { STATUS_TONE } from "./Badge";

const ORDER = { Completed: 0, "In Progress": 1, Pending: 2 };

/**
 * progress  : 0-100
 * segments  : array of statuses, one per question (optional)
 *             each question becomes one tick in the strip
 */
const ProgressBar = ({ progress = 0, segments = [] }) => {
  const clamp = Math.min(Math.max(progress, 0), 100);

  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(value, clamp, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [clamp, value]);

  const sorted = [...segments].sort(
    (a, b) => (ORDER[a] ?? 3) - (ORDER[b] ?? 3)
  );

  const count = (s) => segments.filter((x) => x === s).length;

  return (
    <div className="w-full">
      <div className="flex items-end gap-4">
        <div className="font-display font-extrabold leading-none text-[#1C2541] text-6xl sm:text-7xl tabular-nums">
          <motion.span>{rounded}</motion.span>
          <span className="text-3xl sm:text-4xl text-[#8A94A6]">%</span>
        </div>

        <div className="flex-1 min-w-0 pb-1">
          <div
            className="flex items-end gap-[3px] h-12 "
            role="progressbar"
            aria-valuenow={clamp}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Completion progress"
          >
            {sorted.map((status, i) => (
              <motion.span
                key={i}
                className="flex-1 max-w-[22px] h-full rounded-t-[3px] origin-bottom"
                initial={{ scaleY: 0, backgroundColor: "#CBD2DE" }}
                animate={{
                  scaleY: 1,
                  backgroundColor: STATUS_TONE[status]?.tick || "#CBD2DE",
                }}
                transition={{
                  scaleY: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: Math.min(i * 0.03, 1),
                  },
                  backgroundColor: { duration: 0.3 },
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {segments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#5B6578]">
          {["Completed", "In Progress", "Pending"].map((s) => (
            <span key={s} className="inline-flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-[3px]"
                style={{ background: STATUS_TONE[s].tick }}
              />
              {s}
              <span className="font-semibold text-[#1C2541]">{count(s)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;