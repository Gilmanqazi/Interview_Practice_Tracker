
// eslint-disable-next-line react-refresh/only-export-components
export const STATUS_TONE = {
  Pending: { solid: "#5B6578", on: "#FFFFFF", bg: "#EAEDF3", text: "#3E4758", tick: "#CBD2DE" },
  "In Progress": { solid: "#F5B72E", on: "#3A2700", bg: "#FDF0CF", text: "#7A5200", tick: "#F5B72E" },
  Completed: { solid: "#168A5C", on: "#FFFFFF", bg: "#D8F2E5", text: "#0B5C3C", tick: "#1F9D6B" },
};

// eslint-disable-next-line react-refresh/only-export-components
export const CATEGORY_TONE = {
  DSA: "#2B50FF",
  Git: "#E2572B",
  Technical: "#0E9AA7",
  "Machine Coding": "#8A4FFF",
};

// eslint-disable-next-line react-refresh/only-export-components
export const categoryColor = (name) => CATEGORY_TONE[name] || "#64748B";

const DIFF_LEVEL = { Easy: 1, Medium: 2, Hard: 3 };
const DIFF_BAR = { Easy: "#1F9D6B", Medium: "#F0A500", Hard: "#E0434F" };
const DIFF_TEXT = { Easy: "#0B5C3C", Medium: "#7A5200", Hard: "#A3202B" };

const Badge = ({ text }) => {
  if (!text) return null;

 
  if (DIFF_LEVEL[text]) {
    return (
      <span
        className="inline-flex items-center gap-2 text-xs font-semibold"
        style={{ color: DIFF_TEXT[text] }}
      >
        <span className="flex items-end gap-[2px]" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className="w-[4px] rounded-sm"
              style={{
                height: 5 + n * 3,
                background: n <= DIFF_LEVEL[text] ? DIFF_BAR[text] : "#CBD2DE",
              }}
            />
          ))}
        </span>
        {text}
      </span>
    );
  }


  if (STATUS_TONE[text]) {
    const t = STATUS_TONE[text];
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
        style={{ background: t.bg, color: t.text }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.solid }} />
        {text}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#1C2541]">
      <span
        className="w-2.5 h-2.5 rounded-[3px]"
        style={{ background: categoryColor(text) }}
        aria-hidden="true"
      />
      {text}
    </span>
  );
};

export default Badge;