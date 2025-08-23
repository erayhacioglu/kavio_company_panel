import { FaBars, FaUserCircle } from "react-icons/fa";
import "./header.scss";
import { FaCircleUser, FaGear, FaGlobe, FaRightFromBracket } from "react-icons/fa6";
import { MdLightMode,MdNightlightRound } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import { useEffect, useRef, useState } from "react";
import LanguageModal from "../../components/LanguageModal";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";


const Header = ({ sidebar, setSidebar }) => {
  const {theme,toggleTheme} = useTheme();
  const [languageModal,setLanguageModal] = useState(false);
  const { t, i18n } = useTranslation();
  const {user} = useSelector(state => state.user);
  const userLetter = user ? `${user?.name[0]}${user?.surname[0]}`:"AA"
  console.log('user', user)

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    // Dışa tıklamayı yakalayan useEffect
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <>
    <header className={`header ${isScrolled ? "scrolled":""}`}>
      <div className="container-fluid">
      <div className="header_container">
        <button className="header_toggle_button" onClick={() => setSidebar(prev => !prev)}>
          <FaBars />
        </button>
        <div className="header_config">
          <div className="header_language" onClick={() => setLanguageModal(true)}>
            <FaGlobe/>
            <span className="header_language_text">{i18n?.language === "tr" ? "İngilizce":"Turkish"}</span>
          </div>
          <div className="header_mode" onClick={toggleTheme}>
            {
              theme === "light" ? <MdNightlightRound />:<MdLightMode/>
            }
          </div>
          <div className="header_user_menu" ref={dropdownRef} onClick={() => setOpen((prev) => !prev)}>
            <div className="user_menu_circle">{userLetter}</div>
            <div className="user_menu_info">
              <h2 className="user_menu_info_fullname">{user?.name}&nbsp;{user?.surname}</h2>
              <h5 className="user_menu_info_role">{user?.role}</h5>
            </div>
            <div className={`header_user_menu_dropdown ${
                      open ? "open" : ""
                    }`}>
              <Link to="/" className="header_user_menu_dropdown_item">
                <FaCircleUser size={18}/>&nbsp;&nbsp;{user?.email}
              </Link>
              <Link to="/" className="header_user_menu_dropdown_item">
                <FaGear size={18}/>&nbsp;&nbsp;Ayarlar
              </Link>
              <div className="header_user_menu_dropdown_divider"/>
              <div className="header_user_menu_dropdown_item" onClick={() => {
                localStorage.clear()
                window.location.href="/auth/login"
              }}>
                <FaRightFromBracket size={18}/>&nbsp;&nbsp;Oturumu Kapat
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
    <LanguageModal languageModal={languageModal} setLanguageModal={setLanguageModal}/>
    </>
  );
};

export default Header;