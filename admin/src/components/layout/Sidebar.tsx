import {
  Film,
  LayoutDashboard,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
          <button className="flex w-full items-center gap-3 rounded-xl bg-destructive px-4 py-3 text-destructive-foreground transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;