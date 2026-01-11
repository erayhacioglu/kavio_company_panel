import { Outlet } from "react-router";
import ConnectionsMenu from "./ConnectionsMenu";
import BreadCrumb from "../../components/BreadCrumb";

const ConnectionsLayout = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <BreadCrumb pageTitle="Bağlantılar" />
        <ConnectionsMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default ConnectionsLayout;
