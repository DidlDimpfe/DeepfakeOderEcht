import BackButton from "@/components/BackButton";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import QuestionView from "@/components/QuestionView";
import Search from "@/components/Search";
import Sort from "@/components/Sort";
import {
  getQuestionsTotalPages,
  getQuestionsWithInfo,
  SortOptions,
} from "@/lib/queries";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Fragen-Übersicht",
  description: "Übersicht über alle Fragen und wie sie beantwortet wurden.",
};

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; sort?: SortOptions };
}) {
  const userToken = cookies().get("userToken")?.value;
  if (!userToken) throw new Error("User token not found");
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || "most-guessed";
  const [questionsWithInfo, totalPages] = await Promise.all([
    getQuestionsWithInfo(query, currentPage, sort, userToken),
    getQuestionsTotalPages(query),
  ]);

  return (
    <main className="container relative mx-auto mb-4 px-4 pt-4">
      <div className="relative mb-4 flex items-center">
        <BackButton />

        <PageHeading className="absolute left-1/2 -translate-x-1/2 transform">
          <h2>Fragen-Übersicht</h2>
        </PageHeading>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center gap-2 md:flex-row">
        <Search placeholder="Suche nach einer Person..." className="w-full" />

        <Sort
          options={[
            {
              value: "most-guessed",
              label: "Am häufigsten geraten",
            },
            {
              value: "highest-error-rate",
              label: "Höchste Fehlerquote",
            },
            {
              value: "last-name-asc",
              label: "A-Z (Nachname)",
            },
            {
              value: "last-name-desc",
              label: "Z-A (Nachname)",
            },
          ]}
        />
      </div>

      <ul className="mb-4 space-y-3">
        {questionsWithInfo.map((questionWithInfo) => (
          <QuestionView
            questionWithInfo={questionWithInfo}
            key={questionWithInfo.question_id}
          />
        ))}

        {questionsWithInfo.length === 0 && (
          <li className="text-center text-accent-500">
            Keine Fragen gefunden.
          </li>
        )}
      </ul>

      {totalPages > 0 && (
        <div className="flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
