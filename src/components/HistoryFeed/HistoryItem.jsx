import React, { useState } from "react";
import HistoryIcon from "./HistoryIcon";
import { formatTimeHHmm } from "./date";


export default function HistoryItem({ item }) {
  const [open, setOpen] = useState(false);

  const time = formatTimeHHmm(item.occurredAt);
  const actor = item.actor?.name || "Ziyaretçi";
  const owner = item.cardOwner?.name || "—";

  const renderText = () => {
    switch (item.type) {
      case "PROFILE_VIEW":
        return `${actor} ${owner} kartını görüntüledi`;
      case "SOCIAL_CLICK":
        return `${actor} ${item.target?.platform || "sosyal medya"} bağlantısını tıkladı`;
      case "CONTACT_VIEW":
        return `${actor} iletişim formu gönderdi`;
      case "CONTACT_REQUEST_SENT":
        return `${actor} ${owner} kişisine bağlantı isteği gönderdi`;
      default:
        return "Olay";
    }
  };

  return (
    <div className="history-line">
      <div className="h-time">{time}</div>
      <div className="h-icon"><HistoryIcon type={item.type} platform={item.target?.platform} /></div>
      <div className="h-content">
        <div className="h-text">{renderText()}</div>
        {item.type === "CONTACT_VIEW" && item.meta?.message && (
          <>
            <button className="h-toggle" onClick={() => setOpen(!open)}>
              {open ? "Mesajı Gizle" : "Mesajı Gör"}
            </button>
            {open && (
              <div className="h-msg">
                {item.meta.message}
                {item.meta.email && <div className="h-email">{item.meta.email}</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
