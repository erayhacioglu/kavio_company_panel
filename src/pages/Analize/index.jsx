import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { mockData } from "./mockData";
import MetricCard from "./components/MetricCards/MetricCard";
import SmartChart from "./components/Charts/SmartChart";
import AnalyticsMap from "./components/Map/AnalyticsMap";
import DateRangeFilter from "./components/Filters/DateRangeFilter";
import "./Analize.scss";
import BreadCrumb from "../../components/BreadCrumb";

// ... import'lar aynı
export default function Analize() {
  const [filters, setFilters] = useState({ company: "", city: "", device: "", platform: "" });
  const [selectedMetrics, setSelectedMetrics] = useState(["interactions"]);
  const [dateMode, setDateMode] = useState("yearly");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filtered = useMemo(() => {
    const base = mockData.filter(
      (item) =>
        (!filters.company || item.company === filters.company) &&
        (!filters.city || item.city === filters.city) &&
        (!filters.device || item.device === filters.device) &&
        (!filters.platform || item.platform === filters.platform)
    );

    const now = new Date();

    if (dateMode === "weekly") {
      const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7);
      return base.filter((d) => {
        const dt = new Date(d.date);
        return dt >= weekAgo && dt <= now;
      });
    }

    if (dateMode === "yearly") {
      const yearAgo = new Date(); yearAgo.setFullYear(now.getFullYear() - 1);
      return base.filter((d) => {
        const dt = new Date(d.date);
        return dt >= yearAgo && dt <= now;
      });
    }

    if (dateMode === "custom") {
      return base.filter((d) => {
        const dt = new Date(d.date);
        return (!startDate || dt >= startDate) && (!endDate || dt <= endDate);
      });
    }

    return base;
  }, [filters, dateMode, startDate, endDate]);

  // Diğer metrikleri türet
  const enriched = useMemo(() => {
    return filtered.map((d) => ({
      ...d,
      saveContacts: Math.round(d.interactions * 0.49),
      exchangeContacts: Math.round(d.interactions * 0.25),
      linkClicks: Math.round(d.interactions * 0.43),
    }));
  }, [filtered]);

  // ✅ Tarihe göre DINAMIK gruplanmış chart datası
  const groupedData = useMemo(() => {
    // key ve timestamp'i birlikte tutalım ki kronolojik sıralayabilelim
    const buckets = new Map();

    for (const d of enriched) {
      const dt = new Date(d.date);
      let key = "";
      let ts = 0;

      if (dateMode === "yearly") {
        // Ay bazlı (YYYY-MM)
        const y = dt.getFullYear();
        const m = dt.getMonth(); // 0-11
        key = `${y}-${String(m + 1).padStart(2, "0")}`;
        ts = new Date(y, m, 1).getTime();
      } else if (dateMode === "weekly") {
        // Gün bazlı (YYYY-MM-DD)
        key = dt.toISOString().slice(0, 10);
        ts = new Date(key + "T00:00:00").getTime();
      } else if (dateMode === "custom") {
        // Gün bazlı (YYYY-MM-DD)
        key = dt.toISOString().slice(0, 10);
        ts = new Date(key + "T00:00:00").getTime();
      } else {
        // varsayılan: gün
        key = dt.toISOString().slice(0, 10);
        ts = new Date(key + "T00:00:00").getTime();
      }

      if (!buckets.has(key)) {
        buckets.set(key, {
          name:
            dateMode === "yearly"
              ? dt.toLocaleString("tr-TR", { month: "short", year: "numeric" })
              : dt.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
          ts,
          interactions: 0,
          saveContacts: 0,
          exchangeContacts: 0,
          linkClicks: 0,
        });
      }

      const b = buckets.get(key);
      b.interactions += d.interactions || 0;
      b.saveContacts += d.saveContacts || 0;
      b.exchangeContacts += d.exchangeContacts || 0;
      b.linkClicks += d.linkClicks || 0;
    }

    // kronolojik sırala
    const arr = Array.from(buckets.values()).sort((a, b) => a.ts - b.ts);
    // sadece seçili metrikleri göstermek için istersen burada filtreleyebilirsin
    return arr;
  }, [enriched, dateMode]);

  const METRICS = [
    { key: "interactions", label: "Interactions" },
    { key: "saveContacts", label: "Save Contacts" },
    { key: "exchangeContacts", label: "Exchange Contacts" },
    { key: "linkClicks", label: "Link Clicks" },
  ];

  const handleMetricClick = (key) => {
    setSelectedMetrics((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <BreadCrumb pageTitle="Analiz" />
      </motion.div>

      <div className="top-filters">
        <DateRangeFilter
          mode={dateMode}
          setMode={setDateMode}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <div className="row">
          {["company", "city", "device", "platform"].map((key) => (
            <div className="col-lg-3 col-md-6" key={key}>
              <div className="form_group m-0">
                <select
                  value={filters[key]}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="form_control"
                >
                  <option value="">All {key}</option>
                  {[...new Set(mockData.map((item) => item[key]))].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="metric-grid">
        {METRICS.map((m) => (
          <MetricCard
            key={m.key}
            label={m.label}
            value={enriched.reduce((sum, d) => sum + (d[m.key] ?? 0), 0)}
            active={selectedMetrics.includes(m.key)}
            onClick={() => handleMetricClick(m.key)}
          />
        ))}
      </div>

      {/* ✅ Chart artık dateMode'a göre gruplanmış datayı alıyor */}
      <SmartChart data={groupedData} selected={selectedMetrics} />

      {/* ✅ Map seçili ilk metriğe göre heat/popup hesaplıyor */}
      <AnalyticsMap rows={enriched} metric={selectedMetrics[0]} />
    </div>
  );
}

