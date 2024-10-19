"use client";

export default function Video({
  videoId,
  className,
  onClick,
  label = "",
}: {
  videoId: string;
  className?: string;
  onClick?: () => void;
  label?: "Echt" | "Fake" | "";
}) {
  return (
    <div
      className={`aspect-video w-full overflow-hidden xl:max-w-[550px] 2xl:max-w-[650px] 3xl:max-w-[780px] ${className} relative max-w-[550px]`}
      onClick={onClick}
    >
      {label !== "" && (
        <p
          className={`absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-lg px-4 py-2 font-semibold uppercase ${label === "Echt" ? "bg-green-600" : "bg-red-600"}`}
        >
          {label}
        </p>
      )}
      <div className="ml-[-100%] h-[100%] w-[300%] transition-transform duration-300 hover:scale-105">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?si=HGHNFx9mNTSwlbni&autoplay=1&mute=1&loop=1&controls=0&color=white&modestbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=${videoId}&showinfo=0`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none ml-[-100%] h-[100%] w-[300%]"
        />
      </div>
    </div>
  );
}
