"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { themeChange } from "theme-change";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LightDarkToggle() {
  const { setTheme: setThemeNext, theme } = useTheme();

  const setTheme = (theme: string) => {
    setThemeNext(theme); // 控制next和shadcn的主题
  };

  React.useEffect(() => {
    themeChange(false);
    document.documentElement.setAttribute("data-theme", theme ?? "");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <button data-set-theme="light" data-act-class="ACTIVECLASS">
            Light
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <button data-set-theme="dark" data-act-class="ACTIVECLASS">
            Dark
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <button data-set-theme="" data-act-class="ACTIVECLASS">
            System
          </button>
        </DropdownMenuItem>

        {/* <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              className="theme-controller hidden"
            />
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              className="theme-controller hidden"
            />
          </label>
          <label></label>
        </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
