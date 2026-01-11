// Mock data generator with proper filtering
import dayjs from 'dayjs';

const CITIES = [
  { name: "İstanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Ankara", lat: 39.9334, lng: 32.8597 },
  { name: "İzmir", lat: 38.4237, lng: 27.1428 },
  { name: "Bursa", lat: 40.1826, lng: 29.0665 },
  { name: "Antalya", lat: 36.8969, lng: 30.7133 },
  { name: "Adana", lat: 37.0, lng: 35.3213 },
  { name: "Konya", lat: 37.8746, lng: 32.4932 },
  { name: "Gaziantep", lat: 37.0662, lng: 37.3833 },
];

const NAMES = [
  "Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Fatma Öztürk",
  "Ali Çelik", "Zeynep Arslan", "Mustafa Şahin", "Elif Yurt",
  "Emre Özkan", "Selin Koç", "Burak Aydın", "Deniz Yıldız",
  "Can Tekin", "Merve Güneş", "Oğuz Kara", "Esra Ak"
];

const DEVICES = ["iOS", "Android", "Web", "Windows", "MacOS"];

// Ana veri deposu
let ALL_EVENTS = [];

// İlk veri setini oluştur (son 90 günlük data)
const initializeData = () => {
  ALL_EVENTS = [];
  const now = new Date();
  
  // Son 90 gün için event oluştur
  for (let i = 90; i >= 0; i--) {
    const dayEventCount = Math.floor(Math.random() * 10) + 5;
    
    for (let j = 0; j < dayEventCount; j++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(Math.floor(Math.random() * 24));
      date.setMinutes(Math.floor(Math.random() * 60));
      date.setSeconds(Math.floor(Math.random() * 60));

      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const type = Math.random() < 0.5 ? 'view' : (Math.random() < 0.7 ? 'connection' : 'contact');
      
      ALL_EVENTS.push({
        id: ALL_EVENTS.length + 1,
        type: type,
        userName: NAMES[Math.floor(Math.random() * NAMES.length)],
        timestamp: date.toISOString(),
        location: city.name,
        lat: city.lat + (Math.random() - 0.5) * 0.15,
        lng: city.lng + (Math.random() - 0.5) * 0.15,
        city: city.name,
        device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
        cardName: "Digital Kart",
        note: type === "contact" ? "İletişim talebi bıraktı" : null,
      });
    }
  }
  
  ALL_EVENTS.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Tarih aralığını hesapla
const getDateRange = (dateRange, customStart, customEnd) => {
  const now = dayjs();
  let startDate, endDate;

  switch (dateRange) {
    case 'today':
      startDate = now.startOf('day');
      endDate = now.endOf('day');
      break;
    case 'last7days':
      startDate = now.subtract(7, 'day').startOf('day');
      endDate = now.endOf('day');
      break;
    case 'last30days':
      startDate = now.subtract(30, 'day').startOf('day');
      endDate = now.endOf('day');
      break;
    case 'thisMonth':
      startDate = now.startOf('month');
      endDate = now.endOf('month');
      break;
    case 'lastMonth':
      startDate = now.subtract(1, 'month').startOf('month');
      endDate = now.subtract(1, 'month').endOf('month');
      break;
    case 'custom':
      if (customStart && customEnd) {
        startDate = dayjs(customStart).startOf('day');
        endDate = dayjs(customEnd).endOf('day');
      } else {
        startDate = now.subtract(30, 'day').startOf('day');
        endDate = now.endOf('day');
      }
      break;
    default:
      startDate = now.subtract(30, 'day').startOf('day');
      endDate = now.endOf('day');
  }

  return { startDate, endDate };
};

// Eventi filtrele
const filterEvents = (eventTypes, startDate, endDate) => {
  return ALL_EVENTS.filter(event => {
    const eventDate = dayjs(event.timestamp);
    
    const inDateRange = eventDate.isAfter(startDate) && eventDate.isBefore(endDate);
    if (!inDateRange) return false;
    
    if (eventTypes.length > 0 && !eventTypes.includes(event.type)) {
      return false;
    }
    
    return true;
  });
};

// İstatistikleri hesapla
export const getStats = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  const events = filterEvents(filters.eventTypes, startDate, endDate);
  
  const views = events.filter(e => e.type === 'view').length;
  const connections = events.filter(e => e.type === 'connection').length;
  const contacts = events.filter(e => e.type === 'contact').length;
  const uniqueUsers = new Set(events.map(e => e.userName)).size;
  
  return {
    totalViews: views,
    totalConnections: connections,
    totalContactRequests: contacts,
    uniqueVisitors: uniqueUsers,
    avgResponseTime: `${(Math.random() * 3 + 1).toFixed(1)} saat`,
    conversionRate: events.length > 0 ? Math.round(((connections + contacts) / events.length) * 100) : 0,
  };
};

// Timeline data oluştur
export const getTimelineData = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  const events = filterEvents(filters.eventTypes, startDate, endDate);
  
  const groupedByDay = {};
  events.forEach(event => {
    const day = dayjs(event.timestamp).format('DD/MM');
    if (!groupedByDay[day]) {
      groupedByDay[day] = { date: day, views: 0, connections: 0, requests: 0 };
    }
    
    if (event.type === 'view') groupedByDay[day].views++;
    if (event.type === 'connection') groupedByDay[day].connections++;
    if (event.type === 'contact') groupedByDay[day].requests++;
  });
  
  const timelineArray = Object.values(groupedByDay);
  timelineArray.sort((a, b) => {
    const [dayA, monthA] = a.date.split('/').map(Number);
    const [dayB, monthB] = b.date.split('/').map(Number);
    return monthA === monthB ? dayA - dayB : monthA - monthB;
  });
  
  return timelineArray;
};

// Dağılım verisi
export const getDistribution = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  const events = filterEvents(filters.eventTypes, startDate, endDate);
  
  const total = events.length;
  if (total === 0) return { views: 0, connections: 0, requests: 0, downloads: 0 };
  
  const views = events.filter(e => e.type === 'view').length;
  const connections = events.filter(e => e.type === 'connection').length;
  const requests = events.filter(e => e.type === 'contact').length;
  const downloads = Math.floor(total * 0.1);
  
  return {
    views: Math.round((views / total) * 100),
    connections: Math.round((connections / total) * 100),
    requests: Math.round((requests / total) * 100),
    downloads: Math.round((downloads / total) * 100),
  };
};

// Kaynak analizi
export const getSourceData = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  const events = filterEvents(filters.eventTypes, startDate, endDate);
  
  const total = events.length;
  if (total === 0) {
    return [
      { name: "QR Kod", value: 0, color: "#6366f1" },
      { name: "NFC", value: 0, color: "#8b5cf6" },
      { name: "Link", value: 0, color: "#ec4899" },
      { name: "Diğer", value: 0, color: "#f59e0b" },
    ];
  }
  
  const qr = Math.floor(total * (0.35 + Math.random() * 0.15));
  const nfc = Math.floor(total * (0.25 + Math.random() * 0.1));
  const link = Math.floor(total * (0.15 + Math.random() * 0.1));
  const other = total - qr - nfc - link;
  
  return [
    { name: "QR Kod", value: qr, color: "#6366f1" },
    { name: "NFC", value: nfc, color: "#8b5cf6" },
    { name: "Link", value: link, color: "#ec4899" },
    { name: "Diğer", value: Math.max(0, other), color: "#f59e0b" },
  ];
};

// Harita eventi
export const getMapEvents = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  return filterEvents(filters.eventTypes, startDate, endDate);
};

// Tablo eventi
export const getTableEvents = (filters) => {
  const { startDate, endDate } = getDateRange(filters.dateRange, filters.customStart, filters.customEnd);
  return filterEvents(filters.eventTypes, startDate, endDate);
};

// Initialize
initializeData();

export default {
  getStats,
  getTimelineData,
  getDistribution,
  getSourceData,
  getMapEvents,
  getTableEvents,
};
