"use client";

import { addGuess } from "@/lib/actions";
import Video from "./Video";

interface QuestionPickProps {
  firstVideoId: string;
  secondVideoId: string;
  questionId: string;
}

export default function QuestionPick({
  firstVideoId,
  secondVideoId,
  questionId,
}: QuestionPickProps) {
  function handleClick(videoId: string) {
    addGuess(questionId, videoId, "temp");
  }

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={() => handleClick(firstVideoId)}
      >
        <Video
          videoId={firstVideoId}
          className="mx-[4%] mt-12 md:mx-[8%] md:my-0"
        />
      </div>

      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={() => handleClick(secondVideoId)}
      >
        <Video
          videoId={secondVideoId}
          className="mx-[4%] mb-12 md:mx-[8%] md:my-0"
        />
      </div>
    </>
  );
}
