import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  Mail,
  Share2,
  Zap,
  ChevronRight,
  Loader2,
  Star,
  RefreshCw,
  Filter,
  X,
  Calendar,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "../../services/Axios";
import { useSelector } from "react-redux";
import { historyType } from "../../enums";
import "./history_feed2.scss";

dayjs.extend(relativeTime);
dayjs.locale("tr");

// Event kategorileri ve görselleri
const EVENT_CONFIG = {
  connection: {
    icon: Users,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#667eea",
    label: "Bağlantı",
  },
  view: {
    icon: Eye,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#f093fb",
    label: "Görüntülenme",
  },
  contact: {
    icon: Mail,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#4facfe",
    label: "İletişim",
  },
  social: {
    icon: Share2,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "#43e97b",
    label: "Sosyal",
  },
  default: {
    icon: Zap,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "#fa709a",
    label: "Aktivite",
  },
};

const getEventConfig = (eventType) => {
  const type = eventType?.toLowerCase() || "";
  if (type.includes("connection")) return EVENT_CONFIG.connection;
  if (type.includes("view")) return EVENT_CONFIG.view;
  if (type.includes("contact") || type.includes("mail")) return EVENT_CONFIG.contact;
  if (type.includes("social")) return EVENT_CONFIG.social;
  return EVENT_CONFIG.default;
};

const getEventLabel = (eventType) => {
  return historyType[eventType] || eventType?.replace(/_/g, " ");
};

export default function HistoryFeed2() {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  const observerTarget = useRef(null);

  const fetchHistory = async (pageNum = 0, append = false) => {
    if (!user?.company?.id) return;

    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      const params = {
        page: pageNum,
        size: pageSize,
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      };

      const res = await Axios.get(`/history/company/${user.company.id}`, { params });

      if (res?.data) {
        const newContent = res.data.content || [];
        const totalPages = res.data.page?.totalPages || 0;

        if (append) {
          setData((prev) => [...prev, ...newContent]);
        } else {
          setData(newContent);
        }

        setHasMore(pageNum + 1 < totalPages);
      }
    } catch (error) {
      console.error("History fetch error:", error);
      if (!append) setData([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchHistory(0, false);
  }, [user?.company?.id, filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchHistory(nextPage, true);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [hasMore, loading, loadingMore, page]);

  // Filter by category
  const filteredData = useMemo(() => {
    if (!filters.category) return data;
    return data.filter((item) => {
      const type = item.eventType?.toLowerCase() || "";
      return type.includes(filters.category.toLowerCase());
    });
  }, [data, filters.category]);

  // Today's stats
  const todayStats = useMemo(() => {
    const today = dayjs().startOf("day");
    const todayEvents = filteredData.filter((item) =>
      dayjs(item.createdAt).isAfter(today)
    );

    return {
      total: todayEvents.length,
      connections: todayEvents.filter((e) =>
        e.eventType?.toLowerCase().includes("connection")
      ).length,
      views: todayEvents.filter((e) =>
        e.eventType?.toLowerCase().includes("view")
      ).length,
    };
  }, [filteredData]);

  // Günlere göre grupla
  const groupedByDay = useMemo(() => {
    const groups = {};
    filteredData.forEach((item) => {
      const date = dayjs(item.createdAt).format("YYYY-MM-DD");
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    });
    return groups;
  }, [filteredData]);

  const formatDayLabel = (date) => {
    const day = dayjs(date);
    const today = dayjs();

    if (day.isSame(today, "day")) return "Bugün";
    if (day.isSame(today.subtract(1, "day"), "day")) return "Dün";

    const diff = today.diff(day, "day");
    if (diff < 7) return day.format("dddd");

    return day.format("D MMMM");
  };

  const handleRefresh = () => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchHistory(0, false);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
    });
  };

  const hasActiveFilters = filters.startDate || filters.endDate || filters.category;

  return (
    <div className="hf2_container">
      {/* Premium Header */}
      <div className="hf2_header">
        <div className="hf2_header_gradient"></div>
        <div className="hf2_header_top">
          <div className="hf2_header_content">
            <div className="hf2_header_icon">
              <Sparkles size={24} />
            </div>
            <div className="hf2_header_text">
              <h3>Aktivite Merkezi</h3>
              <p>Gerçek zamanlı takip</p>
            </div>
          </div>

          <div className="hf2_header_actions">
            <button
              className={`hf2_action_btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
              title="Filtrele"
            >
              <Filter size={16} />
              {hasActiveFilters && <span className="hf2_filter_badge"></span>}
            </button>

            <button
              className={`hf2_action_btn ${loading ? "loading" : ""}`}
              onClick={handleRefresh}
              disabled={loading}
              title="Yenile"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="hf2_filters">
            <div className="hf2_filter_group">
              <label>
                <Calendar size={12} />
                Başlangıç
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>

            <div className="hf2_filter_group">
              <label>
                <Calendar size={12} />
                Bitiş
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>

            <div className="hf2_filter_group">
              <label>
                <Filter size={12} />
                Kategori
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Tümü</option>
                <option value="connection">Bağlantılar</option>
                <option value="view">Görüntülenmeler</option>
                <option value="contact">İletişim</option>
                <option value="social">Sosyal</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button className="hf2_clear_filters" onClick={handleClearFilters}>
                <X size={14} />
                Temizle
              </button>
            )}
          </div>
        )}

        {/* Today Stats */}
        <div className="hf2_stats">
          <div className="hf2_stat_card">
            <div className="hf2_stat_icon" style={{ background: EVENT_CONFIG.default.gradient }}>
              <TrendingUp size={16} />
            </div>
            <div className="hf2_stat_content">
              <span className="hf2_stat_value">{todayStats.total}</span>
              <span className="hf2_stat_label">Bugün</span>
            </div>
          </div>

          <div className="hf2_stat_card">
            <div className="hf2_stat_icon" style={{ background: EVENT_CONFIG.connection.gradient }}>
              <Users size={16} />
            </div>
            <div className="hf2_stat_content">
              <span className="hf2_stat_value">{todayStats.connections}</span>
              <span className="hf2_stat_label">Bağlantı</span>
            </div>
          </div>

          <div className="hf2_stat_card">
            <div className="hf2_stat_icon" style={{ background: EVENT_CONFIG.view.gradient }}>
              <Eye size={16} />
            </div>
            <div className="hf2_stat_content">
              <span className="hf2_stat_value">{todayStats.views}</span>
              <span className="hf2_stat_label">Görüntülenme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="hf2_body">
        {loading && data.length === 0 ? (
          <div className="hf2_loading">
            <div className="hf2_loading_spinner">
              <Loader2 size={32} />
            </div>
            <p>Aktiviteler yükleniyor...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="hf2_empty">
            <div className="hf2_empty_icon">
              <Star size={48} />
            </div>
            <h4>
              {hasActiveFilters ? "Aktivite bulunamadı" : "Henüz aktivite yok"}
            </h4>
            <p>
              {hasActiveFilters
                ? "Farklı filtreler deneyin"
                : "İlk aktiviteniz burada görünecek"}
            </p>
            {hasActiveFilters && (
              <button className="hf2_empty_clear" onClick={handleClearFilters}>
                <X size={14} />
                Filtreleri Temizle
              </button>
            )}
          </div>
        ) : (
          <>
            {Object.entries(groupedByDay)
              .sort((a, b) => new Date(b[0]) - new Date(a[0]))
              .map(([date, items]) => (
                <div key={date} className="hf2_day_section">
                  <div className="hf2_day_header">
                    <span className="hf2_day_label">{formatDayLabel(date)}</span>
                    <span className="hf2_day_count">{items.length} aktivite</span>
                  </div>

                  <div className="hf2_timeline">
                    {items.map((item, idx) => {
                      const config = getEventConfig(item.eventType);
                      const Icon = config.icon;

                      return (
                        <div key={item.id} className="hf2_event">
                          <div className="hf2_event_line">
                            <div
                              className="hf2_event_dot"
                              style={{ background: config.gradient }}
                            >
                              <Icon size={14} />
                            </div>
                            {idx < items.length - 1 && <div className="hf2_event_connector"></div>}
                          </div>

                          <div className="hf2_event_card">
                            <div className="hf2_event_card_shine"></div>
                            <div className="hf2_event_header">
                              <div className="hf2_event_title">
                                <span className="hf2_event_type">{getEventLabel(item.eventType)}</span>
                                {item.eventDetail && item.eventDetail !== item.eventType && (
                                  <span className="hf2_event_detail">{item.eventDetail}</span>
                                )}
                              </div>
                              <span className="hf2_event_time">
                                {dayjs(item.createdAt).format("HH:mm")}
                              </span>
                            </div>

                            {item.actorUser && (
                              <div className="hf2_event_user">
                                <div className="hf2_event_user_avatar">
                                  {item.actorUser.charAt(0).toUpperCase()}
                                </div>
                                <span>{item.actorUser}</span>
                                {item.affectedUser && item.affectedUser !== item.actorUser && (
                                  <>
                                    <ChevronRight size={12} />
                                    <span>{item.affectedUser}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            {hasMore && (
              <div ref={observerTarget} className="hf2_load_more">
                {loadingMore && (
                  <div className="hf2_loading_more">
                    <Loader2 size={20} />
                    <span>Daha fazla yükleniyor...</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
