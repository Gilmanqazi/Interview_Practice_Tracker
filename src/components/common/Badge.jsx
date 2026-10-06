const Badge = ({ text }) => {
  const colorMap = {
    // Difficulty
    Easy: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    Hard: "bg-rose-100 text-rose-800 border-rose-200",

    // Status
    Pending: "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Completed: "bg-green-100 text-green-800 border-green-200",

    // Category
    DSA: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Git: "bg-orange-100 text-orange-800 border-orange-200",
    Technical: "bg-cyan-100 text-cyan-800 border-cyan-200",
  };

  const badgeStyle =
    colorMap[text] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}
    >
      {text}
    </span>
  );
};

export default Badge;
