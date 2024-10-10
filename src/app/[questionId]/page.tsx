import QuestionPick from "@/components/Questions";
import { DatabaseQuestionTable } from "@/lib/db";

export default async function Page({ questionId }: { questionId: string }) {
  // TODO: Fetch question from database

  const question: DatabaseQuestionTable = {
    id: "aw9ußdhwqßadw",
    correct_video_id: "N3ZGNT5S5IU", // oEiV6MYzTCE
    false_video_id: "_oCS6j9VVBk",
    created_at: new Date(2024, 9, 9),
    updated_at: new Date(2024, 9, 9),
  };

  const randomBool = Math.random() < 0.5;
  const firstVideoId = randomBool
    ? question.correct_video_id
    : question.false_video_id;
  const secondVideoId = randomBool
    ? question.false_video_id
    : question.correct_video_id;

  return (
    <main className="relative grid flex-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-1">
      <QuestionPick firstVideoId={firstVideoId} secondVideoId={secondVideoId} />

      <div className="absolute top-1/2 flex w-full translate-y-1/2 items-center justify-center xl:left-1/2 xl:top-0 xl:h-full xl:w-auto xl:translate-x-1/2 xl:translate-y-0">
        <div className="h-[1px] w-full bg-accent-700 xl:h-full xl:w-[1px]" />
        <span className="absolute rounded-full border border-accent-700 bg-primary-500 px-4">
          ODER
        </span>
      </div>
    </main>
  );
}
