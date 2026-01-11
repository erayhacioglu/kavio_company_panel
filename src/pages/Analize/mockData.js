export const groups = [
  { id: 1, name: 'Satış Ekibi' },
  { id: 2, name: 'Pazarlama Ekibi' },
  { id: 3, name: 'Müşteri Hizmetleri' },
  { id: 4, name: 'Yönetim' },
];

export const cards = [
  { id: 1, label: 'Ali Çelik - S001', groupId: 1, type: 'Platinum Card', isActive: true },
  { id: 2, label: 'Ayşe Demir - S002', groupId: 1, type: 'Black Card', isActive: true },
  { id: 3, label: 'Mehmet Kaya - P001', groupId: 2, type: 'Gold Card', isActive: true },
  { id: 4, label: 'Fatma Şahin - P002', groupId: 2, type: 'Gold Card', isActive: true },
  { id: 5, label: 'Ahmet Yılmaz - C001', groupId: 3, type: 'Platinum Card', isActive: true },
  { id: 6, label: 'Zeynep Arslan - M001', groupId: 4, type: 'Gold Card', isActive: true },
  { id: 7, label: 'Emre Özkan - S003', groupId: 1, type: 'Black Card', isActive: false },
  { id: 8, label: 'Selin Yurt - P003', groupId: 2, type: 'Platinum Card', isActive: true },
];

const eventTypes = ['view', 'connection', 'contact_request'];
const cities = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, country: 'Türkiye' },
  { name: 'Ankara', lat: 39.9334, lng: 32.8597, country: 'Türkiye' },
  { name: 'İzmir', lat: 38.4237, lng: 27.1428, country: 'Türkiye' },
  { name: 'Bursa', lat: 40.1826, lng: 29.0665, country: 'Türkiye' },
  { name: 'Antalya', lat: 36.8969, lng: 30.7133, country: 'Türkiye' },
  { name: 'Adana', lat: 37.0000, lng: 35.3213, country: 'Türkiye' },
  { name: 'Konya', lat: 37.8746, lng: 32.4932, country: 'Türkiye' },
];

const visitorTypes = ['registered', 'guest'];

const generateEvents = () => {
  const events = [];
  const now = new Date();
  const eventCount = 500;

  for (let i = 0; i < eventCount; i++) {
    const daysAgo = Math.floor(Math.random() * 60);
    const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    timestamp.setHours(Math.floor(Math.random() * 24));
    timestamp.setMinutes(Math.floor(Math.random() * 60));

    const card = cards[Math.floor(Math.random() * cards.length)];
    const group = groups.find(g => g.id === card.groupId);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const latOffset = (Math.random() - 0.5) * 0.2;
    const lngOffset = (Math.random() - 0.5) * 0.2;

    events.push({
      id: i + 1,
      type: eventType,
      cardId: card.id,
      cardLabel: card.label,
      cardType: card.type,
      groupId: group.id,
      groupName: group.name,
      timestamp: timestamp.toISOString(),
      lat: city.lat + latOffset,
      lng: city.lng + lngOffset,
      city: city.name,
      country: city.country,
      visitorType: visitorTypes[Math.floor(Math.random() * visitorTypes.length)],
      source: eventType === 'view' ? 'nfc_tap' : eventType === 'connection' ? 'profile_action' : 'contact_form',
      visitorName: Math.random() > 0.5 ? `Ziyaretçi ${i + 1}` : null,
      note: Math.random() > 0.7 ? 'Önemli müşteri' : null,
    });
  }

  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const events = generateEvents();

export const getEventTypeLabel = (type) => {
  const labels = {
    view: 'Görüntülenme',
    connection: 'Bağlantı',
    contact_request: 'İletişim İsteği'
  };
  return labels[type] || type;
};