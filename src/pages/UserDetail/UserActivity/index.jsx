import React, { useState } from "react";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";
import Timeline from "./Timeline";
import "./index.scss";

const activityData = {
  2025: [
    {
      date: "10 Ekim 2025, 09:42",
      type: "connection",
      title: "Yeni Bağlantı Kuruldu",
      desc: "<b>Ahmet Demir</b> ile TechNova etkinliğinde bağlantı kurdunuz.",
      location: "İstanbul, TR",
      channel: "Doğrudan NFC Taraması",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      details: "Bu bağlantı NFC kullanılarak kuruldu.",
    },
    {
      date: "09 Ekim 2025, 21:13",
      type: "contact",
      title: "Yeni İletişim Formu",
      desc: "<b>Elif Kaya</b> Kavio kartınız üzerinden iletişime geçti.",
      location: "Ankara, TR",
      channel: "Web Formu",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      details: "Mesaj: “Yeni projenizde iş birliği yapmak isteriz.”",
    },
  ],
};

export default function Activity() {
  const years = Object.keys(activityData).reverse();
  const [year, setYear] = useState(years[0]);
  const [filter, setFilter] = useState("all");

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
            <h1 className="activity_title">Kart Aktivite Geçmişi</h1>
            <p className="activity_subtitle">
              Profil etkileşimlerinizi, bağlantılarınızı ve iletişim
              isteklerinizi görüntüleyin
            </p>
        </div>
        <div className="col-md-5">
          <div className="row">
            <div className="col-6">
              <div className="form_group m-0">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="form_control"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form_group m-0">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="form_control"
                >
                  <option value="all">Tümü</option>
                  <option value="connection">Bağlantılar</option>
                  <option value="contact">İletişimler</option>
                  <option value="view">Görüntülemeler</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WeeklyChart />
      <MonthlyChart className="my-5"/>
      <Timeline data={activityData[year]} filter={filter} />
    </div>
  );
}
