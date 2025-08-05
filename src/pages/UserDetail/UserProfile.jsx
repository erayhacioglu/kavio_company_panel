import React from "react";
import Stats from "../../components/Stats";

const stats = [
  { value: "249", label: "Connections" },
  { value: "1.2k", label: "Uploads" },
  { value: "1M+", label: "Gross Sales" },
  { value: "27", label: "Author Rank" },
];

const UserProfile = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"25px 0"}}>
      <Stats data={stats} />
      <div className="custom_card">
        <div className="custom_card_header">Hakkında</div>
        <div className="custom_card_body">Burası İçerik Alanı</div>
      </div>
    </div>
  );
};

export default UserProfile;
