import { Outlet } from "react-router";
import UserHeader from "./UserHeader";

const UserLayout = () => {
  return (
    <div className="container">
      <div className="col-md-12">
        <UserHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
