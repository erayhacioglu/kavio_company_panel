import { FaBars } from "react-icons/fa";
import "./header.scss";
import { FaGlobe } from "react-icons/fa6";
import { MdLightMode,MdNightlightRound } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import LanguageModal from "../../components/LanguageModal";
import { useTranslation } from "react-i18next";


const Header = ({ sidebar, setSidebar }) => {
  const {theme,toggleTheme} = useTheme();
  const [languageModal,setLanguageModal] = useState(false);
  const { t, i18n } = useTranslation();

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
          <div className="header_user_menu"></div>
        </div>
        </div>
      </div>
    </header>
    <LanguageModal languageModal={languageModal} setLanguageModal={setLanguageModal}/>
    </>
  );
};

export default Header;