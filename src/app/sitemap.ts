import { getQuestionIDs } from "@/lib/queries";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const questionIds = await getQuestionIDs();

  const questionEntries: MetadataRoute.Sitemap = questionIds.map((entry) => ({
    url: `${process.env.BASE_URL}/${entry.questionId}`,
  }));

  const inspectQuestionEntries = questionIds.map((entry) => ({
    url: `${process.env.BASE_URL}/inspect/${entry.questionId}`,
  }));

  return [
    {
      url: `${process.env.BASE_URL}/`,
    },
    {
      url: `${process.env.BASE_URL}/allanswered`,
    },
    {
      url: `${process.env.BASE_URL}/help`,
    },
    {
      url: `${process.env.BASE_URL}/limitexceeded`,
    },
    {
      url: `${process.env.BASE_URL}/overview`,
    },
    ...questionEntries,
    ...inspectQuestionEntries,
  ];
}
