import Divider from "@/components/Divider";
import HelpButton from "@/components/HelpButton";
import Questions from "@/components/Questions";
import ToDoLabel from "@/components/ToDoLabel";
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
    <main className="relative grid flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
      <Questions
        firstVideoId={firstVideoId}
        secondVideoId={secondVideoId}
        questionId={question.id}
      />

      <Divider />

      <ToDoLabel question={question} />

      <HelpButton />
    </main>
  );
}
