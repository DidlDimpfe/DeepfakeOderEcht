import Image from "next/image";

export default function CelebrityPicture({ videoId }: { videoId: string }) {
  // 1280x720 ratio

  return (
    <div className="relative h-[68px] w-[120px] overflow-hidden">
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="YouTube Video"
        title="YouTube Video"
        fill
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
}
