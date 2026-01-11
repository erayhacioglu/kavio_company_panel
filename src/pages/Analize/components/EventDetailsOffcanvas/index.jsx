import { useState, useMemo } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FiX, FiEye, FiLink, FiMail, FiClock, FiUser, FiCreditCard, FiFilter, FiDownload } from 'react-icons/fi';
import './EventDetailsOffcanvas.scss';

const EventDetailsOffcanvas = ({ show, onHide, location }) => {
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  // Calculate event statistics
  const stats = useMemo(() => {
    if (!location || !location.events) {
      return { total: 0, views: 0, connections: 0, contacts: 0 };
    }
    const events = location.events;
    return {
      total: events.length,
      views: events.filter(e => e.type === 'view').length,
      connections: events.filter(e => e.type === 'connection').length,
      contacts: events.filter(e => e.type === 'contact').length
    };
  }, [location]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    if (!location || !location.events) return [];
    
    let events = location.events;
    
    // Filter by type
    if (filterType !== 'all') {
      events = events.filter(e => e.type === filterType);
    }

    // Sort by date
    events = [...events].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return events;
  }, [location, filterType, sortOrder]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'view': return <FiEye />;
      case 'connection': return <FiLink />;
      case 'contact': return <FiMail />;
      default: return <FiEye />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'view': return '#2196F3';
      case 'connection': return '#4CAF50';
      case 'contact': return '#9C27B0';
      default: return '#666';
    }
  };

  const getEventLabel = (type) => {
    switch (type) {
      case 'view': return 'Görüntülenme';
      case 'connection': return 'Bağlantı';
      case 'contact': return 'İletişim Talebi';
      default: return 'Event';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExport = () => {
    console.log('Exporting events:', filteredEvents);
    alert('Export özelliği yakında eklenecek!');
  };

  if (!location) {
    return null;
  }

  return (
    <Offcanvas 
      show={show} 
      onHide={onHide} 
      placement="end" 
      className="event_details_offcanvas"
    >
      <Offcanvas.Header className="custom_offcanvas_header">
        <div className="offcanvas_header_content">
          <div className="offcanvas_header_left">
            <h5 className="offcanvas_title">Event Detayları</h5>
            <p className="offcanvas_subtitle">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          </div>
          <button className="offcanvas_close_btn" onClick={onHide}>
            <FiX />
          </button>
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Stats Cards */}
        <div className="stats_cards_grid">
          <div className="stat_card" style={{ borderLeftColor: '#2196F3' }}>
            <div className="stat_icon" style={{ backgroundColor: '#E3F2FD', color: '#2196F3' }}>
              <FiEye />
            </div>
            <div className="stat_content">
              <span className="stat_label">Görüntülenme</span>
              <span className="stat_value">{stats.views}</span>
            </div>
          </div>

          <div className="stat_card" style={{ borderLeftColor: '#4CAF50' }}>
            <div className="stat_icon" style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}>
              <FiLink />
            </div>
            <div className="stat_content">
              <span className="stat_label">Bağlantı</span>
              <span className="stat_value">{stats.connections}</span>
            </div>
          </div>

          <div className="stat_card" style={{ borderLeftColor: '#9C27B0' }}>
            <div className="stat_icon" style={{ backgroundColor: '#F3E5F5', color: '#9C27B0' }}>
              <FiMail />
            </div>
            <div className="stat_content">
              <span className="stat_label">İletişim Talebi</span>
              <span className="stat_value">{stats.contacts}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters_section">
          <div className="filter_group">
            <label>Event Tipi</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter_select"
            >
              <option value="all">Tümü ({stats.total})</option>
              <option value="view">Görüntülenme ({stats.views})</option>
              <option value="connection">Bağlantı ({stats.connections})</option>
              <option value="contact">İletişim Talebi ({stats.contacts})</option>
            </select>
          </div>

          <div className="filter_group">
            <label>Sıralama</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter_select"
            >
              <option value="desc">Yeniden Eskiye</option>
              <option value="asc">Eskiden Yeniye</option>
            </select>
          </div>

          <button className="export_btn" onClick={handleExport}>
            <FiDownload />
            Export
          </button>
        </div>

        {/* Events Timeline */}
        <div className="events_timeline">
          <h6 className="timeline_title">Event Geçmişi ({filteredEvents.length})</h6>
          
          {filteredEvents.length === 0 ? (
            <div className="empty_state">
              <p>Bu filtreye uygun event bulunamadı.</p>
            </div>
          ) : (
            <div className="timeline_list">
              {filteredEvents.map((event, index) => (
                <div key={index} className="timeline_item">
                  <div 
                    className="timeline_marker" 
                    style={{ backgroundColor: getEventColor(event.type) }}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  <div className="timeline_content">
                    <div className="timeline_header">
                      <span className="event_type" style={{ color: getEventColor(event.type) }}>
                        {getEventLabel(event.type)}
                      </span>
                      <span className="event_time">
                        <FiClock /> {formatDate(event.timestamp)}
                      </span>
                    </div>
                    <div className="timeline_details">
                      <div className="detail_row">
                        <FiUser />
                        <span>{event.userName}</span>
                      </div>
                      <div className="detail_row">
                        <FiCreditCard />
                        <span>{event.cardName} - {event.cardType}</span>
                      </div>
                      {event.note && (
                        <div className="detail_note">
                          <p>{event.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EventDetailsOffcanvas;