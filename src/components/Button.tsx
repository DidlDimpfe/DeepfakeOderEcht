import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  type?: "primary" | "secondary" | "link" | "none";
  size?: "lg" | "md" | "sm" | "xs" | "none";
  onClick?: () => void;
  className?: string;
  a?: boolean;
}

export default function Button({
  children,
  disabled = false,
  href,
  type = "primary",
  size = "md",
  onClick,
  className,
  a = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium focus:outline-none";

  const typeStyles = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-200",
    secondary:
      " bg-primary-850 text-primary-500 hover:bg-primary-800 focus:ring-primary-500",
    link: "hover:text-primary-300 text-primary-500",
    none: "",
  };

  const sizeStyles = {
    lg: "px-8 py-4 text-lg focus:ring-4 rounded-md text-xl",
    md: "px-6 py-3 text-base focus:ring-4 rounded-md",
    sm: "px-4 py-2 focus:ring-4 rounded-md",
    xs: "p-1 text-sm focus:ring-2 rounded-md",
    none: "",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedStyles = `${baseStyles} ${typeStyles[type]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  if (href) {
    if (a) {
      return (
        <a
          href={href}
          className={combinedStyles}
          onClick={disabled ? undefined : onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedStyles}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
