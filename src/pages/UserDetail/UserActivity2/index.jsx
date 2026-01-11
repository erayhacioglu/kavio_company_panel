import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { useParams } from "react-router";
import PageLoader from "../../../components/PageLoader";
import Filter from "./components/Filter";
import StatCards from "./components/StatCards";
import TimelineChart from "./components/TimelineChart";
import DistributionChart from "./components/DistributionChart";
import EventMapCard from "./components/EventMapCard";
import EventTable from "./components/EventTable";
import InteractionSourceChart from "./components/InteractionSourceChart";
import * as MockData from "./mockData";
import "./index.scss";

const UserActivity2 = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    eventTypes: [],
    customStart: null,
    customEnd: null,
  });

  // State for data
  const [stats, setStats] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [distribution, setDistribution] = useState(null);
  const [sourceData, setSourceData] = useState([]);
  const [mapEvents, setMapEvents] = useState([]);
  const [tableEvents, setTableEvents] = useState([]);

  // Load data based on filters
  const loadData = () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setStats(MockData.getStats(filters));
      setTimelineData(MockData.getTimelineData(filters));
      setDistribution(MockData.getDistribution(filters));
      setSourceData(MockData.getSourceData(filters));
      setMapEvents(MockData.getMapEvents(filters));
      setTableEvents(MockData.getTableEvents(filters));
      setLoading(false);
    }, 500);
  };

  // İlk yükleme
  useEffect(() => {
    loadData();
  }, [id]);

  // Filtre değiştiğinde reload
  useEffect(() => {
    if (!loading) {
      loadData();
    }
  }, [filters]);

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="user_activity2_header">
          <div>
            <h1 className="user_activity2_title">Kart Analizi</h1>
            <p className="user_activity2_subtitle">
              Kartınızın detaylı performans analizi ve etkileşim metrikleri
            </p>
          </div>
          <button 
            className={`filter_button ${showFilters ? "active" : ""}`} 
            onClick={handleFilterClick}
          >
            <FiFilter className="filter_icon" />
            Filtrele
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Filter filters={filters} onFiltersChange={handleFiltersChange} />
          </motion.div>
        )}

        <StatCards stats={stats} />
        <TimelineChart data={timelineData} />
        
        <div className="charts_grid">
          <DistributionChart data={distribution} />
          <InteractionSourceChart data={sourceData} />
        </div>

        <EventMapCard events={mapEvents} />
        <EventTable events={tableEvents} />
      </motion.div>
    </div>
  );
};

export default UserActivity2;
