import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

// allowedRoles: ["ADMIN", "EDITOR"]
export default function RoleRoute({ allowedRoles = [] }) {
  const { user } = useAuth();
  if (!allowedRoles?.length) return <Outlet />;

  const role = user?.role;
  const hasRole = role && allowedRoles.includes(role);

  return hasRole ? <Outlet /> : <Navigate to="/forbidden" replace />;
}
