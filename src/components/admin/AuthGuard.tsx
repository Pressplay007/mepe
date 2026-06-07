import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession, onAuthChange } from "../../services/auth";

const AuthGuard = () => {
  const [status, setStatus] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    let active = true;

    getSession().then((session) => {
      if (active) setStatus(session ? "in" : "out");
    });

    const unsubscribe = onAuthChange((signedIn) => {
      if (active) setStatus(signedIn ? "in" : "out");
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-mda-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "out") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
