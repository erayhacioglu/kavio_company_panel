import React, { useEffect, useState, useMemo, useRef } from "react";
import { 
  Clock, 
  Filter, 
  RefreshCw, 
  Calendar,
  Users,
  Share2,
  Image,
  FileText,
  Link as LinkIcon,
  CreditCard,
  Building2,
  Bitcoin,
  Phone,
  IdCard,
  Inbox,
  Plus,
  Minus,
  Loader2,
  CalendarDays
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "../../services/Axios";
import { useSelector } from "react-redux";
import { historyType } from "../../enums";
import "./history_feed.scss";

dayjs.extend(relativeTime);
dayjs.locale("tr");

// Field name mapping (CompanyInfo fields)
const FIELD_LABELS = {
  name: "Şirket Adı",
  address: "Adres",
  taxNo: "Vergi No",
  taxBody: "Vergi Dairesi",
  // Contact info fields
  phone: "Telefon",
  email: "E-posta",
  whatsapp: "WhatsApp",
  location: "Konum",
  fax: "Fax",
  // Link fields
  UNKNOWN: "Link",
  // Generic
  title: "Başlık",
  description: "Açıklama",
  url: "URL",
  type: "Tip",
  value: "Değer"
};

// Get field label
const getFieldLabel = (field) => {
  return FIELD_LABELS[field] || field;
};

// Event type kategorilerini belirleme
const getEventCategory = (eventType) => {
  if (!eventType) return "card";
  
  const type = eventType.toLowerCase();
  
  if (type.includes("connection")) return "connection";
  if (type.includes("social")) return "social";
  if (type.includes("profile_picture") || type.includes("banner_picture")) return "profile";
  if (type.includes("catalog")) return "catalog";
  if (type.includes("link")) return "link";
  if (type.includes("bank")) return "bank";
  if (type.includes("company")) return "company";
  if (type.includes("crypto")) return "crypto";
  if (type.includes("contact") || type.includes("user_info")) return "contact";
  if (type.includes("card")) return "card";
  
  return "card";
};

// Event kategorisine göre ikon seçimi - KÜÇÜLTÜLDÜ
const getEventIcon = (category) => {
  const icons = {
    connection: <Users size={16} />,
    social: <Share2 size={16} />,
    profile: <Image size={16} />,
    catalog: <FileText size={16} />,
    link: <LinkIcon size={16} />,
    bank: <CreditCard size={16} />,
    company: <Building2 size={16} />,
    crypto: <Bitcoin size={16} />,
    contact: <Phone size={16} />,
    card: <IdCard size={16} />
  };
  
  return icons[category] || <Clock size={16} />;
};

// Event type'ın Türkçe karşılığını al
const getEventTypeLabel = (eventType) => {
  return historyType[eventType] || eventType?.replace(/_/g, ' ');
};

// JSON array string'i parse et
const parseArrayString = (str) => {
  if (!str || str === "null") return [];
  try {
    const cleaned = str
      .replace(/^\[|\]$/g, '')
      .split('], [')
      .map(item => {
        const cleanItem = item.replace(/^\[|\]$/g, '');
        return cleanItem.split(',').map(v => v.trim());
      });
    return cleaned;
  } catch (e) {
    console.error("Parse error:", e);
    return [];
  }
};

// İki array arasındaki farkı bul
const getArrayDiff = (oldArray, newArray) => {
  const added = [];
  const removed = [];

  newArray.forEach((newItem) => {
    const newItemStr = JSON.stringify(newItem);
    const exists = oldArray.some(oldItem => JSON.stringify(oldItem) === newItemStr);
    if (!exists) {
      added.push({ data: newItem });
    }
  });

  oldArray.forEach((oldItem) => {
    const oldItemStr = JSON.stringify(oldItem);
    const exists = newArray.some(newItem => JSON.stringify(newItem) === oldItemStr);
    if (!exists) {
      removed.push({ data: oldItem });
    }
  });

  return { added, removed };
};

// Format array data with field labels
const formatArrayData = (dataArray) => {
  return dataArray.map(field => getFieldLabel(field)).join(' → ');
};

// Diff component'i - İyileştirilmiş
const DiffDisplay = ({ oldValue, newValue }) => {
  const oldArray = parseArrayString(oldValue);
  const newArray = parseArrayString(newValue);
  const diff = getArrayDiff(oldArray, newArray);

  if (diff.added.length === 0 && diff.removed.length === 0) {
    return null; // Değişiklik yoksa hiç gösterme
  }

  return (
    <div className="diff-display">
      {diff.removed.length > 0 && (
        <div className="diff-section removed">
          <div className="diff-header">
            <Minus size={14} />
            <span>Silinen ({diff.removed.length})</span>
          </div>
          {diff.removed.map((item, idx) => (
            <div key={idx} className="diff-item">
              <span className="diff-icon">−</span>
              <span className="diff-value">{formatArrayData(item.data)}</span>
            </div>
          ))}
        </div>
      )}

      {diff.added.length > 0 && (
        <div className="diff-section added">
          <div className="diff-header">
            <Plus size={14} />
            <span>Eklenen ({diff.added.length})</span>
          </div>
          {diff.added.map((item, idx) => (
            <div key={idx} className="diff-item">
              <span className="diff-icon">+</span>
              <span className="diff-value">{formatArrayData(item.data)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HistoryFeed() {
  const { user } = useSelector((state) => state.user);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    actorUser: "",
    affectedUser: ""
  });
  
  // Infinite scroll state
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 20;
  
  // Intersection observer ref
  const observerTarget = useRef(null);

  // History verilerini çek
  const fetchHistory = async (pageNum = 0, append = false) => {
    if (!user?.company?.id) return;
    
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    try {
      const params = {
        page: pageNum,
        size: pageSize,
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.actorUser && { actorUser: filters.actorUser }),
        ...(filters.affectedUser && { affectedUser: filters.affectedUser })
      };

      const res = await Axios.get(`/history/company/${user.company.id}`, { params });
      
      if (res?.data) {
        const newContent = res.data.content || [];
        const totalPages = res.data.page?.totalPages || 0;
        const totalElems = res.data.page?.totalElements || 0;
        
        if (append) {
          setData(prev => [...prev, ...newContent]);
        } else {
          setData(newContent);
        }
        
        setTotalElements(totalElems);
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

  // İlk yükleme ve filter değişikliği
  useEffect(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchHistory(0, false);
  }, [user?.company?.id, filters]);

  // Infinite scroll - Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchHistory(nextPage, true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadingMore, page]);

  // Günlere göre grupla
  const groupedData = useMemo(() => {
    const groups = {};
    
    data.forEach((item) => {
      const date = dayjs(item.createdAt).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    
    return groups;
  }, [data]);


  // Gün etiketini formatla
  const formatDayLabel = (date) => {
    const day = dayjs(date);
    const today = dayjs();
    const yesterday = dayjs().subtract(1, "day");
    
    if (day.isSame(today, "day")) return "Bugün";
    if (day.isSame(yesterday, "day")) return "Dün";
    
    return day.format("D MMMM YYYY");
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      actorUser: "",
      affectedUser: ""
    });
  };

  // Yenile butonu
  const handleRefresh = () => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchHistory(0, false);
  };

  // Unique kullanıcıları çıkar (filtreler için)
  const uniqueUsers = useMemo(() => {
    const users = new Set();
    data.forEach(item => {
      if (item.actorUser) users.add(item.actorUser);
      if (item.affectedUser) users.add(item.affectedUser);
    });
    return Array.from(users).sort();
  }, [data]);

  // BULK_UPDATED tiplerini kontrol et
  const isBulkUpdate = (eventType) => {
    return eventType?.includes("BULK_UPDATED");
  };

  // Değişiklik var mı kontrol et
  const hasChanges = (item) => {
    if (!item.oldValue && !item.newValue) return false;
    if (item.oldValue === item.newValue) return false;
    
    // BULK için diff kontrol et
    if (isBulkUpdate(item.eventType)) {
      const oldArray = parseArrayString(item.oldValue);
      const newArray = parseArrayString(item.newValue);
      const diff = getArrayDiff(oldArray, newArray);
      return diff.added.length > 0 || diff.removed.length > 0;
    }
    
    return true;
  };

  return (
    <div className="history-feed-wrapper">
      {/* Header */}
      <div className="history-header">
        <div className="header-left">
          <div className="header-icon">
            <Clock size={20} />
          </div>
          <div className="header-title">
            <h3>Aktivite Geçmişi</h3>
            <p>{totalElements} aktivite</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} />
            <span>Filtrele</span>
          </button>
          
          <button 
            className={`refresh-btn ${loading ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="history-filters">
          <div className="filter-item">
            <label>Başlangıç Tarihi</label>
            <input
              type="date"
              className="filter-select"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>

          <div className="filter-item">
            <label>Bitiş Tarihi</label>
            <input
              type="date"
              className="filter-select"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>

          <div className="filter-item">
            <label>İşlem Yapan</label>
            <select 
              className="filter-select"
              value={filters.actorUser}
              onChange={(e) => setFilters({ ...filters, actorUser: e.target.value })}
            >
              <option value="">Tümü</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Etkilenen Kullanıcı</label>
            <select 
              className="filter-select"
              value={filters.affectedUser}
              onChange={(e) => setFilters({ ...filters, affectedUser: e.target.value })}
            >
              <option value="">Tümü</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Temizle
          </button>
        </div>
      )}

      {/* Body */}
      <div className="history-body">
        {loading && data.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Yükleniyor...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <Inbox className="empty-icon" size={64} />
            <p>Henüz aktivite kaydı bulunmuyor</p>
          </div>
        ) : (
          <>
            {Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a)).map((date) => {
              const items = groupedData[date];
              
              return (
                <div key={date} className="day-group">
                  <div className="day-label">
                    <div className="day-icon">
                      <Calendar size={16} />
                    </div>
                    <div className="day-text">{formatDayLabel(date)}</div>
                    <div className="day-count">{items.length}</div>
                  </div>
                  
                  <div className="history-items">
                    {items.map((item) => {
                      const category = getEventCategory(item.eventType);
                      const isBulk = isBulkUpdate(item.eventType);
                      const showChanges = hasChanges(item);
                      
                      return (
                        <div key={item.id} className="history-item">
                          <div className={`item-icon ${category}`}>
                            {getEventIcon(category)}
                          </div>
                          
                          <div className="item-content">
                            <div className="item-header">
                              <div className="item-info">
                                <h4 className="item-title">
                                  {getEventTypeLabel(item.eventType)}
                                </h4>
                                {item.eventDetail && item.eventDetail !== item.eventType && (
                                  <p className="item-subtitle">{item.eventDetail}</p>
                                )}
                              </div>
                              <div className="item-time">
                                {dayjs(item.createdAt).format("HH:mm")}
                              </div>
                            </div>
                            
                            {/* Sadece değişiklik varsa göster */}
                            {showChanges && (
                              <>
                                {/* BULK UPDATE için diff göster */}
                                {isBulk ? (
                                  <DiffDisplay 
                                    oldValue={item.oldValue} 
                                    newValue={item.newValue} 
                                  />
                                ) : (
                                  /* Normal update için old/new göster */
                                  <div className="value-changes">
                                    {item.oldValue && item.oldValue !== item.newValue && (
                                      <div className="value-box old">
                                        <Minus size={12} />
                                        <span>{item.oldValue}</span>
                                      </div>
                                    )}
                                    {item.newValue && item.newValue !== item.oldValue && (
                                      <div className="value-box new">
                                        <Plus size={12} />
                                        <span>{item.newValue}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            
                            {/* Kullanıcı bilgileri */}
                            {(item.actorUser || item.affectedUser) && (
                              <div className="item-users">
                                {item.actorUser && (
                                  <span className="user-info">
                                    <Users size={12} />
                                    {item.actorUser}
                                  </span>
                                )}
                                {item.affectedUser && 
                                 item.affectedUser !== item.actorUser && 
                                 item.affectedUser !== "null null" && (
                                  <span className="user-arrow">→ {item.affectedUser}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Infinite Scroll Loading Indicator */}
            {hasMore && (
              <div ref={observerTarget} className="loading-more">
                {loadingMore && (
                  <>
                    <Loader2 className="spinner-icon" size={20} />
                    <span>Daha fazla yükleniyor...</span>
                  </>
                )}
              </div>
            )}
            
            {/* End of list indicator */}
            {!hasMore && data.length > 0 && (
              <div className="end-of-list">
                <span>Tüm aktiviteler yüklendi</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
