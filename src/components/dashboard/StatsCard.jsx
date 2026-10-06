const StatsCard = ({ title, count, subTitle, bgColor = "bg-white" }) => {
  return (
    <div
      className={`p-4 rounded-xl border border-gray-200 shadow-sm ${bgColor}`}
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{count}</h3>
      {subTitle && <p className="text-xs text-gray-400 mt-1">{subTitle}</p>}
    </div>
  );
};

export default StatsCard;
