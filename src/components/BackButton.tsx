"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button type="none" size="none" onClick={() => router.back()}>
      <ArrowLeftCircleIcon
        className={`text-primary-500 ${className} h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12`}
      />
    </Button>
  );
}
