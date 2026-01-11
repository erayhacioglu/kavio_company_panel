import dayjs from 'dayjs';

// Tarih aralığı hesaplama
export const getDateRange = (rangeType, customStart, customEnd) => {
  const now = new Date();
  let start, end;

  switch (rangeType) {
    case 'today':
      start = dayjs().startOf('day').toDate();
      end = dayjs().endOf('day').toDate();
      break;
    case 'yesterday':
      start = dayjs().subtract(1, 'day').startOf('day').toDate();
      end = dayjs().subtract(1, 'day').endOf('day').toDate();
      break;
    case 'last7days':
      start = dayjs().subtract(7, 'day').startOf('day').toDate();
      end = dayjs().endOf('day').toDate();
      break;
    case 'last30days':
      start = dayjs().subtract(30, 'day').startOf('day').toDate();
      end = dayjs().endOf('day').toDate();
      break;
    case 'last90days':
      start = dayjs().subtract(90, 'day').startOf('day').toDate();
      end = dayjs().endOf('day').toDate();
      break;
    case 'thisMonth':
      start = dayjs().startOf('month').toDate();
      end = dayjs().endOf('month').toDate();
      break;
    case 'lastMonth':
      start = dayjs().subtract(1, 'month').startOf('month').toDate();
      end = dayjs().subtract(1, 'month').endOf('month').toDate();
      break;
    case 'custom':
      start = customStart ? new Date(customStart) : dayjs().subtract(30, 'day').toDate();
      end = customEnd ? new Date(customEnd) : new Date();
      break;
    default:
      start = dayjs().subtract(30, 'day').startOf('day').toDate();
      end = dayjs().endOf('day').toDate();
  }

  return { start, end };
};

// Event filtreleme
export const filterEvents = (events, filters) => {
  const { dateRange, groupIds, eventTypes, customStart, customEnd } = filters;
  
  const { start, end } = getDateRange(dateRange, customStart, customEnd);

  return events.filter(event => {
    const eventDate = new Date(event.timestamp);
    
    // Tarih filtresi
    if (eventDate < start || eventDate > end) {
      return false;
    }

    // Grup filtresi
    if (groupIds.length > 0 && !groupIds.includes(event.groupId)) {
      return false;
    }

    // Event tipi filtresi
    if (eventTypes.length > 0 && !eventTypes.includes(event.type)) {
      return false;
    }

    return true;
  });
};

// İstatistik hesaplama
export const calculateStats = (events) => {
  const totalEvents = events.length;
  const viewCount = events.filter(e => e.type === 'view').length;
  const connectionCount = events.filter(e => e.type === 'connection').length;
  const contactRequestCount = events.filter(e => e.type === 'contact_request').length;
  
  // Unique visitor sayısı
  const uniqueVisitors = new Set(events.map(e => e.visitorName).filter(Boolean)).size;
  
  // Unique card sayısı
  const uniqueCards = new Set(events.map(e => e.cardId)).size;

  // Kayıtlı vs Misafir
  const registeredCount = events.filter(e => e.visitorType === 'registered').length;
  const guestCount = events.filter(e => e.visitorType === 'guest').length;

  return {
    totalEvents,
    viewCount,
    connectionCount,
    contactRequestCount,
    uniqueVisitors,
    uniqueCards,
    registeredCount,
    guestCount,
  };
};

// Tarih bazında gruplama (zaman serisi)
export const aggregateByDate = (events, groupBy = 'day') => {
  const grouped = {};

  events.forEach(event => {
    let dateKey;
    const date = dayjs(event.timestamp);

    if (groupBy === 'day') {
      dateKey = date.format('DD/MM/YYYY');
    } else if (groupBy === 'week') {
      dateKey = date.startOf('week').format('DD/MM/YYYY');
    } else if (groupBy === 'month') {
      dateKey = date.format('MM/YYYY');
    }

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        views: 0,
        connections: 0,
        contactRequests: 0,
        total: 0,
      };
    }

    grouped[dateKey].total += 1;
    if (event.type === 'view') grouped[dateKey].views += 1;
    if (event.type === 'connection') grouped[dateKey].connections += 1;
    if (event.type === 'contact_request') grouped[dateKey].contactRequests += 1;
  });

  return Object.values(grouped).sort((a, b) => {
    const dateA = dayjs(a.date, 'DD/MM/YYYY');
    const dateB = dayjs(b.date, 'DD/MM/YYYY');
    return dateA.isBefore(dateB) ? -1 : 1;
  });
};

// En performanslı kartları bulma
export const getTopPerformingCards = (events, cards, limit = 10) => {
  const cardStats = {};

  events.forEach(event => {
    if (!cardStats[event.cardId]) {
      cardStats[event.cardId] = {
        cardId: event.cardId,
        cardLabel: event.cardLabel,
        cardType: event.cardType,
        totalInteractions: 0,
        views: 0,
        connections: 0,
        contactRequests: 0,
      };
    }

    cardStats[event.cardId].totalInteractions += 1;
    if (event.type === 'view') cardStats[event.cardId].views += 1;
    if (event.type === 'connection') cardStats[event.cardId].connections += 1;
    if (event.type === 'contact_request') cardStats[event.cardId].contactRequests += 1;
  });

  return Object.values(cardStats)
    .sort((a, b) => b.totalInteractions - a.totalInteractions)
    .slice(0, limit);
};

// Grup bazında toplama
export const aggregateByGroup = (events, groups) => {
  const groupStats = {};

  groups.forEach(group => {
    groupStats[group.id] = {
      groupId: group.id,
      groupName: group.name,
      totalEvents: 0,
      views: 0,
      connections: 0,
      contactRequests: 0,
    };
  });

  events.forEach(event => {
    if (groupStats[event.groupId]) {
      groupStats[event.groupId].totalEvents += 1;
      if (event.type === 'view') groupStats[event.groupId].views += 1;
      if (event.type === 'connection') groupStats[event.groupId].connections += 1;
      if (event.type === 'contact_request') groupStats[event.groupId].contactRequests += 1;
    }
  });

  return Object.values(groupStats).sort((a, b) => b.totalEvents - a.totalEvents);
};

// Şehir bazında toplama (harita için)
export const aggregateByCity = (events) => {
  const cityStats = {};

  events.forEach(event => {
    const key = `${event.city}-${event.country}`;
    
    if (!cityStats[key]) {
      cityStats[key] = {
        city: event.city,
        country: event.country,
        lat: event.lat,
        lng: event.lng,
        count: 0,
        events: [],
      };
    }

    cityStats[key].count += 1;
    cityStats[key].events.push(event);
  });

  return Object.values(cityStats);
};

// Event tipi dağılımı
export const getEventTypeDistribution = (events) => {
  const total = events.length;
  const views = events.filter(e => e.type === 'view').length;
  const connections = events.filter(e => e.type === 'connection').length;
  const contactRequests = events.filter(e => e.type === 'contact_request').length;

  return {
    views: total > 0 ? Math.round((views / total) * 100) : 0,
    connections: total > 0 ? Math.round((connections / total) * 100) : 0,
    contactRequests: total > 0 ? Math.round((contactRequests / total) * 100) : 0,
  };
};