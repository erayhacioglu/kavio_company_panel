import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Sparkles,
  Filter,
  RefreshCw,
  X,
  Loader2,
  Users,
  Eye,
  Mail,
  Share2,
  Link2,
  Image,
  CreditCard,
  Building2,
  ArrowRight,
  ChevronDown,
  Calendar,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "../../services/Axios";
import { useSelector } from "react-redux";
import { historyType } from "../../enums";
import "./history_feed3.scss";

dayjs.extend(relativeTime);
dayjs.locale("tr");

// Premium event categories
const EVENT_CATEGORIES = {
  all: { icon: Sparkles, color: "#6366F1", label: "Tümü" },
  connection: { icon: Users, color: "#10B981", label: "Bağlantılar" },
  view: { icon: Eye, color: "#F59E0B", label: "Görüntülenmeler" },
  contact: { icon: Mail, color: "#3B82F6", label: "İletişim" },
  social: { icon: Share2, color: "#8B5CF6", label: "Sosyal Medya" },
  profile: { icon: Image, color: "#EC4899", label: "Profil" },
  link: { icon: Link2, color: "#06B6D4", label: "Linkler" },
  bank: { icon: CreditCard, color: "#EF4444", label: "Banka" },
  company: { icon: Building2, color: "#14B8A6", label: "Şirket" },
};

const getEventCategory = (eventType) => {
  if (!eventType) return EVENT_CATEGORIES.all;
  const type = eventType.toLowerCase();
  if (type.includes("connection")) return EVENT_CATEGORIES.connection;
  if (type.includes("view")) return EVENT_CATEGORIES.view;
  if (type.includes("contact")) return EVENT_CATEGORIES.contact;
  if (type.includes("social")) return EVENT_CATEGORIES.social;
  if (type.includes("profile")) return EVENT_CATEGORIES.profile;
  if (type.includes("link")) return EVENT_CATEGORIES.link;
  if (type.includes("bank")) return EVENT_CATEGORIES.bank;
  if (type.includes("company")) return EVENT_CATEGORIES.company;
  return EVENT_CATEGORIES.all;
};

const getEventLabel = (eventType) => {
  return historyType[eventType] || eventType?.replace(/_/g, " ");
};

export default function HistoryFeed3() {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    categories: [],
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
  }, [user?.company?.id, filters.startDate, filters.endDate]);

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

  // Filter and sort
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.eventType?.toLowerCase().includes(query) ||
          item.eventDetail?.toLowerCase().includes(query) ||
          item.actorUser?.toLowerCase().includes(query)
      );
    }

    // Categories
    if (filters.categories.length > 0 && !filters.categories.includes("all")) {
      result = result.filter((item) => {
        const category = getEventCategory(item.eventType);
        return filters.categories.some((c) => EVENT_CATEGORIES[c] === category);
      });
    }

    // Sort
    result.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return result;
  }, [data, filters, sortOrder]);

  // Stats
  const stats = useMemo(() => {
    const today = dayjs().startOf("day");
    const todayEvents = filteredData.filter((item) =>
      dayjs(item.createdAt).isAfter(today)
    );

    const categoryCount = {};
    Object.keys(EVENT_CATEGORIES).forEach((key) => {
      categoryCount[key] = filteredData.filter(
        (item) => getEventCategory(item.eventType) === EVENT_CATEGORIES[key]
      ).length;
    });

    return {
      total: filteredData.length,
      today: todayEvents.length,
      categories: categoryCount,
    };
  }, [filteredData]);

  // Group by day
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
    if (day.isSame(dayjs(), "day")) return "Bugün";
    if (day.isSame(dayjs().subtract(1, "day"), "day")) return "Dün";
    return day.format("dddd, D MMMM");
  };

  const handleRefresh = () => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchHistory(0, false);
  };

  const clearFilters = () => {
    setFilters({ search: "", startDate: "", endDate: "", categories: [] });
  };

  const toggleCategory = (categoryKey) => {
    setFilters((prev) => {
      const categories = [...prev.categories];
      if (categoryKey === "all") {
        return { ...prev, categories: [] };
      }
      const index = categories.indexOf(categoryKey);
      if (index > -1) {
        categories.splice(index, 1);
      } else {
        categories.push(categoryKey);
      }
      return { ...prev, categories };
    });
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const hasActiveFilters =
    filters.search || filters.startDate || filters.endDate || filters.categories.length > 0;

  return (
    <div className="hf3_premium">
      {/* Premium Header */}
      <div className="hf3_head">
        <div className="hf3_head_left">
          <div className="hf3_head_icon">
            <Sparkles size={20} />
          </div>
          <div className="hf3_head_text">
            <h2>Aktivite Merkezi</h2>
            <p>
              {stats.total} aktivite · {stats.today} bugün
            </p>
          </div>
        </div>

        <div className="hf3_head_right">
          <button className="hf3_sort_btn" onClick={toggleSort}>
            {sortOrder === "desc" ? "Yeni İlk" : "Eski İlk"}
            <ChevronDown
              size={14}
              style={{ transform: sortOrder === "asc" ? "rotate(180deg)" : "none" }}
            />
          </button>

          <button
            className={`hf3_icon_btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            {hasActiveFilters && <span className="hf3_indicator"></span>}
          </button>

          <button
            className={`hf3_icon_btn ${loading ? "spin" : ""}`}
            onClick={handleRefresh}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Premium Filters */}
      {showFilters && (
        <div className="hf3_filter_panel">
          {/* Search Bar */}
          <div className="hf3_search_bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Aktivite ara..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            {filters.search && (
              <button onClick={() => setFilters({ ...filters, search: "" })}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="hf3_categories">
            <div className="hf3_categories_label">
              <Filter size={14} />
              <span>Kategori</span>
            </div>
            <div className="hf3_category_pills">
              {Object.entries(EVENT_CATEGORIES).map(([key, config]) => {
                const Icon = config.icon;
                const isActive =
                  key === "all"
                    ? filters.categories.length === 0
                    : filters.categories.includes(key);
                const count = stats.categories[key] || 0;

                return (
                  <button
                    key={key}
                    className={`hf3_pill ${isActive ? "active" : ""}`}
                    style={{
                      "--pill-color": config.color,
                    }}
                    onClick={() => toggleCategory(key)}
                  >
                    <Icon size={14} />
                    <span>{config.label}</span>
                    <span className="hf3_pill_count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div className="hf3_date_range">
            <div className="hf3_date_range_label">
              <Calendar size={14} />
              <span>Tarih Aralığı</span>
            </div>
            <div className="hf3_date_inputs">
              <div className="hf3_date_field">
                <label>Başlangıç</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>
              <ArrowRight size={16} className="hf3_date_arrow" />
              <div className="hf3_date_field">
                <label>Bitiş</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="hf3_filter_actions">
              <button className="hf3_clear_btn" onClick={clearFilters}>
                <X size={14} />
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="hf3_content">
        {loading && data.length === 0 ? (
          <div className="hf3_state">
            <div className="hf3_state_icon">
              <Loader2 size={32} />
            </div>
            <p>Aktiviteler yükleniyor...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="hf3_state">
            <div className="hf3_state_icon">
              <Sparkles size={48} />
            </div>
            <h4>{hasActiveFilters ? "Sonuç bulunamadı" : "Henüz aktivite yok"}</h4>
            <p>
              {hasActiveFilters
                ? "Farklı filtreler deneyin"
                : "İlk aktiviteniz burada görünecek"}
            </p>
            {hasActiveFilters && (
              <button className="hf3_state_btn" onClick={clearFilters}>
                Filtreleri Temizle
              </button>
            )}
          </div>
        ) : (
          <>
            {Object.entries(groupedByDay).map(([date, items]) => (
              <div key={date} className="hf3_day">
                <div className="hf3_day_header">
                  <div className="hf3_day_label">{formatDayLabel(date)}</div>
                  <div className="hf3_day_meta">
                    <span className="hf3_day_year">{dayjs(date).year()}</span>
                    <span className="hf3_day_count">{items.length} aktivite</span>
                  </div>
                </div>

                <div className="hf3_events">
                  {items.map((item) => {
                    const category = getEventCategory(item.eventType);
                    const Icon = category.icon;

                    return (
                      <div key={item.id} className="hf3_card">
                        <div
                          className="hf3_card_icon"
                          style={{
                            background: `${category.color}15`,
                            color: category.color,
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="hf3_card_body">
                          <div className="hf3_card_header">
                            <div className="hf3_card_title">
                              <span className="hf3_card_user">
                                {item.actorUser || "Sistem"}
                              </span>
                              <span className="hf3_card_action">
                                {getEventLabel(item.eventType)}
                              </span>
                            </div>
                            <div className="hf3_card_time">
                              {dayjs(item.createdAt).format("HH:mm")}
                            </div>
                          </div>

                          {item.eventDetail && item.eventDetail !== item.eventType && (
                            <div className="hf3_card_detail">{item.eventDetail}</div>
                          )}

                          {item.oldValue && item.newValue && (
                            <div className="hf3_card_changes">
                              <div className="hf3_change_box">
                                <span className="hf3_change_label">Eski</span>
                                <span className="hf3_change_value old">
                                  {item.oldValue}
                                </span>
                              </div>
                              <ArrowRight size={16} className="hf3_change_arrow" />
                              <div className="hf3_change_box">
                                <span className="hf3_change_label">Yeni</span>
                                <span className="hf3_change_value new">
                                  {item.newValue}
                                </span>
                              </div>
                            </div>
                          )}

                          {item.affectedUser && item.affectedUser !== item.actorUser && (
                            <div className="hf3_card_meta">
                              <Users size={12} />
                              <span>Etkilenen: {item.affectedUser}</span>
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
              <div ref={observerTarget} className="hf3_loader">
                {loadingMore && (
                  <div className="hf3_loader_content">
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
