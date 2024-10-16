import { Bars3Icon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function OverviewButton() {
  return (
    <Button size="xs" type="secondary" href="/overview">
      <Bars3Icon height={40} width={40} className="text-primary-500" />
    </Button>
  );
}
