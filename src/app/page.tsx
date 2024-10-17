import { getRandomQuestionId } from "@/lib/queries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const questionId = await getRandomQuestionId(userToken);

  if (questionId === null) return redirect("/allanswered");

  return redirect(`/${questionId}`);
}
