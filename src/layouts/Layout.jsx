import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import cn from "classnames";
import { useWindowSize } from "react-use";

const Layout = () => {
  const { width } = useWindowSize();
  const [sidebar, setSidebar] = useState(width <= 768 ? false : true);
  return (
    <>
      <div
        className={cn({
          sidebar_overlay: true,
          open: sidebar,
        })}
        onClick={() => setSidebar(false)}
      />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <main
        className={cn({
          content: true,
          active: !sidebar,
        })}
      >
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <div className="container-fluid container_limiter">
          <div className="page">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
