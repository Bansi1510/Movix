import { useState } from "react";
import {
  Moon,
  Sun,
  LogOut,
  Mail,
  ShoppingBag,
} from "lucide-react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

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
import PurchasesDialog from "../payment/PurchasesDialog";

const UserMenu = () => {
  const dispatch = useDispatch();

  const [openPurchases, setOpenPurchases] =
    useState(false);

  const { mutate, isPending } =
    useLogout();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const theme = useSelector(
    (state: RootState) => state.settings.theme
  );

  const initials =
    user?.email
      ?.slice(0, 2)
      .toUpperCase() || "US";

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        dispatch(logoutAction());
      },
    });
  };

  const toggleTheme = () => {
    dispatch(
      setTheme(
        theme === "dark"
          ? "light"
          : "dark"
      )
    );
  };

  const isDark = theme === "dark";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              h-11
              w-11
              rounded-full
              bg-primary
              text-primary-foreground
              font-semibold
              flex
              items-center
              justify-center
              shadow-md
              border
              border-primary/20
              transition-all
              hover:scale-105
            "
          >
            {initials}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className={`
            w-80
            p-0
            overflow-hidden
            rounded-xl
            border
            shadow-2xl
            ${isDark
              ? "bg-white text-black border-gray-200"
              : "bg-zinc-900 text-white border-zinc-700"
            }
          `}
        >
          {/* Header */}
          <div
            className={`p-5 ${isDark
              ? "bg-gray-100"
              : "bg-zinc-800"
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  h-12
                  w-12
                  rounded-full
                  bg-primary
                  text-primary-foreground
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                "
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs ${isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                    }`}
                >
                  Signed in as
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Mail
                    className={`h-4 w-4 shrink-0 ${isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                      }`}
                  />

                  <span className="truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Theme Toggle */}
          <DropdownMenuItem
            onClick={toggleTheme}
            className={`
              cursor-pointer
              py-3
              px-4
              ${isDark
                ? "focus:bg-gray-100"
                : "focus:bg-zinc-800"
              }
            `}
          >
            {isDark ? (
              <>
                <Sun className="mr-3 h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-3 h-4 w-4" />
                Dark Mode
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* My Purchases */}
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpenPurchases(true);
            }}
            className={`
              cursor-pointer
              py-3
              px-4
              ${isDark
                ? "focus:bg-gray-100"
                : "focus:bg-zinc-800"
              }
            `}
          >
            <ShoppingBag className="mr-3 h-4 w-4" />
            My Purchases
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={handleLogout}
            className={`
              cursor-pointer
              py-3
              px-4
              text-red-500
              ${isDark
                ? "focus:bg-gray-100 focus:text-red-500"
                : "focus:bg-zinc-800 focus:text-red-500"
              }
            `}
          >
            <LogOut className="mr-3 h-4 w-4" />

            {isPending
              ? "Logging out..."
              : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PurchasesDialog
        open={openPurchases}
        onOpenChange={setOpenPurchases}
      />
    </>
  );
};

export default UserMenu;