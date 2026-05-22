"use client";

import React, { ButtonHTMLAttributes } from "react";

export type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const SecondaryButton = ({
  className = "",
  type = "button",
  ...props
}: SecondaryButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-[var(--radius-ds-md)] border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-low active:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  );
};
