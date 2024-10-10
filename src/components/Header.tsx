import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-center border-b-[1px] border-b-accent-700 bg-primary-850 px-4">
      <Link
        className="flex cursor-pointer items-center justify-center gap-4 rounded"
        href="/"
      >
        <span
          className={`flex h-14 w-14 cursor-pointer items-center justify-center p-1 transition-transform duration-300 hover:scale-105`}
        >
          <Image src={logo} alt="Deepfake Oder Echt? Logo" />
        </span>
        <Heading as="h1" size="sm">
          Deepfake Oder Echt?
        </Heading>
      </Link>
    </header>
  );
}
