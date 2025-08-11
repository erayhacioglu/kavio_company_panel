import { useMemo, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import "./company_information.scss";
import Profile from "./components/Profile";
import SocialMedia from "./components/SocialMedia";
import Company from "./components/Company";
import Catalog from "./components/Catalog";
import Screen from "./components/Screen";

// path -> component map
const pageEnum = {
  "profile": Profile,
  "social-media": SocialMedia,
  "company": Company,
  "marketing-assets": Catalog,
};

const pageData = [
  { enum: "PROFILE", title: "Profil", path: "profile" },
  { enum: "SOCIALMEDIA", title: "Sosyal Medya", path: "social-media" },
  { enum: "COMPANY", title: "Şirket", path: "company" },
  { enum: "CATALOG", title: "Katalog", path: "marketing-assets" },
];

const CompanyInformation = () => {
  // Artık path tutuyoruz
  const [selectedPage, setSelectedPage] = useState("profile");

  const SelectedComponent = useMemo(
    () => pageEnum[selectedPage] ?? (() => null),
    [selectedPage]
  );

  return (
    <div className="container">
      <BreadCrumb pageTitle="Şirket Bilgileri" topTitle="Firma Yönetimi" />
      <div className="row margin-25">
        <div className="col-md-8">
          <div className="btn_groups" style={{ gap: "20px" }}>
            {pageData.map((item) => (
              <button
                type="button"
                key={item.path}
                onClick={() => setSelectedPage(item.path)}
                className={`btn btn_center ${
                  item.path === selectedPage ? "btn-primary" : "btn-outline-primary text-primary"
                }`}
                aria-pressed={item.path === selectedPage}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div>
            <SelectedComponent />
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-md-0">
          <Screen selectedPage={selectedPage} />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
