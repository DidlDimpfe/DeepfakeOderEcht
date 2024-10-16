import Divider from "@/components/Divider";
import HelpButton from "@/components/HelpButton";
import Questions from "@/components/Questions";
import ToDoLabel from "@/components/ToDoLabel";
import { getCelebrity, getQuestion } from "@/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { questionId },
}: {
  params: { questionId: string };
}): Promise<Metadata> {
  const question = await getQuestion(questionId);

  if (!question) {
    notFound();
  }

  const celebrity = await getCelebrity(question.celebrity_id);

  return {
    title: `${celebrity.first_name} ${celebrity.last_name}`,
  };
}

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

  const celebrity = await getCelebrity(question.celebrity_id);

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

      <ToDoLabel celebrity={celebrity} />

      <HelpButton />
    </main>
  );
}
