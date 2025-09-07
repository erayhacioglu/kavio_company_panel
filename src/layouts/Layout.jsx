import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import cn from "classnames";
import { useWindowSize } from "react-use";

const Layout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const location = useLocation();

  const [sidebar, setSidebar] = useState(isMobile ? false : true);

  useEffect(() => {
    setSidebar(isMobile ? false : true);
  }, [isMobile]);


  useEffect(() => {
    if (isMobile) {
      setSidebar(false);
    }
  }, [location.pathname, isMobile]);

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
