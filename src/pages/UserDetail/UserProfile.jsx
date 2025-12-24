import { useEffect, useState } from "react";
import Stats from "../../components/Stats";
import PageLoader from "../../components/PageLoader";
import toast from "react-hot-toast";
import Axios from "../../services/Axios";
import { useParams } from "react-router";
import TotalDoughnutChart from "./UserStatistics/charts/TotalDoughnutChart";
import MonthlyLineChart from "./UserStatistics/charts/MonthlyLineChart";

const UserProfile = () => {
  const [stats, setStats] = useState([]);
  const [totalLoading, setTotalLoading] = useState(false);

  const { id } = useParams();

  const getTotalData = async () => {
    try {
      setTotalLoading(true);
      const res = await Axios.get(`/statistics/${id}/total`);
      if (res?.data) {
        setStats([
          { value: res?.data?.totalViews, label: "Görüntülenme Sayısı" },
          { value: res?.data?.totalConnections, label: "Bağlantı Sayısı" },
          { value: res?.data?.totalContacts, label: "İletişim Sayısı" },
          { value: res?.data?.totalDownloads, label: "İndirilme Sayısı" },
        ]);
      }
    } catch (error) {
      if (error) toast.error("Toplam istatistikler getirilirken hata oluştu");
    } finally {
      setTotalLoading(false);
    }
  };

  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState({
    totalViews: "",
    totalDownloads: "",
  });

  const getTotalDataChart = async () => {
    try {
      const res = await Axios.get(`/statistics/${id}/total`);
      setTotalData({
        totalViews: res?.data?.totalViews,
        totalDownloads: res?.data?.totalDownloads,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const getMonthlyData = async () => {
    try {
      const res = await Axios.get(`/statistics/${id}/monthly`);
      setMonthlyData(res?.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getTotalData();
    getMonthlyData();
    getTotalDataChart();
  }, [id]);

  if (totalLoading) {
    return <PageLoader />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px 0" }}>
      <Stats data={stats} />
      <div className="row">
        <div className="col-md-5">
          <TotalDoughnutChart
            totalViews={totalData.totalViews}
            totalDownloads={totalData.totalDownloads}
          />
        </div>
        <div className="col-md-7 mt-4 mt-md-0">
          <MonthlyLineChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
