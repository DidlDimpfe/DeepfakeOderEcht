"use server";

import { headers } from "next/headers";
import { isGuessCorrect } from "./queries";

export async function addGuess(
  questionId: string,
  guessedVideoId: string,
  userToken: string,
) {
  // TODO implement
  const ip = headers().get("x-forwarded-for");
  console.log(ip);

  console.log(await isGuessCorrect(questionId, guessedVideoId));
}
