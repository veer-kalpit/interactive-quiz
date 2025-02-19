import Quiz from "./components/Quiz";
import QuizHistory from "./components/QuizHistory";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Interactive Quiz Platform</h1>
      <Quiz />
      <QuizHistory />
    </div>
  );
}
