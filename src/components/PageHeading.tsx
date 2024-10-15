export default function PageHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`cursor-default rounded-full border border-accent-300 bg-primary-500 px-3 py-1 text-center text-sm font-semibold uppercase md:text-lg lg:text-xl ${className}`}
    >
      {children}
    </div>
  );
}
