const ProgressBar = ({ progress = 0 }) => {
  const clampProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm font-medium">
        <span>Completion Progress</span>
        <span>{clampProgress}%</span>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${clampProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
