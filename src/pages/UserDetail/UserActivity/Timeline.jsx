import React, { useState } from "react";
import "./Timeline.scss";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Eye, MapPin, Clock, Share2 } from "lucide-react";

export default function Timeline({ data = [], filter }) {
  const [selected, setSelected] = useState(null);
  const filtered =
    filter === "all" ? data : data.filter((d) => d.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case "connection":
        return <UserPlus size={18} />;
      case "contact":
        return <Mail size={18} />;
      case "view":
      default:
        return <Eye size={18} />;
    }
  };

  return (
    <>
      <div className={`timeline ${filtered.length > 0 ? "has-data" : ""}`}>
        {filtered.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="timeline-item"
            onClick={() => setSelected(item)}
          >
            <div className="timeline-icon">{getIcon(item.type)}</div>

            <div className="timeline-content">
              <div className="timeline-title">
                <h3>{item.title}</h3>
                <span className="timeline-date">
                  <Clock size={14} /> {item.date}
                </span>
              </div>

              <p dangerouslySetInnerHTML={{ __html: item.desc }} />
              <div className="timeline-meta">
                <span>
                  <MapPin size={13} /> {item.location}
                </span>
                <span>
                  <Share2 size={13} /> {item.channel}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="no-data">Filtreye uygun veri bulunamadı.</p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="activity-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="activity-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="activity-modal-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              <div className="activity-modal-header">
                <img src={selected.avatar} alt="avatar" />
                <div>
                  <h3>{selected.title}</h3>
                  <p>{selected.date}</p>
                </div>
              </div>

              <p
                className="activity-modal-desc"
                dangerouslySetInnerHTML={{ __html: selected.desc }}
              />
              <div className="activity-modal-details">{selected.details}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
