"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { MAXIMUM_GUESSES_PER_QUESTION_PER_IP_PER_DAY } from "./config";
import {
  getGuess,
  getRandomQuestionId,
  hasIPExceededLimit,
  insertGuess,
  isGuessCorrect,
} from "./queries";

export async function guess(questionId: string, guessedVideoId: string) {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) {
    throw new Error("User token not found");
  }

  const ip = headers().get("x-forwarded-for");

  if (!ip) {
    throw new Error("IP address not found");
  }

  // Not needed beacause userToken and questionId are primary keys (I will let it stay for now)
  if ((await getGuess(userToken, questionId)) !== null) {
    throw new Error("Question already answered");
  }

  if (
    await hasIPExceededLimit(
      ip,
      MAXIMUM_GUESSES_PER_QUESTION_PER_IP_PER_DAY,
      questionId,
    )
  ) {
    throw new Error(
      "IP address has exceeded the limit of guesses for today for this question",
    );
  }

  const isCorrect = await isGuessCorrect(questionId, guessedVideoId);

  await insertGuess(userToken, ip, isCorrect, questionId);

  revalidatePath("/" + questionId);
}

export async function redirectToNewQuestion() {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) {
    throw new Error("User token not found");
  }

  const questionId = await getRandomQuestionId(userToken);

  if (questionId === null) return redirect("/allanswered");

  return redirect(`/${questionId}`);
}
