import { useContext } from "react";
import { useForm } from "react-hook-form";
import { QuestionContext } from "../../context/QuestionContext";

const QuestionForm = () => {
  const { addQuestion } = useContext(QuestionContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "DSA",
      difficulty: "Easy",
      status: "Pending",
    },
  });

  const submitHandle = (formData) => {
    addQuestion(formData);
    reset();
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <form
        onSubmit={handleSubmit(submitHandle)}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            {...register("title", {
              required: "Title is Required",
            })}
            type="text"
            placeholder="e.g. Binary Tree Inorder Traversal"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Validation Error Message */}
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            {...register("category")}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="DSA">DSA</option>
            <option value="Git">Git</option>
            <option value="Technical">Technical</option>
          </select>

          <select
            {...register("difficulty")}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            {...register("status")}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
