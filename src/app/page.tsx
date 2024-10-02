// Real 1: https://youtu.be/oEiV6MYzTCE
// Deepfake 1: https://youtu.be/_oCS6j9VVBk

import Video from "@/components/Video";

export default function Page() {
  return (
    <main className="relative grid flex-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-1">
      <div className="m-4 flex items-center justify-center">
        <Video videoId="oEiV6MYzTCE" />
      </div>

      <div className="m-4 flex items-center justify-center">
        <Video videoId="_oCS6j9VVBk" />
      </div>

      <div className="absolute top-1/2 flex w-full translate-y-1/2 items-center justify-center xl:left-1/2 xl:top-0 xl:h-full xl:w-auto xl:translate-x-1/2 xl:translate-y-0">
        <div className="h-[1px] w-full bg-accent-700 xl:h-full xl:w-[1px]" />
        <span className="absolute rounded-full border border-accent-700 bg-primary-500 px-4">
          ODER
        </span>
      </div>
    </main>
  );
}
