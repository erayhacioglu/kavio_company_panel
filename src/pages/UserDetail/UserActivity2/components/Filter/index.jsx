import { useState } from 'react';
import { FiCalendar, FiActivity } from 'react-icons/fi';
import './filter.scss';

const Filter = ({ filters, onFiltersChange }) => {
  const [showCustomDate, setShowCustomDate] = useState(false);

  const dateRangePresets = [
    { value: 'today', label: 'Bugün' },
    { value: 'last7days', label: 'Son 7 Gün' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'thisMonth', label: 'Bu Ay' },
    { value: 'lastMonth', label: 'Geçen Ay' },
    { value: 'custom', label: 'Özel Aralık' }
  ];

  const eventTypes = [
    { value: 'view', label: 'Görüntülenme', color: '#2196F3' },
    { value: 'connection', label: 'Bağlantı', color: '#4CAF50' },
    { value: 'contact', label: 'İletişim', color: '#9C27B0' }
  ];

  const handleDateRangeChange = (value) => {
    onFiltersChange({ ...filters, dateRange: value });
    setShowCustomDate(value === 'custom');
  };

  const handleEventTypeToggle = (type) => {
    const newEventTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter(t => t !== type)
      : [...filters.eventTypes, type];
    onFiltersChange({ ...filters, eventTypes: newEventTypes });
  };

  const handleCustomDateChange = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <div className="analize_filter">
      <div className="filter_section">
        <div className="filter_header">
          <FiCalendar />
          <span>Tarih Aralığı</span>
        </div>
        <div className="filter_buttons">
          {dateRangePresets.map(preset => (
            <button
              key={preset.value}
              className={`filter_btn ${filters.dateRange === preset.value ? 'active' : ''}`}
              onClick={() => handleDateRangeChange(preset.value)}
            >
              {preset.label}
            </button>
          ))}
        </div>
        {showCustomDate && (
          <div className="custom_date_inputs form_group">
            <input
              type="date"
              value={filters.customStart || ''}
              onChange={(e) => handleCustomDateChange('customStart', e.target.value)}
              className="form_control"
            />
            <span className="date_separator">-</span>
            <input
              type="date"
              value={filters.customEnd || ''}
              onChange={(e) => handleCustomDateChange('customEnd', e.target.value)}
              className="form_control"
            />
          </div>
        )}
      </div>

      <div className="filter_section">
        <div className="filter_header">
          <FiActivity />
          <span>Etkileşim Türleri</span>
        </div>
        <div className="event_type_filters">
          {eventTypes.map(type => (
            <button
              key={type.value}
              className={`event_type_btn ${filters.eventTypes.includes(type.value) ? 'active' : ''}`}
              onClick={() => handleEventTypeToggle(type.value)}
              style={{ '--event-color': type.color }}
            >
              <span className="event_type_indicator"></span>
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
