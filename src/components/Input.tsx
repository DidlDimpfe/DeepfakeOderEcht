import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  const classname = `rounded-md px-3 py-2  focus:outline-none disabled:cursor-not-allowed border-red-400 bg-primary-850 ${className || ""} disabled:opacity-60`;

  return <input className={classname} {...props} />;
}
