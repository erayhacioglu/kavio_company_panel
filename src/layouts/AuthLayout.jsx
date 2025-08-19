import { Outlet } from "react-router";
import "../pages/Auth/auth.scss";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
