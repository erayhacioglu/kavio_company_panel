import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import menuData from './menuData';

const UserMenu = () => {
    const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  const location = useLocation();
  const params = useParams();

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
                <Link to={`/user-update/${params?.id}${item?.path}`} className={isActive(`/user-update/${params?.id}${item?.path}`)} key={idx}>{item?.label}</Link>
            ))
        }
    </div>
  )
}

export default UserMenu