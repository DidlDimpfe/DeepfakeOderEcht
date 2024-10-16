import { Celebrity, Question } from "@/lib/queries";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CelebrityPicture from "./CelebrityPicture";

export default function QuestionView({
  question,
  celebrity,
}: {
  question: Question;
  celebrity: Celebrity;
}) {
  // TODO responsive and additional info on bigger screens

  return (
    <li>
      <Link
        className="group relative flex flex-col gap-1 rounded-xl bg-primary-850 px-4 py-2 hover:bg-primary-825"
        href={`/${question.id}`}
      >
        <div className="flex items-center justify-between">
          <CelebrityPicture videoId={question.real_video_id} />

          <div className="flex flex-grow flex-col items-center justify-center gap-1">
            <NoSymbolIcon className="h-10 w-10 flex-grow text-gray-300" />
            <span>Unbeantwortet</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
