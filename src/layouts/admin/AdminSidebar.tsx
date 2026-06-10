import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Newspaper,
  Calendar,
  FolderKanban,
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Settings,
  UserCog,
  X,
  type LucideIcon,
} from "lucide-react";
import { logout, type CurrentAdmin } from "../../services/auth";
import { cn } from "@/lib/utils";

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Team", path: "/admin/team", icon: Users },
  { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { name: "Articles", path: "/admin/articles", icon: Newspaper },
  { name: "Events", path: "/admin/events", icon: Calendar },
  { name: "Projects", path: "/admin/projects", icon: FolderKanban },
  { name: "Media/Gallery", path: "/admin/media", icon: ImageIcon },
  {
    name: "Admin Management",
    path: "/admin/administrators",
    icon: UserCog,
    superAdminOnly: true,
  },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export { menuItems };

interface AdminSidebarProps {
  admin?: CurrentAdmin | null;
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ admin, isOpen = false, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSuperAdmin = admin?.role === "Super Admin";
  const visibleItems = menuItems.filter(
    (item) => !item.superAdminOnly || isSuperAdmin,
  );

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 max-w-[80%] bg-mda-maroon text-white flex flex-col shadow-2xl overflow-y-auto transition-transform duration-300 lg:static lg:z-20 lg:max-w-none lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-8">
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
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
            {visibleItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
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
    </>
  );
};

export default AdminSidebar;
