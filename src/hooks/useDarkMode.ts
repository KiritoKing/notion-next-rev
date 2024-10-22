import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export function useDarkMode() {
  const { theme } = useTheme();
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsSystemDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsSystemDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const isDarkMode = useMemo(() => {
    if (theme === "system") {
      return isSystemDarkMode;
    } else {
      return theme === "dark";
    }
  }, [theme, isSystemDarkMode]);

  return isDarkMode;
}
