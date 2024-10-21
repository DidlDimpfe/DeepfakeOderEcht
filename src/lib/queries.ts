import { FieldPacket } from "mysql2";
import { RESULTS_PER_PAGE_OVERVIEW } from "./config";
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

export async function getQuestionsTotalPages(query: string = "") {
  const queryParts = query.split(" ");
  if (queryParts.length > 2) return 0;

  const firstName = queryParts[0] ?? "";
  const lastName = queryParts[1] ?? "";
  const resultsPerPage = RESULTS_PER_PAGE_OVERVIEW;

  const hasMultipleNames = lastName !== "";

  try {
    const [totalResult]: [{ total: number }[], FieldPacket[]] =
      await queryDatabase(
        `SELECT COUNT(*) as total 
       FROM ${QUESTION_TABLE_NAME} q
       JOIN ${CELEBRITY_TABLE_NAME} c 
          ON q.${QUESTION_COLUMN_CELEBRITY_ID} = c.${CELEBRITY_COLUMN_ID} 
       WHERE ${CELEBRITY_COLUMN_FIRST_NAME} LIKE ? ${hasMultipleNames ? "AND" : "OR"} ${CELEBRITY_COLUMN_LAST_NAME} LIKE ?`,
        [`%${firstName}%`, `%${hasMultipleNames ? lastName : firstName}%`],
      );

    const totalResults = totalResult[0].total;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    return totalPages;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch celebrities: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch celebrities: ${String(error)}`);
    }
  }
}

export type SortOptions =
  | "most-guessed"
  | "highest-error-rate"
  | "last-name-asc"
  | "last-name-desc";

export interface QuestionWithInfo {
  celebrity_first_name: string;
  celebrity_last_name: string;
  question_id: string;
  totalGuesses: number;
  failPercentage: number | null;
  real_video_id: string;
  userAnsweredCorrectly: boolean | null;
}

export async function getQuestionsWithInfo(
  query: string = "",
  page: number = 1,
  sort: SortOptions = "most-guessed",
  userToken: string,
) {
  const queryParts = query.split(" ");
  if (queryParts.length > 2) return [];

  const resultsPerPage = RESULTS_PER_PAGE_OVERVIEW;
  const offset = (page - 1) * resultsPerPage;

  const firstName = queryParts[0] ?? "";
  const lastName = queryParts[1] ?? "";

  const hasMultipleNames = lastName !== "";

  let orderByClause: string;

  switch (sort) {
    case "most-guessed":
      orderByClause = `totalGuesses DESC, ${CELEBRITY_COLUMN_LAST_NAME} ASC`;
      break;
    case "last-name-asc":
      orderByClause = `${CELEBRITY_COLUMN_LAST_NAME} ASC`;
      break;
    case "last-name-desc":
      orderByClause = `${CELEBRITY_COLUMN_LAST_NAME} DESC`;
      break;
    case "highest-error-rate":
      orderByClause = `failPercentage DESC, ${CELEBRITY_COLUMN_LAST_NAME} ASC`;
      break;
    default:
      orderByClause = "totalGuesses DESC, ${CELEBRITY_COLUMN_LAST_NAME} ASC";
  }

  try {
    const [questionsWithInfo]: [QuestionWithInfo[], FieldPacket[]] =
      await queryDatabase(
        `SELECT 
        c.${CELEBRITY_COLUMN_FIRST_NAME} AS celebrity_first_name, 
        c.${CELEBRITY_COLUMN_LAST_NAME} AS celebrity_last_name, 
        q.${QUESTION_COLUMN_ID} AS question_id,
        q.${QUESTION_COLUMN_REAL_VIDEO_ID} AS real_video_id,
        COUNT(g.${GUESS_COLUMN_QUESTION_ID}) AS totalGuesses, 
          CASE 
            WHEN COUNT(g.${GUESS_COLUMN_QUESTION_ID}) = 0 THEN NULL 
            ELSE (SUM(CASE WHEN g.${GUESS_COLUMN_IS_CORRECT} = 0 THEN 1 ELSE 0 END) / COUNT(g.${GUESS_COLUMN_QUESTION_ID})) * 100 
          END AS failPercentage,
        (SELECT g2.is_correct 
        FROM guess g2 
          WHERE g2.question_id = q.id 
          AND g2.user_token = ?
        LIMIT 1) AS userAnsweredCorrectly
        FROM ${QUESTION_TABLE_NAME} q
      JOIN ${CELEBRITY_TABLE_NAME} c 
        ON q.${QUESTION_COLUMN_CELEBRITY_ID} = c.${CELEBRITY_COLUMN_ID}
      LEFT JOIN ${GUESS_TABLE_NAME} g 
        ON q.${QUESTION_COLUMN_ID} = g.${GUESS_COLUMN_QUESTION_ID}
      GROUP BY 
        c.${CELEBRITY_COLUMN_ID}, 
        q.${QUESTION_COLUMN_ID}
      HAVING ${CELEBRITY_COLUMN_FIRST_NAME} LIKE ? ${hasMultipleNames ? "AND" : "OR"} ${CELEBRITY_COLUMN_LAST_NAME} LIKE ?
      ORDER BY ${orderByClause}
      LIMIT ? OFFSET ?`,
        [
          userToken,
          `%${firstName}%`,
          `%${hasMultipleNames ? lastName : firstName}%`,
          resultsPerPage,
          offset,
        ],
      );

    const modifiedQuestionsWithInfo = questionsWithInfo.map((question) => {
      return {
        ...question,
        failPercentage: question.failPercentage
          ? Number(question.failPercentage)
          : null,
        userAnsweredCorrectly:
          question.userAnsweredCorrectly === null
            ? null
            : Boolean(question.userAnsweredCorrectly),
      };
    });

    return modifiedQuestionsWithInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch celebrities: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch celebrities: ${String(error)}`);
    }
  }
}

export async function getQuestionIDs() {
  try {
    interface QueryResult {
      questionId: string;
    }

    const [ids]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT ${QUESTION_COLUMN_ID} as questionId FROM ${QUESTION_TABLE_NAME}`,
    );

    return ids;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new QueryError(`Failed to fetch question ids: ${error.message}`);
    } else {
      throw new QueryError(`Failed to fetch question ids: ${String(error)}`);
    }
  }
}

export async function getQuestionsByCelebrity(celebrityId: string) {
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

export async function getFailPercentageFromQuestion(questionId: string) {
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

export async function getFailPercentageFromUser(userToken: string) {
  interface QueryResult {
    failPercentage: number;
  }

  try {
    const [[result]]: [QueryResult[], FieldPacket[]] = await queryDatabase(
      `SELECT (SUM(CASE WHEN ${GUESS_COLUMN_IS_CORRECT} = 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS failPercentage FROM ${GUESS_TABLE_NAME} WHERE ${GUESS_COLUMN_USER_TOKEN} = ?`,
      [userToken],
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
