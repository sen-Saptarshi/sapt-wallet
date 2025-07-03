import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size={"icon"}
      variant={"outline"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
