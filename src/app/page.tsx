import Redirecter from "@/components/Redirecter";
import { getRandomQuestionId } from "@/lib/queries";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page() {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const questionId = await getRandomQuestionId(userToken);

  return (
    <main className="flex-1">
      <Redirecter to={questionId} />
    </main>
  );
}
