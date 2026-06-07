import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Calendar,
  FolderKanban,
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Settings,
  UserCog,
} from "lucide-react";
import { logout } from "../../services/auth";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Team", path: "/admin/team", icon: Users },
  { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { name: "Events", path: "/admin/events", icon: Calendar },
  { name: "Projects", path: "/admin/projects", icon: FolderKanban },
  { name: "Media/Gallery", path: "/admin/media", icon: ImageIcon },
  { name: "Admin Management", path: "/admin/administrators", icon: UserCog },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export { menuItems };

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-72 bg-mda-maroon text-white flex flex-col shadow-2xl z-20">
      <div className="p-8">
        <div className="flex flex-col items-center mb-10">
          <img
            src="/logo-n.png"
            alt="MDA Logo"
            className="h-20 w-auto object-contain mb-3"
          />
          <h1 className="text-lg font-display uppercase tracking-widest text-white text-center">
            Management System
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-mda-pink text-mda-maroon shadow-lg shadow-mda-pink/10"
                    : "hover:bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-mda-maroon"
                        : "group-hover:scale-110 transition-transform"
                    }
                  />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {item.name}
                  </span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
