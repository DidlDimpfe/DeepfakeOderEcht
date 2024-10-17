import HelpButton from "@/components/HelpButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <HelpButton />
    </>
  );
}
