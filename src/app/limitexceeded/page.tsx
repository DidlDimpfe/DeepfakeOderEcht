import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export default function LimitExceededPage() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-3 pt-8 lg:pt-16 2xl:pt-32">
      <div className="mb-6 text-center">
        <Heading as="h1" size="lg" className="mb-2">
          Mist! Es gab einen Fehler!
        </Heading>
        <p className="text-lg">
          Du hast heute mit der gleichen IP Addresse diese Frage zu oft
          beantwortet. Versuche es morgen nochmal.
        </p>
      </div>
      <Button
        type="primary"
        size="lg"
        href="/overview"
        className="mb-10 text-center"
      >
        Fragenübersicht
      </Button>
      <ExclamationTriangleIcon
        height={300}
        width={300}
        className="text-center text-red-500"
      />
    </main>
  );
}
