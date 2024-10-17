"use client";

import { redirectToNewQuestion } from "@/lib/actions";
import Button from "./Button";

export default function NextQuestionButton() {
  function handleClick() {
    redirectToNewQuestion();
  }

  return (
    <Button type="primary" size="lg" onClick={handleClick}>
      Nächste Frage
    </Button>
  );
}
