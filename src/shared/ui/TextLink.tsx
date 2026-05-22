"use client";

import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

type TextLinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type TextLinkAnchorProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export type TextLinkProps = TextLinkButtonProps | TextLinkAnchorProps;

export const TextLink = (props: TextLinkProps) => {
  const baseClassName =
    "inline-flex items-center text-sm font-semibold text-secondary transition-colors hover:text-secondary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-[var(--radius-ds-sm)]";

  if ("href" in props && typeof props.href === "string") {
    const { href, className = "", children } = props;
    return (
      <Link href={href} className={`${baseClassName} ${className}`}>
        {children}
      </Link>
    );
  }

  const { className = "", type = "button", ...buttonProps } = props;
  return <button type={type} className={`${baseClassName} ${className}`} {...buttonProps} />;
};
