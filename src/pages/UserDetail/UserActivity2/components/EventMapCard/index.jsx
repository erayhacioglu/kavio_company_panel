import { useState, useMemo, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import EventDetailsOffcanvas from '../EventDetailsOffcanvas';
import './EventMapCard.scss';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (type, count) => {
  const colors = {
    view: '#2196F3',
    connection: '#4CAF50',
    contact: '#9C27B0'
  };

  const icons = {
    view: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    connection: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    contact: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
  };

  const color = colors[type] || '#666';
  const icon = icons[type] || icons.view;

  return L.divIcon({
    className: 'custom-pin-marker',
    html: `
      <div style="position: relative; width: 50px; height: 50px;">
        <div style="
          position: absolute;
          width: 44px;
          height: 44px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">
            ${icon}
          </div>
        </div>
        ${count > 1 ? `
          <div style="
            position: absolute;
            top: -6px;
            right: -6px;
            background: white;
            color: #333;
            font-size: 13px;
            font-weight: 700;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            border: 2px solid ${color};
          ">${count}</div>
        ` : ''}
      </div>
    `,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  });
};

const EventMapCard = ({ events }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clusterGroupRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const groupedEvents = useMemo(() => {
    const groups = {};
    events.forEach(event => {
      const key = `${event.lat.toFixed(4)},${event.lng.toFixed(4)}`;
      if (!groups[key]) {
        groups[key] = {
          lat: event.lat,
          lng: event.lng,
          events: []
        };
      }
      groups[key].events.push(event);
    });
    return Object.values(groups);
  }, [events]);

  const mapCenter = useMemo(() => {
    if (events.length === 0) return [41.0082, 28.9784];
    const avgLat = events.reduce((sum, e) => sum + e.lat, 0) / events.length;
    const avgLng = events.reduce((sum, e) => sum + e.lng, 0) / events.length;
    return [avgLat, avgLng];
  }, [events]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowOffcanvas(true);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(mapCenter, 6);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup({
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    groupedEvents.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.events[0].type, location.events.length)
      });

      marker.bindPopup(`
        <div style="text-align: center;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9375rem;">Toplam ${location.events.length} Event</h4>
          <p style="margin: 0; font-size: 0.8125rem; color: #666;">Detayları görmek için tıklayın</p>
        </div>
      `);

      marker.on('click', () => handleMarkerClick(location));
      markers.addLayer(marker);
    });

    map.addLayer(markers);
    clusterGroupRef.current = markers;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [groupedEvents, mapCenter]);

  return (
    <>
      <div className="event_map_card">
        <div className="map_header">
          <h3 className="map_title">Lokasyon Bazlı Event Haritası</h3>
          <p className="map_subtitle">Tüm etkileşimlerin coğrafi dağılımı</p>
        </div>
        <div className="map_body">
          <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      <EventDetailsOffcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        location={selectedLocation}
      />
    </>
  );
};

export default EventMapCard;
