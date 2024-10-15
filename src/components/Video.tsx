"use client";

export default function Video({
  videoId,
  className,
  onClick,
}: {
  videoId: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`aspect-video w-full overflow-hidden xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[780px] ${className}`}
      onClick={onClick}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?si=HGHNFx9mNTSwlbni&autoplay=1&mute=1&loop=1&controls=0&color=white&modestbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=${videoId}&showinfo=0`}
        allow="autoplay; encrypted-media"
        className="pointer-events-none ml-[-100%] h-[100%] w-[300%]"
      />
    </div>
  );
}
