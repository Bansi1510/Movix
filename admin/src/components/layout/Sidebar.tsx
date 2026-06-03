import { useLogout } from "@/hooks/useLogout";
import { logout } from "@/store/slices/auth.slice";
import {
  Film,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingButton from "../common/LoadingButton";

const Sidebar = () => {
  const logoutMutation = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());

        navigate("/login");
      },
    });
  };
  return (
    <aside className="w-72 border-r bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}

        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary p-2 text-primary-foreground">
              <Film size={22} />
            </div>

            <div>
              <h2 className="font-bold">MOVIX</h2>
              <p className="text-xs text-muted-foreground">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="flex-1 space-y-2 p-4">
          <NavLink
            to="/dashboard/videos"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Videos
          </NavLink>

          <NavLink
            to="/dashboard/add-video"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
              }`
            }
          >
            <PlusCircle size={18} />
            Add Video
          </NavLink>
        </div>

        {/* Logout */}

        <div className="border-t p-4">
          <LoadingButton
            variant="destructive"
            loading={logoutMutation.isPending}
            loadingText="Logging out..."
            onClick={handleLogout}
          >
            Logout
          </LoadingButton>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;