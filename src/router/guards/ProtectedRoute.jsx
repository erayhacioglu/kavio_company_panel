import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, isHydrated } = useAuth();
  const location = useLocation();

  if (!isHydrated) return null;
  if (isLoading) return null;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
