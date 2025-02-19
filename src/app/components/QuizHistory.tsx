"use client";

import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/quizStorage";

export default function History() {
  const [history, setHistory] = useState<
    { quizName: string; score: number; timestamp: string }[]
  >([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getQuizHistory();
      setHistory(data.reverse());
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Quiz History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((attempt, index) => (
            <li key={index} className="border-b py-2">
              <strong>{attempt.quizName}</strong> - Score: {attempt.score} / 10
              <br />
              <span className="text-gray-600 text-sm">
                {new Date(attempt.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quiz attempts yet.</p>
      )}
    </div>
  );
}
