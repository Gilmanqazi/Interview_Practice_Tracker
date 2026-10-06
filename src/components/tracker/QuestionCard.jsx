import { useQuestion } from "../../context/QuestionContext";
import Badge from "../common/Badge";
import { STATUSES } from "../../utils/constants";

const QuestionCard = ({ question }) => {
  const { updateStatus, deleteQuestions } = useQuestion();

  const handleStatusChange = (e) => {
    updateStatus(question.id, e.target.value);
  };

  if (!question) return;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-gray-800">
          {question?.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <Badge text={question?.category} />
          <Badge text={question?.difficulty} />
          <Badge text={question?.status} />
        </div>
      </div>

      {/* Right Section: Status Dropdown & Delete Action */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        <select
          value={question?.status}
          onChange={handleStatusChange}
          className="text-xs font-medium p-1.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={() => deleteQuestions(question?.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          title="Delete Question"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
