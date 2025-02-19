"use client";

import { useState, useEffect, useCallback } from "react";
import { saveQuizAttempt } from "../utils/quizStorage";

interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string | number;
}

const level1Questions: Question[] = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    id: 2,
    question: "Which data structure organizes items in a FIFO manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    id: 3,
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    id: 5,
    question:
      "Which of these processes is not typically involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    answer: "Filtration",
  },
];

const level2Questions: Question[] = [
  { id: 6, question: "What is the value of 12 + 28?", answer: 40 },
  {
    id: 7,
    question: "How many states are there in the United States?",
    answer: 50,
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    answer: 1776,
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    answer: 3,
  },
  {
    id: 10,
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: 120,
  },
];

export default function Quiz() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(
    null
  );
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const questions = level === 1 ? level1Questions : level2Questions;

  const handleNextQuestion = useCallback(() => {
    let updatedScore = score;

    if (
      selectedAnswer !== null &&
      selectedAnswer === questions[currentQuestion].answer
    ) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    setSelectedAnswer(null);
    setTimer(30);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (level === 1) {
        setLevel(2);
        setCurrentQuestion(0);
        setTimer(30);
      } else {
        handleSubmit(updatedScore);
      }
    }
  }, [currentQuestion, level, questions, score, selectedAnswer]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer, handleNextQuestion]);

  const handleAnswerSelection = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleIntegerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(parseInt(event.target.value, 10) || "");
  };

  const handleSubmit = async (finalScore: number) => {
    await saveQuizAttempt("Complete Quiz (Level 1 + 2)", finalScore);
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      {!submitted ? (
        <>
          <h2 className="text-xl font-bold">Quiz - Level {level}</h2>
          <p className="text-gray-700">Time Left: {timer}s</p>
          <p className="mt-2 font-semibold">
            {questions[currentQuestion].question}
          </p>

          {level === 1 ? (
            <div className="mt-2">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelection(option)}
                  className={`block w-full p-2 mt-2 border rounded ${
                    selectedAnswer === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="number"
              value={selectedAnswer ?? ""}
              onChange={handleIntegerInput}
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter your answer"
            />
          )}

          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
          >
            Next
          </button>
        </>
      ) : (
        <p className="text-green-500 font-bold mt-4">
          Quiz Completed! Score: {score} / 10
        </p>
      )}
    </div>
  );
}
