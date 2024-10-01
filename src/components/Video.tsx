"use client";

export default function Video({ videoId }: { videoId: string }) {
  return (
    <div className="pointer-events-none aspect-video w-full overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&color=white&playsinline=1&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        className="ml-[-100%] h-[100%] w-[300%]"
      />
    </div>
  );
}
