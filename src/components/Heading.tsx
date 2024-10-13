import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "lg" | "md" | "sm";
  className?: string;
}

export default function Heading({
  children,
  as,
  className,
  size = "md",
}: HeadingProps) {
  const sizeStyles = {
    lg: "text-5xl font-semibold tracking-tight xl:text-7xl",
    md: "text-3xl font-semibold tracking-tight xl:text-5xl",
    sm: "text-xl font-semibold xl:text-3xl",
    xs: "text-lg font-semibold xl:text-xl",
  };

  return React.createElement(
    as,
    { className: `${sizeStyles[size]} ${className}` },
    children,
  );
}
