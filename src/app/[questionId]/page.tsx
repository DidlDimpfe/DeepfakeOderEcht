import Questions from "@/components/Questions";
import { getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";

// TODO generate static params

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
    <main className="relative grid flex-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
      <Questions
        firstVideoId={firstVideoId}
        secondVideoId={secondVideoId}
        questionId={question.id}
      />

      <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center md:left-1/2 md:top-0 md:h-full md:w-auto md:translate-x-1/2 md:translate-y-0">
        <div className="h-[1px] w-full bg-accent-300 md:h-full md:w-[1px]" />
        <span className="absolute rounded-full border border-accent-300 bg-primary-500 px-4 font-semibold">
          ODER
        </span>
      </div>

      {/* TODO responsive */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 cursor-default rounded-full border border-accent-300 bg-primary-500 px-3 py-1 text-center text-sm font-semibold uppercase">
        <span>
          Wähle {question.celebrity_gender === "f" ? "die" : "den"} echte
          {question.celebrity_gender === "f" ? "" : "n"}{" "}
          {question.celebrity_first_name} {question.celebrity_last_name}
        </span>
      </div>
    </main>
  );
}
