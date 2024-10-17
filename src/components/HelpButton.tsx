import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function HelpButton() {
  return (
    <Button
      size="xs"
      type="secondary"
      className="fixed bottom-2 right-2 z-[51]"
      href="/help"
    >
      <QuestionMarkCircleIcon
        height={50}
        width={50}
        className="text-primary-500"
      />
    </Button>
  );
}
