"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_PORTFOLIO_MODE,
  isPortfolioMode,
  PORTFOLIO_MODE_KEY,
  type PortfolioMode,
} from "@/lib/portfolio-mode";

type PortfolioModeContextValue = {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  ready: boolean;
};

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(
  null,
);

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>(DEFAULT_PORTFOLIO_MODE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PORTFOLIO_MODE_KEY);
      if (isPortfolioMode(stored)) {
        setModeState(stored);
      }
    } catch {
      /* ignore storage failures */
    }
    setReady(true);
  }, []);

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(PORTFOLIO_MODE_KEY, next);
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, ready }),
    [mode, setMode, ready],
  );

  return (
    <PortfolioModeContext.Provider value={value}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const ctx = useContext(PortfolioModeContext);
  if (!ctx) {
    throw new Error("usePortfolioMode must be used within PortfolioModeProvider");
  }
  return ctx;
}
