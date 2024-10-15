import { FieldPacket } from "mysql2";
import { DatabaseQuestionTable, queryDatabase } from "./db";
import {
  QUESTION_COLUMN_CELEBRITY_FIRST_NAME,
  QUESTION_COLUMN_CELEBRITY_GENDER,
  QUESTION_COLUMN_CELEBRITY_LAST_NAME,
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
  extends Omit<DatabaseQuestionTable, "fake_dataset_id" | "real_dataset_id"> {}

export async function getQuestion(questionId: string) {
  try {
    const [[question]]: [Question[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_ID}, ${QUESTION_COLUMN_CREATED_AT}, ${QUESTION_COLUMN_UPDATED_AT}, ${QUESTION_COLUMN_REAL_VIDEO_ID}, ${QUESTION_COLUMN_FAKE_VIDEO_ID}, ${QUESTION_COLUMN_CELEBRITY_FIRST_NAME}, ${QUESTION_COLUMN_CELEBRITY_LAST_NAME}, ${QUESTION_COLUMN_CELEBRITY_GENDER} FROM ${QUESTION_TABLE_NAME} WHERE ${QUESTION_COLUMN_ID} = ?`,
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
