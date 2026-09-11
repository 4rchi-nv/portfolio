export type PreloaderVariant = "terminal";

/** Active boot UI. Replay with `?boot=1` or `?boot=terminal`. */
export const preloaderVariant: PreloaderVariant = "terminal";

export const PRELOADER_SESSION_KEY = "portfolio-boot-seen";
export const BOOT_PENDING_CLASS = "boot-pending";
export const BOOT_ACTIVE_CLASS = "boot-active";
export const BOOT_DONE_CLASS = "boot-done";

export const PRELOADER_VARIANTS: PreloaderVariant[] = ["terminal"];

export function isPreloaderVariant(value: string): value is PreloaderVariant {
  return PRELOADER_VARIANTS.includes(value as PreloaderVariant);
}

export function clearBootGate() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove(BOOT_PENDING_CLASS, BOOT_ACTIVE_CLASS, "boot-lock");
  root.classList.add(BOOT_DONE_CLASS);
}

export function armBootGate() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove(BOOT_DONE_CLASS);
  root.classList.add(BOOT_PENDING_CLASS, BOOT_ACTIVE_CLASS, "boot-lock");
}

/**
 * Runs before first paint. Hides `.site-shell` until React preloader dismisses.
 */
export const BOOT_GATE_SCRIPT = `(function(){try{var k=${JSON.stringify(PRELOADER_SESSION_KEY)};var d=${JSON.stringify(preloaderVariant)};var pending=${JSON.stringify(BOOT_PENDING_CLASS)};var done=${JSON.stringify(BOOT_DONE_CLASS)};var q=new URLSearchParams(location.search).get("boot");var forced=q==="terminal"?q:null;var force=q==="1"||q==="true"||q==="replay"||!!forced;var seen=sessionStorage.getItem(k)==="1";var h=document.documentElement;if(force){sessionStorage.removeItem(k);seen=false;}if(force||!seen){h.classList.remove(done);h.classList.add(pending);h.dataset.boot=forced||d;}else{h.classList.add(done);}}catch(e){document.documentElement.classList.add(${JSON.stringify(BOOT_PENDING_CLASS)});}})();`;
