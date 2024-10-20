import Button from "@/components/Button";
import Divider from "@/components/Divider";
import PageHeading from "@/components/PageHeading";
import Video from "@/components/Video";
import {
  getCelebrity,
  getGuess,
  getQuestion,
  getQuestionIDs,
} from "@/lib/queries";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

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
    title: `Untersuchen: ${celebrity.first_name} ${celebrity.last_name}`,
    description: `Untersuche die Videos von ${celebrity.first_name} ${celebrity.last_name} und lerne, wie du die Unterschiede erkennen kannst.`,
  };
}

export async function generateStaticParams() {
  return await getQuestionIDs();
}

export default async function Page({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const [question, guess] = await Promise.all([
    getQuestion(questionId),
    getGuess(userToken, questionId),
  ]);

  if (!question) {
    notFound();
  }

  const celebrity = await getCelebrity(question.celebrity_id);

  if (!guess) {
    redirect("/" + questionId);
  }

  return (
    <main className="relative grid flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
      <div className="flex items-center justify-center">
        <Video
          videoId={question.real_video_id}
          className="mx-[4%] mt-12 cursor-default transition-transform duration-300 lg:mx-[8%] lg:my-0"
          label="Echt"
        />
      </div>

      <div className="relative flex items-center justify-center">
        <Video
          videoId={question.fake_video_id}
          className="mx-[4%] mb-12 cursor-default transition-transform duration-300 lg:mx-[8%] lg:my-0"
          label="Fake"
        />
      </div>

      <PageHeading className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6 lg:top-10">
        <h2>
          {celebrity.first_name} {celebrity.last_name}
        </h2>
      </PageHeading>

      <Button
        href={"/" + questionId}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 md:bottom-6 lg:bottom-10"
      >
        Zurück zur Frage
      </Button>

      <Divider wihtoutText />
    </main>
  );
}
