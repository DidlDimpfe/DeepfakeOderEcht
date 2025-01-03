"use client";

import { guess } from "@/lib/actions";
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
    guess(questionId, videoId);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Video
          videoId={firstVideoId}
          className="mx-[4%] mt-12 cursor-pointer transition-transform duration-300 lg:mx-[8%] lg:my-0"
          onClick={() => handleClick(firstVideoId)}
        />
      </div>

      <div className="flex items-center justify-center">
        <Video
          videoId={secondVideoId}
          className="mx-[4%] mb-12 cursor-pointer transition-transform duration-300 lg:mx-[8%] lg:my-0"
          onClick={() => handleClick(secondVideoId)}
        />
      </div>
    </>
  );
}
