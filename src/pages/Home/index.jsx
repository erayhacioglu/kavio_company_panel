import "./home.scss";
import InfoCard from "../../components/InfoCard";
import Carousel from "../../components/Carousel";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

const App = () => {
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
    <div className="container">
      <div className="row align-items-stretch">
        <InfoCard />
        <Carousel />
        <div className="col-12">
          <div className="custom_card">
            <div className="custom_card_header">
              <span className="custom_card_title">Test Başlık</span>
              <div className="custom_card_header_groups">
                <button className="btn btn-sm btn-primary">Button</button>
                <button className="btn btn-sm btn-success">Button 2</button>
              </div>
            </div>
            <div className="custom_card_body">
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Placeholder"
                />
              </div>
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input type="text" className="form_control" />
              </div>
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input type="text" className="form_control" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="custom_card">
            <div className="custom_card_header">
              <span className="custom_card_title">Test Başlık Dropdown</span>
              <div className="custom_card_header_groups">
                <div className="custom_card_dropdown" ref={dropdownRef}>
                  <span
                    className="custom_card_dropdown_button"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <FaEllipsisVertical />
                  </span>
                  <ul
                    className={`custom_card_dropdown_menu ${
                      open ? "open" : ""
                    }`}
                  >
                    <li className="custom_card_dropdown_menu_item">Menu 1</li>
                    <li className="custom_card_dropdown_menu_item">Menu 2</li>
                    <li className="custom_card_dropdown_menu_item">Menu 3</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="custom_card_body">
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Placeholder"
                />
              </div>
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input type="text" className="form_control" />
              </div>
              <div className="form_group">
                <label className="form_label">Ad Soyad</label>
                <input type="text" className="form_control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
