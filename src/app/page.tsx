import { getRandomQuestionId } from "@/lib/queries";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const questionId = await getRandomQuestionId();
  return redirect(`/${questionId}`);
}
