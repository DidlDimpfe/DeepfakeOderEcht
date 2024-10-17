import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frage nicht gefunden",
  description: "Diese Frage konnte nicht gefunden werden",
};

export default function NotFound() {
  return (
    <main className="mt-24 flex flex-1 flex-col items-center gap-12">
      <FaceFrownIcon className="h-48 w-48 text-primary-100 lg:h-64 lg:w-64" />
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <Heading as="h1" size="md">
          Diese Frage konnte nicht gefunden werden
        </Heading>
        <Button type="primary" size="lg" href="/">
          Andere Frage
        </Button>
      </div>
    </main>
  );
}
