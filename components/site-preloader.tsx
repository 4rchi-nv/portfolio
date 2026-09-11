"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  armBootGate,
  clearBootGate,
  PRELOADER_SESSION_KEY,
  BOOT_PENDING_CLASS,
} from "@/lib/preloader";

const MIN_MS = 2000;
const EXIT_MS = 450;

function preferReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldShowBoot(bootParam: string | null) {
  const force =
    bootParam === "1" ||
    bootParam === "true" ||
    bootParam === "replay" ||
    bootParam === "terminal";
  if (force) {
    sessionStorage.removeItem(PRELOADER_SESSION_KEY);
  }
  const seen = sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
  const pending =
    document.documentElement.classList.contains(BOOT_PENDING_CLASS);
  return pending || !seen || force;
}

function BootTerminal({
  progress,
  lines,
  readyLabel,
}: {
  progress: number;
  lines: string[];
  readyLabel: string;
}) {
  const visibleCount = Math.min(
    lines.length,
    Math.max(1, Math.ceil((progress / 100) * lines.length)),
  );

  return (
    <div className="boot-terminal">
      <div className="boot-terminal__chrome">
        <span className="boot-terminal__dot" />
        <span className="boot-terminal__dot" />
        <span className="boot-terminal__dot" />
        <span className="boot-terminal__title">root@portfolio — zsh</span>
      </div>
      <div className="boot-terminal__body" aria-hidden>
        {lines.slice(0, visibleCount).map((line, index) => (
          <p key={`${line}-${index}`} className="boot-terminal__line">
            <span className="boot-terminal__prompt">›</span> {line}
          </p>
        ))}
        {progress < 100 ? (
          <p className="boot-terminal__line boot-terminal__line--cursor">
            <span className="boot-terminal__prompt">›</span>
            <span className="boot-cursor" />
          </p>
        ) : (
          <p className="boot-terminal__line boot-terminal__line--ok">
            <span className="boot-terminal__prompt">›</span> {readyLabel}
          </p>
        )}
      </div>
      <div className="boot-terminal__bar">
        <span
          className="boot-terminal__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="boot-terminal__meta">
        {String(progress).padStart(3, "0")}% · secure shell
      </p>
    </div>
  );
}

function SitePreloaderInner() {
  const t = useTranslations("Preloader");
  const searchParams = useSearchParams();
  const bootParam = searchParams.get("boot");
  const startedRef = useRef(false);
  const timersRef = useRef<{
    raf: number;
    arm: number;
    hide: number;
  }>({ raf: 0, arm: 0, hide: 0 });

  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const lines = (t.raw("terminal.lines") as string[]) ?? [];

  useLayoutEffect(() => {
    if (!shouldShowBoot(bootParam) || startedRef.current) {
      if (
        startedRef.current ||
        sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1"
      ) {
        clearBootGate();
      }
      setVisible(false);
      return;
    }

    startedRef.current = true;
    setLeaving(false);
    setProgress(0);
    setVisible(true);
    armBootGate();
  }, [bootParam]);

  useEffect(() => {
    if (!visible) return;

    const reduced = preferReducedMotion();
    const duration = reduced ? 1200 : MIN_MS;
    const startedAt = performance.now();
    const timers = timersRef.current;

    const dismiss = () => {
      sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      clearBootGate();
      setLeaving(false);
      setVisible(false);
    };

    const finish = () => {
      setProgress(100);
      setLeaving(true);
      window.clearTimeout(timers.hide);
      timers.hide = window.setTimeout(dismiss, EXIT_MS);
    };

    if (reduced) {
      setProgress(100);
      timers.arm = window.setTimeout(finish, duration);
    } else {
      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const ratio = Math.min(1, elapsed / duration);
        const eased = 1 - (1 - ratio) ** 2.4;
        setProgress(Math.min(100, Math.round(eased * 100)));

        if (elapsed < duration) {
          timers.raf = window.requestAnimationFrame(tick);
          return;
        }

        timers.arm = window.setTimeout(finish, 200);
      };

      timers.raf = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(timers.raf);
      window.clearTimeout(timers.arm);
    };
  }, [visible]);

  useEffect(() => {
    if (visible || !startedRef.current) return;
    if (!document.documentElement.classList.contains(BOOT_PENDING_CLASS)) {
      return;
    }

    const safety = window.setTimeout(() => {
      clearBootGate();
    }, 300);

    return () => window.clearTimeout(safety);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`boot-screen ${leaving ? "boot-screen--leave" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={t("aria")}
      data-variant="terminal"
    >
      <div className="boot-screen__noise" aria-hidden />
      <div className="boot-screen__vignette" aria-hidden />
      <BootTerminal
        progress={progress}
        lines={lines}
        readyLabel={t("terminal.ready")}
      />
      <p className="boot-screen__hint">{t("variants.terminal")}</p>
    </div>
  );
}

export function SitePreloader() {
  return (
    <Suspense fallback={null}>
      <SitePreloaderInner />
    </Suspense>
  );
}
