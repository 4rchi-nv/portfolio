"use client";

import type { ReactNode } from "react";
import { usePortfolioMode } from "@/components/portfolio-mode-provider";
import type { PortfolioMode } from "@/lib/portfolio-mode";

type ModeVisibleProps = {
  modes: PortfolioMode[];
  children: ReactNode;
  /** Keep in DOM but hide visually (preserves anchors). Default: unmount. */
  keepMounted?: boolean;
};

export function ModeVisible({
  modes,
  children,
  keepMounted = false,
}: ModeVisibleProps) {
  const { mode } = usePortfolioMode();
  const visible = modes.includes(mode);

  if (!visible && !keepMounted) return null;

  if (!visible && keepMounted) {
    return (
      <div hidden aria-hidden className="hidden">
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
