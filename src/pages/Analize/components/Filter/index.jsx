import { useState } from 'react';
import { FiCalendar, FiActivity,FiUsers } from 'react-icons/fi';
import Select from 'react-select';
import './filter.scss';
import customSelectStyles from "../../customSelectStyles";

const Filter = ({ filters, onFiltersChange, groups }) => {
  const [showCustomDate, setShowCustomDate] = useState(false);

  const dateRangePresets = [
    { value: 'today', label: 'Bugün' },
    { value: 'last7days', label: 'Son 7 Gün' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'thisMonth', label: 'Bu Ay' },
    { value: 'lastMonth', label: 'Geçen Ay' },
    { value: 'custom', label: 'Özel Aralık' }
  ];

  const handleDateRangeChange = (value) => {
    onFiltersChange({ ...filters, dateRange: value });
    setShowCustomDate(value === 'custom');
  };

  const handleGroupChange = (selectedOptions) => {
    const groupIds = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
    onFiltersChange({ ...filters, groupIds });
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

  const groupOptions = groups?.map(group => ({
    value: group.id,
    label: group.name
  })) || [];

  const selectedGroups = groupOptions.filter(opt => filters.groupIds.includes(opt.value));

  return (
    <div className="analize_filter">
      {/* Tarih Aralığı */}
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
              placeholder="gg.aa.yyyy"
            />
            <span className="date_separator">-</span>
            <input
              type="date"
              value={filters.customEnd || ''}
              onChange={(e) => handleCustomDateChange('customEnd', e.target.value)}
              className="form_control"
              placeholder="gg.aa.yyyy"
            />
          </div>
        )}
      </div>

      {/* Gruplar */}
      <div className="filter_section">
        <div className="filter_header">
          <FiUsers />
          <span>Gruplar</span>
        </div>
        <Select
          isMulti
          options={groupOptions}
          value={selectedGroups}
          onChange={handleGroupChange}
          placeholder="Gruplar seçin"
          className="react_select_container"
          classNamePrefix="react_select"
          styles={customSelectStyles}
        />
      </div>

      {/* Kullanıcılar */}
      <div className="filter_section">
        <div className="filter_header">
          <FiUsers />
          <span>Kullanıcılar</span>
        </div>
        <Select
          isMulti
          options={groupOptions}
          value={selectedGroups}
          onChange={handleGroupChange}
          placeholder="Kullanıcılar seçin"
          className="react_select_container"
          classNamePrefix="react_select"
          styles={customSelectStyles}
        />
      </div>
    </div>
  );
};

export default Filter;