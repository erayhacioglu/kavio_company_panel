import { useState, useRef, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router";
import "./menu.scss";
import menuData from "../../constants/menuData";
import { MdAdd, MdRemove } from "react-icons/md";

const MenuItem = ({ name, icon, onClick, hasToggle, isOpen, isActive }) => (
  <button
    className={`menu-btn ${isActive ? "active" : ""}`}
    onClick={onClick}
    aria-expanded={hasToggle ? isOpen : undefined}
    type="button"
  >
    <span>{icon}</span>
    <p>{name}</p>
    {hasToggle && <span>{isOpen ? <MdRemove /> : <MdAdd />}</span>}
  </button>
);

const usePathMatch = () => {
  const { pathname: rawPath } = useLocation();

  const pathname = rawPath.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";

  const norm = (p) => (p ? p.replace(/\/+$/, "") || "/" : "/");

  const isMatch = (path) => {
    if (!path) return false;
    const base = norm(path);

    if (base === "/") {
      return pathname === "/";
    }

    if (pathname === base) return true;
    return pathname.startsWith(base + "/");
  };

  return { pathname, isMatch };
};

const MenuBlock = ({ item }) => {
  const itemsRef = useRef(null);
  const [height, setHeight] = useState(0);
  const { pathname, isMatch } = usePathMatch();

  const hasActiveChild = useMemo(() => {
    const arr = item?.items || [];
    return arr.some((s) => isMatch(s.path));
  }, [pathname, item, isMatch]);

  const [isOpen, setIsOpen] = useState(hasActiveChild);

  useEffect(() => {
    if (isOpen && itemsRef.current) setHeight(itemsRef.current.scrollHeight);
    else setHeight(0);
  }, [isOpen, item?.items?.length]);

  useEffect(() => {
    if (hasActiveChild) setIsOpen(true);
  }, [hasActiveChild]);

  return (
    <li className={`menu-block ${isOpen ? "open" : ""}`}>
      <MenuItem
        name={item.name}
        icon={item.icon}
        onClick={() => setIsOpen((p) => !p)}
        hasToggle
        isOpen={isOpen}
        isActive={hasActiveChild}
      />

      <div className="menu-inner" style={{ height }}>
        <ul className="menu-subitems" ref={itemsRef}>
          {(item.items || []).map((sub, idx) => {
            const active = isMatch(sub.path);
            return (
              <li key={idx}>
                {/* className tamamen bizim active hesabımıza göre */}
                <NavLink
                  to={sub.path}
                  className={`menu-sub-btn ${active ? "active" : ""}`}
                >
                  <span>{sub.icon}</span>
                  {sub.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

const SingleMenuItem = ({ item }) => {
  const { isMatch } = usePathMatch();
  const active = isMatch(item.path);

  return (
    <li className="menu-item">
      {/* Yine sadece bizim active kontrolümüz */}
      <NavLink to={item.path} className={`menu-btn ${active ? "active" : ""}`}>
        <span>{item.icon}</span>
        <p>{item.name}</p>
      </NavLink>
    </li>
  );
};

const Menu = () => {
  return (
    <ul className="menu">
      {menuData.map((item, idx) => {
        if (item.type === "title") {
          return (
            <li className="menu-title" key={idx}>
              {item.name}
            </li>
          );
        } else if (item.type === "item") {
          return <SingleMenuItem key={idx} item={item} />;
        } else if (item.type === "block") {
          return <MenuBlock key={idx} item={item} />;
        }
        return null;
      })}
    </ul>
  );
};

export default Menu;
