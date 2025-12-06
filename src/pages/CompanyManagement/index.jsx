import { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import "./company_information.scss";
import Profile from "./components/Profile";
import SocialMedia from "./components/SocialMedia";
import Company from "./components/Company";
import Catalog from "./components/Catalog";
import "../../layouts/User/user.scss";

const selectedData = [
  { enum: "PROFILE", title: "Profil", component: <Profile /> },
  { enum: "SOCIALMEDIA", title: "Sosyal Medya", component: <SocialMedia /> },
  { enum: "COMPANY", title: "Şirket", component: <Company /> },
  { enum: "CATALOG", title: "Katalog", component: <Catalog /> },
];

const CompanyInformation = () => {
  const [selected, setSelected] = useState("PROFILE");

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

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

  const SelectedComponent = selectedData?.find(
    (el) => el?.enum === selected
  )?.component;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <BreadCrumb pageTitle="Şirket Bilgileri Yönetimi" />
        </div>
        <div className="col-md-12 margin-25">
          <div
            className={`user_menu ${width < 768 ? "mobile" : ""}`}
            ref={divRef}
          >
            {selectedData?.map((item, key) => (
              <div
                className={`user_menu_item ${
                  selected === item?.enum ? "active" : ""
                }`}
                onClick={() => setSelected(item?.enum)}
                key={key}
              >
                {item?.title}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-12">{SelectedComponent}</div>
      </div>
    </div>
  );
};

export default CompanyInformation;
