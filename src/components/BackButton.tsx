import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function BackButton({ className }: { className?: string }) {
  return (
    <Button type="none" size="none" href="/">
      <ArrowLeftCircleIcon
        className={`text-primary-500 hover:text-primary-300 ${className} h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12`}
      />
    </Button>
  );
}
