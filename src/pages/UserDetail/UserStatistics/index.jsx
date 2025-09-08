import axios from "../../../services/Axios";
import { useEffect, useState } from "react";
import TotalDoughnutChart from "./charts/TotalDoughnutChart";
import MonthlyLineChart from "./charts/MonthlyLineChart";
import { useParams } from "react-router";

const UserStatistics = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState({
    totalViews: "",
    totalDownloads: "",
  });


  const {id} = useParams();
  

  const getTotalData = async () => {
    try {
      const res = await axios.get(
        `/statistics/${id}/total`
      );
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
      const res = await axios.get(
        `/statistics/${id}/monthly`
      );
      setMonthlyData(res?.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    getTotalData();
    getMonthlyData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <TotalDoughnutChart
          totalViews={totalData.totalViews}
          totalDownloads={totalData.totalDownloads}
        />
      </div>
      <div className="col-md-8 mt-4 mt-md-0">
        <MonthlyLineChart data={monthlyData} />
      </div>
    </div>
  );
};

export default UserStatistics;
