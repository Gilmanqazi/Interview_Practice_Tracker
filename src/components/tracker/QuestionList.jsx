import { useState } from "react";
import { useQuestion } from "../../context/QuestionContext";
import QuestionCard from "./QuestionCard";
import FilterBar from "./FilterBar";

const QuestionList = () => {
  const { questions } = useQuestion();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      !searchTerm.trim() ||
      question?.title?.toLowerCase().includes(searchTerm.toLowerCase().trim());

    const matchesCategory =
      selectedCategory === "All" ||
      question.category?.trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase();

    const matchesStatus =
      selectedStatus === "All" ||
      question.status?.trim().toLowerCase() ===
        selectedStatus.trim().toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (!questions || questions?.length === 0) {
    return (
      <div className="text-center py-10 bg-white border border-dashed border-gray-300 rounded-xl">
        <p className="text-gray-500 font-medium">No questions added yet.</p>
        <p className="text-gray-400 text-sm mt-1">
          Use the form above to track your interview practice!
        </p>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {filteredQuestions?.length > 0 ? (
        <div className="space-y-3">
          {filteredQuestions?.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 font-medium">
            No matching questions found.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try clearing or adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
