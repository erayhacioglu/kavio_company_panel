import React, { useEffect, useState } from "react";

// Basit bir filtre bar: Kart seç, event tipi çoklu seç, tarih aralığı
// Not: Kart listesini props'tan alır; yoksa kendi fetch eder (/api/cards)
export default function FilterBar({ value, onChange, cards: cardsProp }) {
  const [cards, setCards] = useState(cardsProp || []);

  useEffect(() => {
    if (cardsProp && cardsProp.length) return;
    // basit kart fetch (opsiyonel)
    fetch("/api/cards?scope=company", { credentials: "include" })
      .then(r => r.ok ? r.json() : Promise.resolve({ items: [] }))
      .then(d => setCards(d.items || []))
      .catch(() => setCards([]));
  }, [cardsProp]);

  const handle = (patch) => onChange({ ...value, ...patch });

  const eventTypeOptions = [
    { v: "PROFILE_VIEW", label: "Profil" },
    { v: "SOCIAL_CLICK", label: "Sosyal" },
    { v: "CONTACT_VIEW", label: "İletişim Mesajı" },
    { v: "CONTACT_REQUEST_SENT", label: "Bağlantı İsteği" },
  ];

  const toggleType = (t) => {
    const set = new Set(value.eventTypes || []);
    if (set.has(t)) set.delete(t); else set.add(t);
    handle({ eventTypes: Array.from(set) });
  };

  return (
    <div className="history-filter">
      <div className="f-group">
        <label>Kart</label>
        <select
          value={value.cardId || ""}
          onChange={(e) => handle({ cardId: e.target.value || undefined })}
        >
          <option value="">Hepsi</option>
          {cards.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="f-group">
        <label>Etkinlik Türü</label>
        <div className="type-chips">
          {eventTypeOptions.map(o => {
            const active = (value.eventTypes || []).includes(o.v);
            return (
              <button
                key={o.v}
                type="button"
                className={`chip ${active ? "active" : ""}`}
                onClick={() => toggleType(o.v)}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="f-group">
        <label>Tarih</label>
        <div className="dates">
          <input
            type="date"
            value={value.dateFrom || ""}
            onChange={(e) => handle({ dateFrom: e.target.value || undefined })}
          />
          <span>—</span>
          <input
            type="date"
            value={value.dateTo || ""}
            onChange={(e) => handle({ dateTo: e.target.value || undefined })}
          />
        </div>
      </div>
    </div>
  );
}
