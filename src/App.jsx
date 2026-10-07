import { QuestionProvider } from "./context/QuestionContext";
import StatsOverview from "./components/dashboard/StatsOverview";
import QuestionForm from "./components/tracker/QuestionForm";
import QuestionList from "./components/tracker/QuestionList";

function App() {
  return (
    <QuestionProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center sm:text-left border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Interview Practice Tracker
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your DSA, Git, and Technical interview preparation and
              Machine Coding progress.
            </p>
          </header>

          <section>
            <StatsOverview />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Add New Question
            </h2>
            <QuestionForm />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Questions Tracker
            </h2>
            <QuestionList />
          </section>
        </div>
      </div>
    </QuestionProvider>
  );
}

export default App;
