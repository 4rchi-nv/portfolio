export const PORTFOLIO_MODE_KEY = "portfolio-mode";

export type PortfolioMode = "recruiter" | "engineer";

export function isPortfolioMode(value: unknown): value is PortfolioMode {
  return value === "recruiter" || value === "engineer";
}

export const DEFAULT_PORTFOLIO_MODE: PortfolioMode = "engineer";
