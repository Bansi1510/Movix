import { Bell, Film, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/store";
import { setTheme } from "@/store/slices/setting.slice";

const Header = () => {
  const dispatch = useDispatch();

  const theme = useSelector(
    (state: RootState) => state.settings.theme
  );

  const toggleTheme = () => {
    dispatch(
      setTheme(theme === "dark" ? "light" : "dark")
    );
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Welcome Admin 👋
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your Movix platform efficiently
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-all" />
            ) : (
              <Moon className="h-5 w-5 transition-all" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="outline"
            size="icon"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Brand */}
          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
            <Film className="h-5 w-5" />
            <span className="font-medium">Movix</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;