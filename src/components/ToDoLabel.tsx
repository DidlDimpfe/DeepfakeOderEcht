import { Question } from "@/lib/queries";
import PageHeading from "./PageHeading";

export default function ToDoLabel({ question }: { question: Question }) {
  return (
    <PageHeading className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6 lg:top-10">
      <h2>
        Wähle {question.celebrity_gender === "f" ? "die" : "den"} echte
        {question.celebrity_gender === "f" ? "" : "n"}{" "}
        {question.celebrity_first_name} {question.celebrity_last_name}
      </h2>
    </PageHeading>
  );
}
