/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { headers } from "next/headers";

export async function addGuess(
  questionId: string,
  _guessedVideoId: string,
  serToken: string,
) {
  // TODO implement
  const ip = headers().get("x-forwarded-for");
}
