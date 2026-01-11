import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import menuData from './menuData';
import "../User/user.scss";

const InteractionMenu = () => {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

    const location = useLocation();

    const isActive = (path) => {
        const fullPath = `/interaction${path}`;
        return location.pathname === fullPath
            ? "user_menu_item active"
            : "user_menu_item";
    };

    useEffect(() => {
        if (!divRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(divRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`user_menu ${width < 768 ? "mobile" : ""}`} ref={divRef}>
            {
                menuData && menuData?.map((item, idx) => (
                    <Link 
                        to={`/interaction${item?.path}`} 
                        className={isActive(item?.path)} 
                        key={idx}
                    >
                        {item?.label}
                    </Link>
                ))
            }
        </div>
    )
}

export default InteractionMenu
