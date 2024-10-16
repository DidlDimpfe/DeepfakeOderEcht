import BackButton from "@/components/BackButton";
import CelebrityCard from "@/components/CelebrityCard";
import PageHeading from "@/components/PageHeading";
import { getCelebrities } from "@/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragen-Übersicht",
  description: "Übersicht über alle Fragen und wie sie beantwortet wurden.",
};

export default async function OverviewPage() {
  const celebrities = await getCelebrities();

  return (
    <main className="container relative mx-auto mb-4 px-4 pt-4">
      <div className="relative mb-4 flex items-center">
        <BackButton />

        <PageHeading className="absolute left-1/2 -translate-x-1/2 transform">
          <h2>Fragen-Übersicht</h2>
        </PageHeading>
      </div>

      <ul className="space-y-3">
        {celebrities.map((celebrity) => (
          <CelebrityCard key={celebrity.id} celebrity={celebrity} />
        ))}
      </ul>
    </main>
  );
}
