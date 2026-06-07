import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar, { menuItems } from "./AdminSidebar";
import { getCurrentAdmin, type CurrentAdmin } from "../../services/auth";

const AdminLayout = () => {
  const location = useLocation();
  const [admin, setAdmin] = useState<CurrentAdmin | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getCurrentAdmin().then(setAdmin);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-mda-cream overflow-hidden font-body">
      {/* Sidebar */}
      <AdminSidebar
        admin={admin}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-mda-maroon/5 flex items-center justify-between px-4 sm:px-6 lg:px-10 shadow-sm relative z-10">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-mda-maroon hover:bg-mda-cream/60 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xs sm:text-sm font-bold text-mda-maroon uppercase tracking-widest truncate">
              {menuItems.find((item) => item.path === location.pathname)
                ?.name || "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-mda-maroon uppercase ">
                {admin?.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-mda-maroon/50 font-medium">
                {admin?.role ?? "Administrator"}
              </p>
            </div>
            <div className="w-10 h-10 bg-mda-cream rounded-full border border-mda-maroon/10 flex items-center justify-center font-display text-mda-maroon text-lg">
              {(admin?.name ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
