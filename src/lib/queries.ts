import { FieldPacket } from "mysql2";
import {
  DatabaseCelebrityTable,
  DatabaseGuessTable,
  DatabaseQuestionTable,
  queryDatabase,
} from "./db";
import {
  CELEBRITY_COLUMN_CREATED_AT,
  CELEBRITY_COLUMN_FIRST_NAME,
  CELEBRITY_COLUMN_GENDER,
  CELEBRITY_COLUMN_ID,
  CELEBRITY_COLUMN_LAST_NAME,
  CELEBRITY_COLUMN_UPDATED_AT,
  CELEBRITY_TABLE_NAME,
  GUESS_COLUMN_CREATED_AT,
  GUESS_COLUMN_IS_CORRECT,
  GUESS_COLUMN_QUESTION_ID,
  GUESS_COLUMN_UPDATED_AT,
  GUESS_COLUMN_USER_TOKEN,
  GUESS_TABLE_NAME,
  QUESTION_COLUMN_CELEBRITY_ID,
  QUESTION_COLUMN_CREATED_AT,
  QUESTION_COLUMN_FAKE_VIDEO_ID,
  QUESTION_COLUMN_ID,
  QUESTION_COLUMN_REAL_VIDEO_ID,
  QUESTION_COLUMN_UPDATED_AT,
  QUESTION_TABLE_NAME,
} from "./dbConfig";

class QueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QueryError";
  }
}

export async function getRandomQuestionId(userToken: string) {
  interface QueryResult {
    id: string;
  }

  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT q.${QUESTION_COLUMN_ID} FROM ${QUESTION_TABLE_NAME} q LEFT JOIN ${GUESS_TABLE_NAME} g ON q.${QUESTION_COLUMN_ID} = g.${GUESS_COLUMN_QUESTION_ID} AND g.${GUESS_COLUMN_USER_TOKEN} = ? WHERE g.${GUESS_COLUMN_QUESTION_ID} IS NULL ORDER BY RAND() LIMIT 1`,
      [userToken],
    );

    return result?.id || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(
        `Failed to fetch random question id: ${error.message}`,
      );
    } else {
      throw new QueryError(
        `Failed to fetch random question id: ${String(error)}`,
      );
    }
  }
}

export async function getFailPercentage(questionId: string) {
  interface QueryResult {
    failPercentage: number;
  }

  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT (SUM(CASE WHEN ${GUESS_COLUMN_IS_CORRECT} = 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS failPercentage FROM ${GUESS_TABLE_NAME} WHERE ${GUESS_COLUMN_QUESTION_ID} = ?`,
      [questionId],
    );

    return result?.failPercentage ? Number(result?.failPercentage) : null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch fail percentage: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch fail percentage: ${String(error)}`);
    }
  }
}

export interface Question
  extends Omit<DatabaseQuestionTable, "real_dataset_id" | "fake_dataset_id"> {}

export async function getQuestion(questionId: string) {
  try {
    const [[question]]: [Question[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_ID}, ${QUESTION_COLUMN_CREATED_AT}, ${QUESTION_COLUMN_UPDATED_AT}, ${QUESTION_COLUMN_REAL_VIDEO_ID}, ${QUESTION_COLUMN_FAKE_VIDEO_ID}, ${QUESTION_COLUMN_CELEBRITY_ID} FROM ${QUESTION_TABLE_NAME}  WHERE ${QUESTION_COLUMN_ID} = ?`,
      [questionId],
    );

    return question || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch question: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch question: ${String(error)}`);
    }
  }
}

export async function isGuessCorrect(
  questionId: string,
  guessedVideoId: string,
) {
  interface QueryResult {
    real_video_id: string;
  }

  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_REAL_VIDEO_ID} FROM ${QUESTION_TABLE_NAME} WHERE ${QUESTION_COLUMN_ID} = ?`,
      [questionId],
    );

    return result.real_video_id === guessedVideoId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to check guess: ${error.message}`);
    } else {
      throw new QueryError(`Failed to check guess: ${String(error)}`);
    }
  }
}

export interface Celebrity extends DatabaseCelebrityTable {}

export async function getCelebrity(celebrityId: string) {
  try {
    const [[celebrity]]: [Celebrity[], FieldPacket[]] = await queryDatabase(
      `SELECT ${CELEBRITY_COLUMN_ID}, ${CELEBRITY_COLUMN_CREATED_AT}, ${CELEBRITY_COLUMN_UPDATED_AT}, ${CELEBRITY_COLUMN_FIRST_NAME}, ${CELEBRITY_COLUMN_LAST_NAME}, ${CELEBRITY_COLUMN_GENDER} FROM ${CELEBRITY_TABLE_NAME}  WHERE ${CELEBRITY_COLUMN_ID} = ?`,
      [celebrityId],
    );

    return celebrity || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch celebrity: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch celebrity: ${String(error)}`);
    }
  }
}

export async function getCelebrities() {
  try {
    const [result]: [Celebrity[], FieldPacket[]] = await queryDatabase(
      `SELECT ${CELEBRITY_COLUMN_ID}, ${CELEBRITY_COLUMN_GENDER}, ${CELEBRITY_COLUMN_FIRST_NAME}, ${CELEBRITY_COLUMN_LAST_NAME} FROM ${CELEBRITY_TABLE_NAME} ORDER BY ${CELEBRITY_COLUMN_LAST_NAME} ASC`,
    );
    0;
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch celebrities: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch celebrities: ${String(error)}`);
    }
  }
}

export async function getQuestions(celebrityId: string) {
  try {
    const [questions]: [Question[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_ID}, ${QUESTION_COLUMN_CREATED_AT}, ${QUESTION_COLUMN_UPDATED_AT}, ${QUESTION_COLUMN_REAL_VIDEO_ID}, ${QUESTION_COLUMN_FAKE_VIDEO_ID}, ${QUESTION_COLUMN_CELEBRITY_ID} FROM ${QUESTION_TABLE_NAME} WHERE ${QUESTION_COLUMN_CELEBRITY_ID} = ? ORDER BY ${QUESTION_COLUMN_UPDATED_AT} DESC`,
      [celebrityId],
    );

    return questions;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch questions: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch questions: ${String(error)}`);
    }
  }
}

export async function insertGuess(
  userToken: string,
  ipAddress: string,
  isCorrect: boolean,
  questionId: string,
) {
  try {
    await queryDatabase(
      `INSERT INTO guess (user_token, ip_address, is_correct, question_id) VALUES (?, ?, ?, ?)`,
      [userToken, ipAddress, isCorrect, questionId],
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to insert guess: ${error.message}`);
    } else {
      throw new QueryError(`Failed to insert guess: ${String(error)}`);
    }
  }
}

export interface Guess
  extends Omit<DatabaseGuessTable, "ip_address" | "question_id"> {}

export async function getGuess(userToken: string, questionId: string) {
  try {
    const [[guess]]: [Guess[], FieldPacket[]] = await queryDatabase(
      `SELECT ${GUESS_COLUMN_USER_TOKEN}, ${GUESS_COLUMN_CREATED_AT}, ${GUESS_COLUMN_UPDATED_AT}, ${GUESS_COLUMN_IS_CORRECT}  FROM ${GUESS_TABLE_NAME} WHERE ${GUESS_COLUMN_USER_TOKEN} = ? AND ${GUESS_COLUMN_QUESTION_ID} = ?`,
      [userToken, questionId],
    );

    if (guess) {
      guess.is_correct = Boolean(guess.is_correct);
    }

    return guess || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(
        `Failed to check if question was already answered: ${error.message}`,
      );
    } else {
      throw new QueryError(
        `Failed to check if question was already answered: ${String(error)}`,
      );
    }
  }
}

export async function hasIPExceededLimit(
  ipAddress: string,
  limit: number,
  questionId: string,
) {
  interface QueryResult {
    hasExceededLimit: boolean;
  }

  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT CASE WHEN COUNT(*) >= ? THEN 1 ELSE 0 END AS hasExceededLimit FROM ${GUESS_TABLE_NAME} WHERE ip_address = ? AND question_id = ? AND created_at >= NOW() - INTERVAL 1 DAY`,
      [limit, ipAddress, questionId],
    );

    return Boolean(result.hasExceededLimit);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(
        `Failed to check if IP has exceeded limit: ${error.message}`,
      );
    } else {
      throw new QueryError(
        `Failed to check if IP has exceeded limit: ${String(error)}`,
      );
    }
  }
}
