import mysql from "mysql2/promise";
import {
  CELEBRITY_COLUMN_CREATED_AT,
  CELEBRITY_COLUMN_FIRST_NAME,
  CELEBRITY_COLUMN_GENDER,
  CELEBRITY_COLUMN_ID,
  CELEBRITY_COLUMN_LAST_NAME,
  CELEBRITY_COLUMN_UPDATED_AT,
  GUESS_COLUMN_CREATED_AT,
  GUESS_COLUMN_IP_ADDRESS,
  GUESS_COLUMN_IS_CORRECT,
  GUESS_COLUMN_QUESTION_ID,
  GUESS_COLUMN_UPDATED_AT,
  GUESS_COLUMN_USER_TOKEN,
  QUESTION_COLUMN_CELEBRITY_ID,
  QUESTION_COLUMN_CREATED_AT,
  QUESTION_COLUMN_FAKE_DATASET_ID,
  QUESTION_COLUMN_FAKE_VIDEO_ID,
  QUESTION_COLUMN_ID,
  QUESTION_COLUMN_REAL_DATASET_ID,
  QUESTION_COLUMN_REAL_VIDEO_ID,
  QUESTION_COLUMN_UPDATED_AT,
} from "./dbConfig";

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  timezone: "+00:00",
});

export default db;

type QueryResult<T> = [T[], mysql.FieldPacket[]];

export async function queryDatabase<T>(
  query: string,
  values: unknown[] = [],
): Promise<QueryResult<T>> {
  const connection = await db.getConnection();
  try {
    const [rows, fields] = await connection.query(query, values);
    return [rows as T[], fields];
  } finally {
    connection.destroy();
  }
}

export interface DatabaseQuestionTable {
  [QUESTION_COLUMN_ID]: string;
  [QUESTION_COLUMN_CREATED_AT]: Date;
  [QUESTION_COLUMN_UPDATED_AT]: Date;
  [QUESTION_COLUMN_CELEBRITY_ID]: string;
  [QUESTION_COLUMN_REAL_VIDEO_ID]: string;
  [QUESTION_COLUMN_FAKE_VIDEO_ID]: string;
  [QUESTION_COLUMN_REAL_DATASET_ID]: string;
  [QUESTION_COLUMN_FAKE_DATASET_ID]: string;
}

export interface DatabaseGuessTable {
  [GUESS_COLUMN_USER_TOKEN]: string;
  [GUESS_COLUMN_IP_ADDRESS]: string;
  [GUESS_COLUMN_CREATED_AT]: Date;
  [GUESS_COLUMN_UPDATED_AT]: Date;
  [GUESS_COLUMN_IS_CORRECT]: boolean;
  [GUESS_COLUMN_QUESTION_ID]: string;
}

export interface DatabaseCelebrityTable {
  [CELEBRITY_COLUMN_ID]: string;
  [CELEBRITY_COLUMN_CREATED_AT]: Date;
  [CELEBRITY_COLUMN_UPDATED_AT]: Date;
  [CELEBRITY_COLUMN_FIRST_NAME]: string;
  [CELEBRITY_COLUMN_LAST_NAME]: string;
  [CELEBRITY_COLUMN_GENDER]: "m" | "f";
}
