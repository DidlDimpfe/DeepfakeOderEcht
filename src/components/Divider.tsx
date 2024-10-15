export default function Divider() {
  return (
    <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center lg:left-1/2 lg:top-0 lg:h-full lg:w-auto lg:translate-x-1/2 lg:translate-y-0">
      <div className="h-[1px] w-full bg-accent-300 lg:h-full lg:w-[1px]" />
      <span className="absolute rounded-full border border-accent-300 bg-primary-500 px-4 font-semibold">
        ODER
      </span>
    </div>
  );
}
