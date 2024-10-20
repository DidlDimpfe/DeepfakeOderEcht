import {
  getAmountOfGuesses,
  getFailPercentage,
  getGuess,
  Question,
} from "@/lib/queries";

import {
  CheckCircleIcon,
  NoSymbolIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import CelebrityPicture from "./CelebrityPicture";

export default async function QuestionView({
  question,
}: {
  question: Question;
}) {
  // TODO responsive and additional info on bigger screens
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const guess = await getGuess(userToken, question.id);

  const failPercentage = await getFailPercentage(question.id);
  const failPercentageLabel =
    failPercentage !== null ? `${failPercentage.toFixed(1)}%` : "N/A";

  const amountOfGuesses = await getAmountOfGuesses(question.id);

  return (
    <li>
      <Link
        className="group relative flex flex-col gap-1 rounded-xl bg-primary-850 px-4 py-2 hover:bg-primary-825"
        href={`/${question.id}`}
      >
        <div className="flex items-center justify-between">
          <CelebrityPicture
            videoId={question.real_video_id}
            className="h-[68px] w-[120px]"
          />

          <div className="flex flex-grow items-center justify-around">
            <div className="hidden w-28 flex-col items-center justify-center gap-1 text-center lg:flex">
              <span className="text-md">Gesamtversuche:</span>
              <span className="text-2xl font-semibold">{amountOfGuesses}</span>
            </div>

            <div className="flex w-28 flex-col items-center justify-center gap-1">
              {guess === null && (
                <>
                  <NoSymbolIcon className="h-10 w-10 flex-grow text-gray-300" />
                  <span>Unbeantwortet</span>
                </>
              )}
              {guess?.is_correct === true && (
                <>
                  <CheckCircleIcon className="h-10 w-10 flex-grow text-green-500" />
                  <span>Richtig</span>
                </>
              )}
              {guess?.is_correct === false && (
                <>
                  <XCircleIcon className="h-10 w-10 flex-grow text-red-500" />
                  <span>Falsch</span>
                </>
              )}
            </div>

            <div className="hidden w-28 flex-col items-center justify-center gap-1 text-center sm:flex">
              <span className="text-md">Fehlerquote:</span>
              <span className="text-2xl font-semibold">
                {failPercentageLabel}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
