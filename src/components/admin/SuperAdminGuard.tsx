import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentAdmin } from "../../services/auth";

const SuperAdminGuard = () => {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">(
    "loading",
  );

  useEffect(() => {
    let active = true;

    getCurrentAdmin()
      .then((admin) => {
        if (active)
          setStatus(admin?.role === "Super Admin" ? "allowed" : "denied");
      })
      .catch(() => {
        if (active) setStatus("denied");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default SuperAdminGuard;
