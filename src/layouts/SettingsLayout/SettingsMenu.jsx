import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import menuData from './menuData';
import "../User/user.scss";

const SettingsMenu = () => {
    const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? "user_menu_item active"
      : "user_menu_item";
  };


  useEffect(() => {
    if (!divRef.current) return;

    // Observer tanımı
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(divRef.current);

    // Temizlik
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`user_menu ${width < 768 ? "mobile":""}`} ref={divRef}>
        {
            menuData && menuData?.map((item,idx) => (
                <Link to={`/settings${item?.path}`} className={isActive(`/settings${item?.path}`)} key={idx}>{item?.label}</Link>
            ))
        }
    </div>
  )
}

export default SettingsMenu