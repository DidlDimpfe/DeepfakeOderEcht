"use client";

import Video from "./Video";

interface QuestionPickProps {
  firstVideoId: string;
  secondVideoId: string;
}

export default function QuestionPick({
  firstVideoId,
  secondVideoId,
}: QuestionPickProps) {
  // TODO on click to server action with question id

  return (
    <>
      <div className="m-4 flex items-center justify-center">
        <Video videoId={firstVideoId} />
      </div>

      <div className="m-4 flex items-center justify-center">
        <Video videoId={secondVideoId} />
      </div>
    </>
  );
}
