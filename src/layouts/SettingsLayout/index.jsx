import { Outlet } from "react-router";
import SettingsMenu from "./SettingsMenu";
import BreadCrumb from "../../components/BreadCrumb";

const SettingsLayout = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <BreadCrumb pageTitle="Ayarlar" />
        <SettingsMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
