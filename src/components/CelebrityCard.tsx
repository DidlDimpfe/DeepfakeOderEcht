import { Celebrity, getQuestions } from "@/lib/queries";

import CelebrityQuestionsView from "./CelebrityQuestionsView";

export default async function CelebrityCard({
  celebrity,
}: {
  celebrity: Celebrity;
}) {
  const questions = await getQuestions(celebrity.id);

  if (questions.length === 0) {
    return null;
  }

  return <CelebrityQuestionsView celebrity={celebrity} questions={questions} />;
}
