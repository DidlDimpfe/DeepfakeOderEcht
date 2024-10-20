"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function Sort({
  options,
  className,
}: {
  options: { value: string; label: string }[];
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const selectRef = useRef<HTMLSelectElement>(null);

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathName}?${params.toString()}`);
  }

  console.log(searchParams.get("sort")?.toString());

  return (
    <div className={`relative ${className}`}>
      <select
        ref={selectRef}
        value={searchParams.get("sort")?.toString()}
        onChange={(e) => handleChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-md bg-primary-850 px-3 py-2 pr-10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-accent-400 peer-focus:text-accent-700"
        onClick={() => console.log(selectRef.current?.showPicker())}
      />
    </div>
  );
}
