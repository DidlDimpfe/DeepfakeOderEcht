"use client";

export default function Video({
  videoId,
  className,
}: {
  videoId: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none aspect-video w-full overflow-hidden xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[780px] ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?si=HGHNFx9mNTSwlbni&autoplay=1&mute=1&loop=1&controls=0&color=white&modestbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=${videoId}&showinfo=0`}
        allow="autoplay; encrypted-media"
        className="ml-[-100%] h-[100%] w-[300%]"
      />
    </div>
  );
}
