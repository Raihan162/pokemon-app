"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  size?: IconButtonSize;
  "aria-label": string;
}

export const IconButton = ({
  icon,
  size = "md",
  className = "",
  type = "button",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors hover:bg-surface-container-low active:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
