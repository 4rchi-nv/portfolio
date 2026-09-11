"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Desktop-only custom cursor: solid tip + lagged ring.
 * Disabled for touch, coarse pointers, and reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const noTouch = window.matchMedia("(hover: hover)").matches;
    if (!finePointer || !noTouch) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let pressing = false;
    let visible = false;

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer";

    const applyState = () => {
      const tip = tipRef.current;
      const ring = ringRef.current;
      const root = rootRef.current;
      if (!tip || !ring || !root) return;

      tip.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${
        pressing ? 0.7 : hovering ? 0.55 : 1
      })`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
        pressing ? 0.85 : hovering ? 1.55 : 1
      })`;
      root.style.opacity = visible ? "1" : "0";
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      applyState();
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      visible = true;
      const el = event.target instanceof Element ? event.target : null;
      hovering = Boolean(el?.closest(interactiveSelector));
    };

    const onDown = () => {
      pressing = true;
    };

    const onUp = () => {
      pressing = false;
    };

    const onLeave = () => {
      visible = false;
    };

    const onEnter = () => {
      visible = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] opacity-0 transition-opacity duration-200"
    >
      <div
        ref={tipRef}
        className="absolute left-0 top-0 size-2 rounded-full bg-[var(--foreground)] shadow-[0_0_12px_rgba(126,184,232,0.45)] will-change-transform"
        style={{ transition: "transform 80ms linear" }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-8 rounded-full border border-[rgba(126,184,232,0.55)] bg-[rgba(126,184,232,0.08)] will-change-transform"
        style={{ transition: "transform 120ms linear" }}
      />
    </div>
  );
}
