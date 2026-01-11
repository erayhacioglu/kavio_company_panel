import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "./components/Filter";
import StatCards from "./components/StatCards";
import TopTeamModal from "./components/TopTeamModal";
import TimelineChart from "./components/TimelineChart";
import TopPerformingCards from "./components/TopPerformingCards";
import AllCardsModal from "./components/AllCardsModal";
import DistributionChart from "./components/DistributionChart";
import EventMapCard from "./components/EventMapCard";
import { events as mockEvents, groups as mockGroups } from "./mockData";
import "./analize.scss";
import EventTable from "./components/EventTable";

const Analize8 = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showTopTeamModal, setShowTopTeamModal] = useState(false);
  const [showAllCardsModal, setShowAllCardsModal] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    groupIds: [],
    eventTypes: [],
    customStart: null,
    customEnd: null,
  });

  // Mock data - gerçek veriyle değiştirilecek
  const mockGroups = [
    { id: 1, name: "Satış Ekibi" },
    { id: 2, name: "Pazarlama" },
    { id: 3, name: "Yönetim" },
    { id: 4, name: "IT Departmanı" },
  ];

  // Mock timeline data generator
  const generateTimelineData = () => {
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
        }),
        views: Math.floor(Math.random() * 50 + 20),
        connections: Math.floor(Math.random() * 30 + 10),
        requests: Math.floor(Math.random() * 20 + 5),
      });
    }

    return data;
  };

  // Mock top performing cards data
  const mockTopCards = [
    {
      name: "Zeynep Arslan",
      cardType: "Gold Card",
      totalInteractions: 35,
      views: 15,
      connections: 12,
      contactRequests: 8,
    },
    {
      name: "Selin Yurt",
      cardType: "Gold Card",
      totalInteractions: 33,
      views: 14,
      connections: 11,
      contactRequests: 8,
    },
    {
      name: "Emre Özkan",
      cardType: "Black Card",
      totalInteractions: 32,
      views: 13,
      connections: 12,
      contactRequests: 7,
    },
    {
      name: "Ayşe Demir",
      cardType: "Gold Card",
      totalInteractions: 30,
      views: 12,
      connections: 10,
      contactRequests: 8,
    },
    {
      name: "Mehmet Yılmaz",
      cardType: "Silver Card",
      totalInteractions: 28,
      views: 11,
      connections: 10,
      contactRequests: 7,
    },
    {
      name: "Fatma Kaya",
      cardType: "Black Card",
      totalInteractions: 27,
      views: 11,
      connections: 9,
      contactRequests: 7,
    },
    {
      name: "Ali Çelik",
      cardType: "Gold Card",
      totalInteractions: 25,
      views: 10,
      connections: 9,
      contactRequests: 6,
    },
    {
      name: "Elif Şahin",
      cardType: "Silver Card",
      totalInteractions: 24,
      views: 10,
      connections: 8,
      contactRequests: 6,
    },
    {
      name: "Burak Aydın",
      cardType: "Gold Card",
      totalInteractions: 23,
      views: 9,
      connections: 8,
      contactRequests: 6,
    },
    {
      name: "Deniz Koç",
      cardType: "Black Card",
      totalInteractions: 22,
      views: 9,
      connections: 7,
      contactRequests: 6,
    },
  ];

  // Mock distribution data
  const mockDistribution = {
    views: 67,
    connections: 16,
    requests: 7,
    downloads: 10,
  };

  // Mock event map data - Turkish cities
  const generateMapEvents = () => {
    const cities = [
      { name: "İstanbul", lat: 41.0082, lng: 28.9784 },
      { name: "Ankara", lat: 39.9334, lng: 32.8597 },
      { name: "İzmir", lat: 38.4237, lng: 27.1428 },
      { name: "Bursa", lat: 40.1826, lng: 29.0665 },
      { name: "Antalya", lat: 36.8969, lng: 30.7133 },
      { name: "Adana", lat: 37.0, lng: 35.3213 },
      { name: "Konya", lat: 37.8746, lng: 32.4932 },
      { name: "Gaziantep", lat: 37.0662, lng: 37.3833 },
      { name: "Kayseri", lat: 38.7312, lng: 35.4787 },
      { name: "Eskişehir", lat: 39.7767, lng: 30.5206 },
    ];

    const users = [
      { name: "Zeynep Arslan", card: "Gold Card" },
      { name: "Ahmet Yılmaz", card: "Silver Card" },
      { name: "Mehmet Kaya", card: "Black Card" },
      { name: "Ayşe Demir", card: "Gold Card" },
      { name: "Fatma Öztürk", card: "Silver Card" },
      { name: "Ali Çelik", card: "Black Card" },
    ];

    const eventTypes = ["view", "connection", "contact"];
    const events = [];

    cities.forEach((city, cityIndex) => {
      const eventCount = Math.floor(Math.random() * 5) + 3; // 3-7 events per city

      for (let i = 0; i < eventCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));

        events.push({
          lat: city.lat + (Math.random() - 0.5) * 0.1, // Small variance
          lng: city.lng + (Math.random() - 0.5) * 0.1,
          type: type,
          userName: user.name,
          cardName: `${user.name.split(" ")[0]}'in Kartı`,
          cardType: user.card,
          timestamp: date.toISOString(),
          note: type === "contact" ? "Ürün bilgisi talep etti" : null,
        });
      }
    });

    return events;
  };

  const mockMapEvents = useMemo(() => generateMapEvents(), []);
  const timelineData = useMemo(() => generateTimelineData(), []);

  // Mock stats data
  const mockStats = {
    topTeam: {
      name: "Satış Ekibi",
      interactions: 2450,
      views: 1250,
      connections: 850,
      contactRequests: 350,
      uniqueVisitors: 420,
      memberCount: 12,
    },
    views: 22,
    connections: 20,
    contactRequests: 25,
    uniqueVisitors: 27,
    activeCards: 8,
  };

  // Filtrelenmiş eventler fugjhgf
  const filteredEvents = useMemo(() => {
    // Filtreleme mantığı burada uygulanacak
    // Şu an için tüm eventleri döndürüyoruz
    return mockEvents;
  }, [filters]);

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleTopTeamClick = () => {
    setShowTopTeamModal(true);
  };

  const handleCloseTopTeamModal = () => {
    setShowTopTeamModal(false);
  };

  const handleShowAllCards = () => {
    setShowAllCardsModal(true);
  };

  const handleCloseAllCardsModal = () => {
    setShowAllCardsModal(false);
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BreadCrumb pageTitle="Analiz8" />

        <div className="filter_button_container">
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
            <Filter
              filters={filters}
              onFiltersChange={handleFiltersChange}
              groups={mockGroups}
            />
          </motion.div>
        )}

        <StatCards stats={mockStats} onTopTeamClick={handleTopTeamClick} />

        <TimelineChart data={timelineData} />
        <div className="charts_grid">
          <TopPerformingCards
            cards={mockTopCards}
            onShowAll={handleShowAllCards}
          />
          <DistributionChart data={mockDistribution} />
        </div>

        <EventMapCard events={mockMapEvents} />
      </motion.div>

      <TopTeamModal
        show={showTopTeamModal}
        onHide={handleCloseTopTeamModal}
        teamData={mockStats.topTeam}
      />

      <AllCardsModal
        show={showAllCardsModal}
        onHide={handleCloseAllCardsModal}
        cards={mockTopCards}
      />
      <EventTable events={filteredEvents} />
    </div>
  );
};

export default Analize8;
