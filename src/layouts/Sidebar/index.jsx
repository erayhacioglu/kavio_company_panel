import "./sidebar.scss";
import cn from "classnames";
import Menu from "../Menu";
import Logo from "../../assets/images/logo.svg";

const Sidebar = ({sidebar}) => {
  return (
    <div
      className={cn({
        sidebar: true,
        open: sidebar,
      })}
    >
      <div className="sidebar_header">
        <img src={Logo} alt="" className="sidebar_header_logo"/>
      </div>
      <Menu />
    </div>
  );
};

export default Sidebar;