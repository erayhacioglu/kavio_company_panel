import React from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  interactions: "#3b82f6",
  saveContacts: "#10b981",
  exchangeContacts: "#f59e0b",
  linkClicks: "#ef4444",
};

// ✅ Framer Motion animated tooltip
function AnimatedTooltip({ active, payload, label }) {
  return (
    <AnimatePresence>
      {active && payload && payload.length ? (
        <motion.div
          key="tooltip"
          className="chart-tooltip"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{
            background: "#111827",
            color: "#fff",
            padding: "10px 12px",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
          {payload.map((p) => (
            <div key={p.dataKey} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  width: 10, height: 10, borderRadius: "50%", background: p.color || "#94a3b8",
                }}
              />
              <span style={{ opacity: 0.9 }}>{p.name}</span>
              <span style={{ marginLeft: "auto", fontWeight: 700 }}>{p.value}</span>
            </div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function SmartChart({ data, selected }) {
  const type = selected.length >= 3 ? "bar" : selected.length === 2 ? "area" : "line";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type + selected.join(",")}
        className="custom_card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="custom_card_header">
          <span className="custom_card_title">Grafik</span>
        </div>
        <div className="custom_card_body">
          <ResponsiveContainer width="100%" aspect={2.2}>
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<AnimatedTooltip />} />
                <Legend />
                {selected.map((k) => (
                  <Bar key={k} dataKey={k} name={k} stackId="a" fill={COLORS[k]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            ) : type === "area" ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<AnimatedTooltip />} />
                <Legend />
                {selected.map((k) => (
                  <Area key={k} type="monotoneX" dataKey={k} name={k} stroke={COLORS[k]} fill={COLORS[k]} fillOpacity={0.25} />
                ))}
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<AnimatedTooltip />} />
                <Legend />
                {selected.map((k) => (
                  <Line key={k} type="monotoneX" dataKey={k} name={k} stroke={COLORS[k]} strokeWidth={3} dot={false} />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
