import Dexie, { Table } from "dexie";

// Define QuizAttempt type
interface QuizAttempt {
  id?: number;
  quizName: string;
  score: number;
  timestamp: string;
}

// Extend Dexie database with quizAttempts table
class QuizDatabase extends Dexie {
  quizAttempts!: Table<QuizAttempt, number>;

  constructor() {
    super("QuizDatabase");
    this.version(1).stores({
      quizAttempts: "++id, quizName, score, timestamp",
    });
  }
}

// Create an instance of the database
export const db = new QuizDatabase();

// Function to save quiz attempt
export const saveQuizAttempt = async (quizName: string, score: number) => {
  await db.quizAttempts.add({
    quizName,
    score,
    timestamp: new Date().toISOString(),
  });
};

// Function to get quiz history
export const getQuizHistory = async (): Promise<QuizAttempt[]> => {
  return await db.quizAttempts.toArray();
};
