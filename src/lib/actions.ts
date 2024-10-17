"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getRandomQuestionId, insertGuess, isGuessCorrect } from "./queries";

export async function guess(questionId: string, guessedVideoId: string) {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) {
    throw new Error("User token not found");
  }

  const ip = headers().get("x-forwarded-for");

  if (!ip) {
    throw new Error("IP address not found");
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

  redirect("/" + (await getRandomQuestionId(userToken)));
}
