"use client";

import React, { ButtonHTMLAttributes } from "react";

export type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({ className = "", type = "button", ...props }: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-[var(--radius-ds-md)] bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-all hover:brightness-105 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  );
};
