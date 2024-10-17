import { getGuess, Question } from "@/lib/queries";

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

          <div className="flex flex-grow flex-col items-center justify-center gap-1">
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
        </div>
      </Link>
    </li>
  );
}
