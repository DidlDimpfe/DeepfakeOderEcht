"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-3 pt-8 lg:pt-16 2xl:pt-32">
      <div className="mb-6 text-center">
        <Heading as="h1" size="lg" className="mb-2">
          Mist! Es gab einen Fehler!
        </Heading>
        <p className="text-lg">
          Leider ist etwas unerwartetes passiert: {error.message}
        </p>
      </div>
      <Button
        type="primary"
        size="lg"
        onClick={reset}
        className="mb-10 text-center"
      >
        Nochmal Versuchen
      </Button>
      <ExclamationTriangleIcon
        height={300}
        width={300}
        className="text-center text-red-500"
      />
    </main>
  );
}
