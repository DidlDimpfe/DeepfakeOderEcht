import Button from "@/components/Button";
import Heading from "@/components/Heading";
import ReviewChart from "@/components/ReviewChart";
import { getFailPercentageFromUser, getRandomQuestionId } from "@/lib/queries";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Alle Fragen beantwortet",
  description: "Alle Fragen wurden beantwortet!",
};

export default async function AllAnsweredPage() {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const possibleQuestion = await getRandomQuestionId(userToken);

  if (possibleQuestion !== null) {
    return redirect(`/${possibleQuestion}`);
  }

  const failPercentage = await getFailPercentageFromUser(userToken);

  if (failPercentage === null) {
    throw new Error("User data not found");
  }

  const data = [
    {
      name: "Richtig",
      value: 100 - Number(failPercentage.toFixed(2)),
      color: "#84cc16",
    },
    {
      name: "Falsch",
      value: Number(failPercentage.toFixed(2)),
      color: "#dc2626",
    },
  ];

  return (
    <main className="container mx-auto flex-1 gap-4 pt-4 lg:pt-6">
      <Heading as="h2" className="text-center">
        Alle Fragen wurden beantwortet!
      </Heading>

      <Heading as="h3" className="mb-1 mt-8 text-center" size="sm">
        Deine Statistik
      </Heading>

      <div className="flex flex-col items-center gap-8">
        <ReviewChart data={data} />

        <Button type="primary" size="lg" href="/overview">
          Fragenübersicht
        </Button>
      </div>
    </main>
  );
}
