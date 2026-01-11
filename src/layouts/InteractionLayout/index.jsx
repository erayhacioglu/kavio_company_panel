import { Outlet } from "react-router";
import InteractionMenu from "./InteractionMenu";
import BreadCrumb from "../../components/BreadCrumb";

const InteractionLayout = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <BreadCrumb pageTitle="Etkileşim" />
        <InteractionMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default InteractionLayout;
