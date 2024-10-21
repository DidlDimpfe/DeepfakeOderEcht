import Button from "@/components/Button";
import CelebrityPicture from "@/components/CelebrityPicture";
import Divider from "@/components/Divider";
import HelpButton from "@/components/HelpButton";
import NextQuestionButton from "@/components/NextQuestionButton";
import PageHeading from "@/components/PageHeading";
import Questions from "@/components/Questions";
import {
  getCelebrity,
  getFailPercentageFromQuestion,
  getGuess,
  getQuestion,
  getQuestionIDs,
} from "@/lib/queries";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { cookies } from "next/headers";
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
    description: `Kannst du ${celebrity.gender === "f" ? "die" : "den"} echte${celebrity.gender === "f" ? "" : "n"} ${celebrity.first_name} ${celebrity.last_name} erkennen?`,
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

  if (guess) {
    const failPercentage = await getFailPercentageFromQuestion(questionId);
    const failPercentageLabel =
      failPercentage !== null ? `${failPercentage.toFixed(1)}%` : "N/A";

    return (
      <main className="container relative mx-auto mb-4 px-4 pt-4">
        <div className="mb-8 flex flex-col items-center justify-center">
          {guess.is_correct ? (
            <CheckCircleIcon className="h-44 w-44 text-green-500" />
          ) : (
            <XCircleIcon className="h-44 w-44 text-red-500" />
          )}

          <span className={`text-lg font-semibold uppercase`}>
            {guess.is_correct ? "Richtig" : "Falsch"}
          </span>
        </div>
        <div className="mb-12 flex flex-col items-center justify-center gap-2">
          <CelebrityPicture
            className="h-[123px] w-[220px]"
            videoId={question.real_video_id}
          />
          <div className="flex flex-col items-center justify-center">
            <span className="text-md">Fehlerquote:</span>
            <span className="text-2xl font-semibold">
              {failPercentageLabel}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
          <Button type="secondary" size="lg" href={`/inspect/${questionId}`}>
            Untersuchen
          </Button>
          <NextQuestionButton />
        </div>
      </main>
    );
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

      <PageHeading className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6 lg:top-10">
        <h2>
          Wähle {celebrity.gender === "f" ? "die" : "den"} echte
          {celebrity.gender === "f" ? "" : "n"} {celebrity.first_name}{" "}
          {celebrity.last_name}
        </h2>
      </PageHeading>

      <HelpButton />
    </main>
  );
}
