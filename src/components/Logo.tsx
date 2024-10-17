"use client";

import logo from "@/../public/logo.png";
import { redirectToNewQuestion } from "@/lib/actions";
import Image from "next/image";
import Heading from "./Heading";

export default function Logo() {
  function handleClick() {
    redirectToNewQuestion();
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-2 rounded"
      onClick={handleClick}
    >
      <span
        className={`flex h-14 w-14 cursor-pointer items-center justify-center p-1 transition-transform duration-300 hover:scale-105`}
      >
        <Image src={logo} alt="Deepfake Oder Echt? Logo" />
      </span>
      <Heading as="h1" size="sm">
        Deepfake Oder Echt?
      </Heading>
    </div>
  );
}
