import React, { useEffect, useState } from "react";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";
import Timeline from "./Timeline";
import "./index.scss";
import { useParams } from "react-router";
import Axios from "../../../services/Axios";
import useDateRanges from "../../../hooks/useDateRanges";
import PageLoader from "../../../components/PageLoader";

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

  const {id} = useParams();
  const { monthStart, monthEnd, weekStart, weekEnd } = useDateRanges();

  // console.log({ monthStart, monthEnd, weekStart, weekEnd })

  const [monthlyData,setMonthlyData] = useState([]);
  const [monthlyDataLoading,setMonthlyDataLoading] = useState(false);

  const [monthlyStatistics,setMonthlyStatistics] = useState([]);
  const [monthlyStatisticsLoading,setMonthlyStatisticsLoading] = useState(false);

  console.log('monthlyStatistics', monthlyStatistics)

  const getMonthlyData = async () => {
    try {
      setMonthlyDataLoading(true);
      const res = await Axios.get(`/statistics/${id}/monthly`);
      if(res?.data){
        setMonthlyData(res?.data);
      }
    } catch (error) {
      console.error("Aylık istatistik bilgisi getirilemedi",error);
    }finally{
      setMonthlyDataLoading(false);
    }
  }


  const getData = async () => {
  try {
    // const [monthlyDownload, monthlyView] = await Promise.all([
    //   Axios.get(`/card-interaction/location-report?cardId=${id}&type=DOWNLOAD&start=${monthStart}&end=${monthEnd}`),
    //   Axios.get(`/card-interaction/location-report?cardId=${id}&type=VIEW&start=${monthStart}&end=${monthEnd}`),
    // ]);
    const [monthlyDownload, monthlyView] = await Promise.all([
      Axios.get(`/card-interaction/location-report?cardId=${id}&type=DOWNLOAD&start=2025-08-01&end=${monthEnd}`),
      Axios.get(`/card-interaction/location-report?cardId=${id}&type=VIEW&start=2025-08-01&end=${monthEnd}`),
    ]);
    console.log("monthlyDownload",monthlyDownload);
    console.log("monthlyView",monthlyView);
  } catch (error) {
    console.error(error);
  }
};

const getMonthlyStatistics = async () => {
  try {
    setMonthlyStatisticsLoading(true);
    const res = await Axios.get(`/statistics/${id}/monthly`);
    if(res?.data){
      setMonthlyStatistics(res?.data);
    }
  } catch (error) {
    console.error("Aylık istatistikler getirilemedi",error);
  }finally{
    setMonthlyStatisticsLoading(false);
  }
}

useEffect(() => {
  if(!id) return;
  getData();
  getMonthlyStatistics();
  getMonthlyData();
},[id]);

const generalLoading = monthlyDataLoading || monthlyStatisticsLoading;

if(generalLoading){
  return <PageLoader />
}


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

      <WeeklyChart data={monthlyData}/>
      <MonthlyChart data={monthlyStatistics} className="my-5"/>
      <Timeline data={activityData[year]} filter={filter} />
    </div>
  );
}
