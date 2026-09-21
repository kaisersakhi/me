type Theme = "light" | "dark";

/** index.html resolves the theme before first paint; this reads that result. */
export const theme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** Flips the attribute the stylesheet keys its palette off, and remembers it. */
export function toggleTheme(): Theme {
  const next: Theme = theme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  return next;
}
