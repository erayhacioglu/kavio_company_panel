import { useSelector } from "react-redux";

export default function useAuth() {
  const { user, token,isLoading } = useSelector((s) => s.user);
  const isAuthenticated = Boolean(token || user);
  return { isAuthenticated,isLoading,user };
}
