import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./menu.scss";
import menuData from "../../constants/menuData";
import { MdAdd, MdRemove } from "react-icons/md";

const MenuItem = ({ name, icon, onClick, hasToggle, isOpen }) => (
  <button className="menu-btn" onClick={onClick}>
    <span>{icon}</span>
    <p>{name}</p>
    {hasToggle && <span>{isOpen ? <MdRemove /> : <MdAdd />}</span>}
  </button>
);

const MenuBlock = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef(null);
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && itemsRef.current) {
      setHeight(itemsRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className={`menu-block ${isOpen ? "open" : ""}`}>
      <MenuItem
        name={item.name}
        icon={item.icon}
        onClick={() => setIsOpen((prev) => !prev)}
        hasToggle
        isOpen={isOpen}
      />
      <div className="menu-inner" style={{ height }}>
        <ul className="menu-subitems" ref={itemsRef}>
          {item.items.map((sub, idx) => (
            <li key={idx}>
              <button
                className="menu-sub-btn"
                onClick={() => navigate(sub.path)}
              >
                <span>{sub.icon}</span>
                {sub.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const SingleMenuItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <li className="menu-item">
      <button className="menu-btn" onClick={() => navigate(item.path)}>
        <span>{item.icon}</span>
        <p>{item.name}</p>
      </button>
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
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default Menu;
