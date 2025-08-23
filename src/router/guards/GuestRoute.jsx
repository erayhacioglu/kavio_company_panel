import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function GuestRoute() {
  const { isAuthenticated, isLoading, isHydrated } = useAuth();
  const location = useLocation();

  if (!isHydrated) return null;
  if (isLoading) return null;

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
}
