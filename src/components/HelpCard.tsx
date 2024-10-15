import React from "react";
import Heading from "./Heading";

const iconBackgroundClasses = {
  slate: "bg-slate-100",
  gray: "bg-gray-100",
  zinc: "bg-zinc-100",
  neutral: "bg-neutral-100",
  stone: "bg-stone-100",
  red: "bg-red-100",
  orange: "bg-orange-100",
  amber: "bg-amber-100",
  yellow: "bg-yellow-100",
  lime: "bg-lime-100",
  green: "bg-green-100",
  emerald: "bg-emerald-100",
  teal: "bg-teal-100",
  cyan: "bg-cyan-100",
  sky: "bg-sky-100",
  blue: "bg-blue-100",
  indigo: "bg-indigo-100",
  violet: "bg-violet-100",
  purple: "bg-purple-100",
  fuchsia: "bg-fuchsia-100",
  pink: "bg-pink-100",
  rose: "bg-rose-100",
};

export default function HelpCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactElement;
  title: string;
  description: string | React.ReactNode;
  color:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-primary-850 p-4 shadow-sm md:py-6 xl:p-8">
      <div className={`rounded-xl ${iconBackgroundClasses[color]} p-2`}>
        {React.cloneElement(icon, {
          width: 30,
          height: 30,
          className: `text-${color}-600`,
        })}
      </div>

      <div className="flex flex-col">
        <Heading as="h3" size="sm" className="text-center">
          {title}
        </Heading>
        <p className="max-w-[380px] text-center text-xs text-accent-200">
          {description}
        </p>
      </div>
    </div>
  );
}
