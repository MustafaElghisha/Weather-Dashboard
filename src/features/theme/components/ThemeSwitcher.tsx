import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";

import Sun from "/src/assets/sun.svg?react";
import Moon from "/src/assets/moon.svg?react";

import { useTheme } from "../../../app/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      <Label htmlFor="theme-mode">
        <Sun className="size-4" />
      </Label>
      <Switch
        id="theme-mode"
        className="cursor-pointer"
        checked={theme === "dark"}
        onCheckedChange={() => toggleTheme()}
      />
      <Label htmlFor="theme-mode">
        <Moon className="size-4" />
      </Label>
    </div>
  );
}
