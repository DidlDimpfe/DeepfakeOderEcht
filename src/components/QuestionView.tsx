import { QuestionWithInfo } from "@/lib/queries";

import {
  CheckCircleIcon,
  NoSymbolIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import CelebrityPicture from "./CelebrityPicture";
import Heading from "./Heading";

export default async function QuestionView({
  questionWithInfo,
}: {
  questionWithInfo: QuestionWithInfo;
}) {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const {
    question_id,
    celebrity_first_name,
    celebrity_last_name,
    failPercentage,
    totalGuesses,
    real_video_id,
    userAnsweredCorrectly,
  } = questionWithInfo;

  const failPercentageLabel =
    failPercentage !== null ? `${failPercentage.toFixed(1)}%` : "N/A";

  return (
    <li>
      <div className="group relative flex cursor-pointer justify-between gap-1 rounded-t-xl bg-primary-875 px-4 py-2 hover:bg-primary-875">
        <Heading as="h3" size="sm">
          {celebrity_first_name} {celebrity_last_name}
        </Heading>
      </div>

      <Link
        className="group relative flex flex-col gap-1 rounded-b-xl bg-primary-850 px-4 py-2 hover:bg-primary-825"
        href={`/${question_id}`}
      >
        <div className="flex items-center justify-between">
          <CelebrityPicture
            videoId={real_video_id}
            className="h-[68px] w-[120px]"
          />

          <div className="flex flex-grow items-center justify-around">
            <div className="hidden w-28 flex-col items-center justify-center gap-1 text-center lg:flex">
              <span className="text-md">Gesamtversuche:</span>
              <span className="text-2xl font-semibold">{totalGuesses}</span>
            </div>

            <div className="flex w-28 flex-col items-center justify-center gap-1">
              {userAnsweredCorrectly === null && (
                <>
                  <NoSymbolIcon className="h-10 w-10 flex-grow text-gray-300" />
                  <span>Unbeantwortet</span>
                </>
              )}
              {userAnsweredCorrectly === true && (
                <>
                  <CheckCircleIcon className="h-10 w-10 flex-grow text-green-500" />
                  <span>Richtig</span>
                </>
              )}
              {userAnsweredCorrectly === false && (
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
