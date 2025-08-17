import { Outlet } from "react-router";
import UserHeader from "./UserHeader";
import UserMenu from "./UserMenu";
import "./user.scss";

const User = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        {/* <UserHeader /> */}
        <UserMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default User;
