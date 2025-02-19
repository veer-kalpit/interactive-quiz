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
  const [answerStatus, setAnswerStatus] = useState<Record<number, string>>({});

  const questions = level === 1 ? level1Questions : level2Questions;

  const handleNextQuestion = useCallback(() => {
    let updatedScore = score;
    const isCorrect =
      selectedAnswer !== null &&
      selectedAnswer === questions[currentQuestion].answer;
    setAnswerStatus((prev) => ({
      ...prev,
      [currentQuestion]: isCorrect ? "correct" : "incorrect",
    }));

    if (isCorrect) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setTimer(30);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        if (level === 1) {
          setLevel(2);
          setCurrentQuestion(0);
          setTimer(30);
          setAnswerStatus({}); // Reset tile colors for level 2
        } else {
          handleSubmit(updatedScore);
        }
      }
    }, 1000);
  }, [currentQuestion, level, questions, score, selectedAnswer]);

  const handleSkipQuestion = () => {
    setAnswerStatus((prev) => ({ ...prev, [currentQuestion]: "skipped" }));
    setSelectedAnswer(null);
    setTimer(30);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (level === 1) {
        setLevel(2);
        setCurrentQuestion(0);
        setTimer(30);
        setAnswerStatus({});
      } else {
        handleSubmit(score);
      }
    }
  };

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
          <div className="flex justify-evenly mb-2">
            {[...Array(5)].map((_, index) => (

              <div
                key={index}
                className={`w-6 h-6 flex items-center flex-row justify-evenly text-white text-sm font-bold rounded-sm 
                  ${
                    index === currentQuestion
                      ? "bg-blue-500"
                      : answerStatus[index] === "correct"
                      ? "bg-green-500"
                      : answerStatus[index] === "incorrect"
                      ? "bg-red-500"
                      : index >= 5 && level === 2
                      ? "bg-white border border-gray-400"
                      : "bg-gray-300"
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mt-2">Quiz - Level {level}</h2>
          <p className="text-gray-700">Time Left: {timer}s</p>
          <p className="mt-2 font-semibold">
            {questions[currentQuestion].question}
          </p>

          {level === 1 ? (
            <div className="mt-2">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleAnswerSelection(option)}
                  className={`block w-full p-2 mt-2 border rounded 
                    ${
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

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={handleSkipQuestion}
              className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-red-500 font-medium text-neutral-200 border-2 border-red-300 transition-all duration-300 hover:w-32"
            >
              <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 text-white">
                Skip
              </div>
              <div className="absolute right-3.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-500 font-medium text-neutral-200 border-2 border-green-300 transition-all duration-300 hover:w-32"
            >
              <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 text-white">
                Next
              </div>
              <div className="absolute right-3.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </>
      ) : (
        <p className="text-green-500 font-bold mt-4">
          Quiz Completed! Score: {score} / 10
        </p>
      )}
    </div>
  );
}
