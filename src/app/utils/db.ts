import Dexie, { Table } from "dexie";

export interface QuizAttempt {
  id?: number;
  quizId: string;
  score: number;
  timestamp: string;
}

export class QuizDatabase extends Dexie {
  attempts!: Table<QuizAttempt, number>;

  constructor() {
    super("QuizDB");
    this.version(1).stores({
      attempts: "++id, quizId, score, timestamp",
    });
  }
}

export const db = new QuizDatabase();
