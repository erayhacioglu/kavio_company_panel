import ReactApexChart from "react-apexcharts";

const TotalDoughnutChart = ({ totalViews, totalDownloads }) => {
  const series = [totalViews, totalDownloads];

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Views", "Downloads"],
    colors: ["#00BFFF", "#FF6384"],
    legend: {
      position: "bottom",
    },
  };
  return (
    <div className="custom_card">
      <div className="custom_card_header">
        <span className="custom_card_title">Toplam İstatistik</span>
      </div>
      <div className="custom_card_body">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={315}
        />
      </div>
    </div>
  );
};

export default TotalDoughnutChart;
