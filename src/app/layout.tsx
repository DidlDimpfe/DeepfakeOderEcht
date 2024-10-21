import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700", "900", "100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Deepfake Oder Echt?",
    default: "Deepfake Oder Echt?",
  },
  description:
    "Das Deepfake-Quiz ist ein interaktives Quiz, das dir dabei hilft, zu verstehen, wie Deepfakes funktionieren und wie du sie erkennen kannst.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} flex min-h-svh flex-col bg-primary-900 text-accent-50`}
      >
        <Header />

        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </body>
    </html>
  );
}
