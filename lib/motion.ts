const ease: [number, number, number, number] = [0.2, 0.85, 0.2, 1];

type StaggerMotion = {
  initial?: boolean | Record<string, number>;
  animate?: Record<string, number>;
  whileInView?: Record<string, number>;
  viewport?: { once: boolean; amount?: number; margin?: string };
  transition?: { duration: number; ease: [number, number, number, number]; delay?: number };
};

/** Never use opacity:0 — on mobile / hydration, whileInView can fail and content stays invisible. */
export function staggerItemProps(
  index: number,
  isMobile: boolean,
  reducedMotion: boolean | null,
): StaggerMotion {
  if (reducedMotion) {
    return { initial: false };
  }

  const hidden = { opacity: 1, y: 14 };
  const show = { opacity: 1, y: 0 };
  const delay = isMobile ? Math.min(index * 0.055, 0.55) : Math.min(index * 0.045, 0.45);

  if (isMobile) {
    return {
      initial: hidden,
      animate: show,
      transition: { duration: 0.4, ease, delay },
    };
  }

  return {
    initial: hidden,
    whileInView: show,
    viewport: { once: true, amount: 0.08, margin: "0px 0px -12% 0px" },
    transition: { duration: 0.45, ease, delay },
  };
}

export const fadeInProps = (
  isMobile: boolean,
  reducedMotion: boolean | null,
): StaggerMotion => {
  if (reducedMotion) {
    return { initial: false };
  }
  const hidden = { opacity: 1, y: 12 };
  const show = { opacity: 1, y: 0 };
  if (isMobile) {
    return {
      initial: hidden,
      animate: show,
      transition: { duration: 0.45, ease },
    };
  }
  return {
    initial: hidden,
    whileInView: show,
    viewport: { once: true, amount: 0.12, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.5, ease },
  };
};
