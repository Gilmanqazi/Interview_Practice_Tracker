import StatsCard from "./StatsCard";
import ProgressBar from "../common/ProgressBar";
import { useQuestion } from "../../context/QuestionContext";

const StatsOverview = () => {
  const { questions } = useQuestion();

  const totalQuestions = questions.length;
  const totalCompleted = questions.filter(
    (q) => q.status === "Completed"
  ).length;

  const completedDSA = questions.filter(
    (q) => q.category === "DSA" && q.status === "Completed"
  ).length;

  const completedGit = questions.filter(
    (q) => q.category === "Git" && q.status === "Completed"
  ).length;

  const completedTechnical = questions.filter(
    (q) => q.category === "Technical" && q.status === "Completed"
  ).length;

  const machineCodingCompleted = questions.filter(
    (q)=>q.category === "Machine Coding" && q.status === "Completed"
  ).length

  const progressPercentage =
    totalQuestions > 0
      ? Math.round((totalCompleted / totalQuestions) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Questions" count={totalQuestions} />
        <StatsCard title="DSA Completed" count={completedDSA} />
        <StatsCard title="Git Completed" count={completedGit} />
        <StatsCard title="Tech Completed" count={completedTechnical}/>
        <StatsCard title="Machine Coding" count={machineCodingCompleted}/>
      </div>

      <ProgressBar progress={progressPercentage} />
    </div>
  );
};

export default StatsOverview;
