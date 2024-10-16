import { Celebrity, Question } from "@/lib/queries";

import Heading from "./Heading";
import QuestionView from "./QuestionView";

export default function CelebrityQuestionsView({
  celebrity,
  questions,
}: {
  celebrity: Celebrity;
  questions: Question[];
}) {
  return (
    <li className="rounded-xl bg-primary-850">
      <div className="hover:bg-primary-875 bg-primary-875 group relative flex cursor-pointer justify-between gap-1 rounded-t-xl px-4 py-2">
        <Heading as="h3" size="sm">
          {celebrity.first_name} {celebrity.last_name}
        </Heading>

        <span>{questions.length}</span>
      </div>

      <ul className="divide-primary-875 space-y-1 divide-y-2">
        {questions.map((question) => (
          <QuestionView question={question} key={question.id} />
        ))}
      </ul>
    </li>
  );
}
