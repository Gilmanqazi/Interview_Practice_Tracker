import StatsCard from "./StatsCard";
import ProgressBar from "../common/ProgressBar";
import { categoryColor } from "../common/Badge";
import { useQuestion } from "../../context/QuestionContext";
import { CATEGORIES } from "../../utils/constants";

const StatsOverview = () => {
  const { questions = [] } = useQuestion();

  const totalQuestions = questions.length;
  const totalCompleted = questions.filter((q) => q.status === "Completed").length;

  const progressPercentage =
    totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  const perCategory = CATEGORIES.map((cat) => {
    const inCat = questions.filter((q) => q.category === cat);
    return {
      cat,
      done: inCat.filter((q) => q.status === "Completed").length,
      total: inCat.length,
    };
  });

  return (
    <section className="mb-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C2541]">
          Interview prep
        </h1>
        <p className="mt-1 text-[#5B6578]">
          {totalCompleted} of {totalQuestions} questions done
        </p>
      </div>

      <ProgressBar
        progress={progressPercentage}
        segments={questions.map((q) => q.status)}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        <StatsCard
          title="Overall"
          count={totalCompleted}
          total={totalQuestions}
          color="#1C2541"
        />
        {perCategory.map(({ cat, done, total }) => (
          <StatsCard
            key={cat}
            title={cat}
            count={done}
            total={total}
            color={categoryColor(cat)}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsOverview;