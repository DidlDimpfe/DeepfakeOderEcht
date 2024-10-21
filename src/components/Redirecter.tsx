"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirecter({ to }: { to: string | null }) {
  const router = useRouter();

  useEffect(() => {
    if (to === null) {
      router.push("/allanswered");
      return;
    }
    router.push(`/${to}`);
  }, [router, to]);

  return null;
}
