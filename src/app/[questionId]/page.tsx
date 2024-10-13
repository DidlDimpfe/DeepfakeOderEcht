import QuestionPick from "@/components/Questions";
import { getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestion(questionId);

  if (!question) {
    notFound();
  }

  const [firstVideoId, secondVideoId] =
    Math.random() < 0.5
      ? [question.real_video_id, question.fake_video_id]
      : [question.fake_video_id, question.real_video_id];

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
