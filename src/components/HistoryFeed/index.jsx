import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistoryFeed } from "../../hooks/useHistoryFeed";
import { formatDayLabel, isSameDay } from "./date";
import FilterBar from "./FilterBar";
import HistoryItem from "./HistoryItem";
import "./history_feed.scss";
import { fetchHistory } from "../../services/history";

export default function HistoryFeed() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchHistory().then((res) => setData(res.items));
  }, []);

  const grouped = useMemo(() => {
    const result = [];
    let prev = null;
    for (const it of data) {
      if (!prev || !isSameDay(it.occurredAt, prev.occurredAt)) {
        result.push({
          type: "day",
          label: formatDayLabel(it.occurredAt),
          id: `d-${it.id}`,
        });
      }
      result.push(it);
      prev = it;
    }
    return result;
  }, [data]);

  return (
    <div className="history-box">
      <div className="history-header">History</div>
      <div className="history-body">
        {grouped.map((row) =>
          row.type === "day" ? (
            <div key={row.id} className="day-label">
              {row.label}
            </div>
          ) : (
            <HistoryItem key={row.id} item={row} />
          )
        )}
      </div>
    </div>
  );
}
