import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaSearch } from "react-icons/fa";
import { FaEllipsisVertical, FaFileExport } from "react-icons/fa6";

const MonthlyLineChart = ({ data }) => {
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

  const categories = data && data?.map((d) => d.month.slice(0, 7));
  const viewSeries = data && data?.map((d) => d.viewCount);
  const downloadSeries = data && data?.map((d) => d.downloadCount);

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories,
    },
    markers: {
      size: 4,
    },
    legend: {
      position: "top",
    },
  };

  const series = [
    {
      name: "Views",
      data: viewSeries,
    },
    {
      name: "Downloads",
      data: downloadSeries,
    },
  ];
  return (
    <div className="custom_card">
      <div className="custom_card_header">
        <span className="custom_card_title">Aylık İstatistik</span>
        <div className="custom_card_header_groups">
          <div className="custom_card_dropdown" ref={dropdownRef}>
            <span
              className="custom_card_dropdown_button"
              onClick={() => setOpen((prev) => !prev)}
            >
              <FaEllipsisVertical />
            </span>
            <ul className={`custom_card_dropdown_menu ${open ? "open" : ""}`}>
              <li className="custom_card_dropdown_menu_item text-nowrap">
                <FaSearch />
                &nbsp;Görüntüle
              </li>
              <li className="custom_card_dropdown_menu_item text-nowrap">
                <FaFileExport />
                &nbsp;Dışa Aktar
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="custom_card_body">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      </div>
    </div>
  );
};

export default MonthlyLineChart;
