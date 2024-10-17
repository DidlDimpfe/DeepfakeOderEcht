import Button from "@/components/Button";
import { getRandomQuestionId } from "@/lib/queries";
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

  return (
    <main className="flex-1">
      <p>Alle Fragen wurden beantwortet!</p>

      <Button type="primary" size="lg" href="/overview">
        Fragenübersicht
      </Button>
    </main>
  );
}
