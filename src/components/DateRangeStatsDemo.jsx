import React, { useState } from "react";

/* ===================== */
/* DATE UTILS */
/* ===================== */
const startOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));
const endOfDay = (date) => new Date(date.setHours(23, 59, 59, 999));

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const startOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

/* ===================== */
/* PERIOD HELPERS */
/* ===================== */
const getCurrentPeriodRange = (preset) => {
  const today = new Date();

  switch (preset) {
    case "today":
      return {
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      };

    case "last7days":
      return {
        startDate: startOfDay(addDays(today, -6)),
        endDate: endOfDay(today),
      };

    case "last30days":
      return {
        startDate: startOfDay(addDays(today, -29)),
        endDate: endOfDay(today),
      };

    case "thisMonth":
      return {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };

    case "lastMonth": {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      return {
        startDate: startOfMonth(lastMonth),
        endDate: endOfMonth(lastMonth),
      };
    }

    default:
      return null;
  }
};

/* ===================== */
/* PREVIOUS PERIOD (GÜN SAYISI KADAR GERİ) */
/* ===================== */
const getPreviousPeriodRange = (currentRange) => {
  const diffInMs =
    currentRange.endDate.getTime() -
    currentRange.startDate.getTime();

  const prevEnd = new Date(currentRange.startDate.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - diffInMs);

  return {
    startDate: new Date(prevStart.setHours(0, 0, 0, 0)),
    endDate: new Date(prevEnd.setHours(23, 59, 59, 999)),
  };
};


/* ===================== */
/* MAIN COMPONENT */
/* ===================== */
const DateRangeStatsDemo = () => {
  const [selectedPreset, setSelectedPreset] = useState("today");

  const [dateRange, setDateRange] = useState({
    current: null,
    previous: null,
  });

  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: "",
  });

  /* ===================== */
  /* PRESET CHANGE */
  /* ===================== */
  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);

    if (preset === "custom") {
      setDateRange({ current: null, previous: null });
      return;
    }

    const current = getCurrentPeriodRange(preset);
    if (!current) return;

    const previous = getPreviousPeriodRange(current);

    setDateRange({
      current,
      previous,
    });
  };

  /* ===================== */
  /* CUSTOM APPLY */
  /* ===================== */
  const applyCustomRange = () => {
    if (!customRange.startDate || !customRange.endDate) {
      alert("Lütfen başlangıç ve bitiş tarihi giriniz");
      return;
    }

    const start = startOfDay(new Date(customRange.startDate));
    const end = endOfDay(new Date(customRange.endDate));

    if (start > end) {
      alert("Başlangıç tarihi bitişten büyük olamaz");
      return;
    }

    const current = { startDate: start, endDate: end };
    const previous = getPreviousPeriodRange(current);

    setDateRange({
      current,
      previous,
    });
  };

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h2>📊 Date Range + Önceki Dönem Demo (Preset + Custom)</h2>

      {/* PRESETS */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { value: "today", label: "Bugün" },
          { value: "last7days", label: "Son 7 Gün" },
          { value: "last30days", label: "Son 30 Gün" },
          { value: "thisMonth", label: "Bu Ay" },
          { value: "lastMonth", label: "Geçen Ay" },
          { value: "custom", label: "Özel Aralık" },
        ].map((p) => (
          <button
            key={p.value}
            onClick={() => handlePresetChange(p.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border:
                selectedPreset === p.value
                  ? "2px solid #4f46e5"
                  : "1px solid #ccc",
              background:
                selectedPreset === p.value ? "#eef2ff" : "#fff",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* CUSTOM DATE INPUTS */}
      {selectedPreset === "custom" && (
        <div
          style={{
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <h4>📅 Özel Tarih Aralığı</h4>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <input
              type="date"
              value={customRange.startDate}
              onChange={(e) =>
                setCustomRange({ ...customRange, startDate: e.target.value })
              }
            />
            <span>→</span>
            <input
              type="date"
              value={customRange.endDate}
              onChange={(e) =>
                setCustomRange({ ...customRange, endDate: e.target.value })
              }
            />
            <button onClick={applyCustomRange}>Uygula</button>
          </div>
        </div>
      )}

      {/* RESULT */}
      {dateRange.current && dateRange.previous && (
        <div style={{ marginTop: 32 }}>
          <h3>📌 Aktif Dönem</h3>
          <p>
            {dateRange.current.startDate.toLocaleDateString()} -{" "}
            {dateRange.current.endDate.toLocaleDateString()}
          </p>

          <h3>📌 Önceki Dönem</h3>
          <p>
            {dateRange.previous.startDate.toLocaleDateString()} -{" "}
            {dateRange.previous.endDate.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangeStatsDemo;
