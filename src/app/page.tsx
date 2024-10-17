import { getRandomQuestionId } from "@/lib/queries";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const cache = "no-store";
export const revalidate = 0;

export default async function Page() {
  revalidatePath("/");

  const userToken = cookies().get("userToken")?.value;

  if (!userToken) throw new Error("User token not found");

  const questionId = await getRandomQuestionId(userToken);

  if (questionId === null) return redirect("/allanswered");

  return redirect(`/${questionId}`);
}
