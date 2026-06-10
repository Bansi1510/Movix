import { Moon, Sun, LogOut, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RootState } from "@/app/store";
import { logout as logoutAction } from "@/app/slices/auth.slice";
import { setTheme } from "@/app/slices/setting.slice";
import { useLogout } from "@/hooks/useLogout";

const UserMenu = () => {
  const dispatch = useDispatch();

  const { mutate, isPending } = useLogout();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const theme = useSelector(
    (state: RootState) => state.settings.theme
  );

  const initials =
    user?.email?.slice(0, 2).toUpperCase() || "US";

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        dispatch(logoutAction());
      },
    });
  };

  const toggleTheme = () => {
    dispatch(
      setTheme(theme === "dark" ? "light" : "dark")
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            h-12
            w-12
            rounded-full
            bg-primary
            text-primary-foreground
            font-semibold
            flex
            items-center
            justify-center
          "
        >
          {initials}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-70"
      >
        <div className="p-3">
          <p className="text-sm text-muted-foreground">
            Signed in as
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Mail className="h-4 w-4" />

            <span className="text-sm break-all">
              {user?.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
          className="text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />

          {isPending
            ? "Logging out..."
            : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;