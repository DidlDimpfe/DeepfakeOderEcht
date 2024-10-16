import { FieldPacket } from "mysql2";
import {
  DatabaseCelebrityTable,
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

export async function getRandomQuestionId() {
  interface QueryResult {
    id: string;
  }
  // TODO: only not already answered questions
  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_ID} FROM ${QUESTION_TABLE_NAME} ORDER BY RAND() LIMIT 1`,
    );

    return result.id || null;
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
