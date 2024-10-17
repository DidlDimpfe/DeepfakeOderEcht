import Logo from "./Logo";
import OverviewButton from "./OverviewButton";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b-[1px] border-b-accent-700 bg-primary-850 px-4">
      <Logo />
      <OverviewButton />
    </header>
  );
}
