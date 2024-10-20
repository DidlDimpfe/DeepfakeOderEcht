import BackButton from "@/components/BackButton";
import CelebrityCard from "@/components/CelebrityCard";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { getCelebrities, getCelebritiesTotalPages } from "@/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragen-Übersicht",
  description: "Übersicht über alle Fragen und wie sie beantwortet wurden.",
};

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const [celebrities, totalPages] = await Promise.all([
    getCelebrities(query, currentPage),
    getCelebritiesTotalPages(query),
  ]);

  return (
    <main className="container relative mx-auto mb-4 px-4 pt-4">
      <div className="relative mb-4 flex items-center">
        <BackButton />

        <PageHeading className="absolute left-1/2 -translate-x-1/2 transform">
          <h2>Fragen-Übersicht</h2>
        </PageHeading>
      </div>

      <Search placeholder="Suche nach einer Person..." className="mb-4" />

      <ul className="mb-4 space-y-3">
        {celebrities.map((celebrity) => (
          <CelebrityCard key={celebrity.id} celebrity={celebrity} />
        ))}

        {totalPages === 0 && (
          <li className="text-center text-accent-500">
            Keine Personen gefunden.
          </li>
        )}
      </ul>

      {totalPages > 0 && (
        <div className="flex justify-end">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
