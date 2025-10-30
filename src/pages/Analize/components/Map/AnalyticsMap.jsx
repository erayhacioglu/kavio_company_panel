import React, { useEffect, useRef } from "react";
import "./AnalyticsMap.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AnalyticsMap({ rows = [], metric = "interactions" }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markers = useRef(null);
  const heat = useRef(null);
  const heatLoaded = useRef(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!heatLoaded.current) {
        try {
          await import("leaflet.heat");
          heatLoaded.current = true;
        } catch (e) {
          console.error("leaflet.heat yüklenemedi:", e);
        }
      }

      if (!mapRef.current && containerRef.current) {
        mapRef.current = L.map(containerRef.current, {
          center: [39, 35],
          zoom: 6,
          scrollWheelZoom: false,
        });

        L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a>',
}).addTo(mapRef.current);

      }

      if (!mounted || !mapRef.current) return;

      if (markers.current) markers.current.clearLayers();
      else markers.current = L.layerGroup().addTo(mapRef.current);

      if (heat.current) {
        heat.current.remove();
        heat.current = null;
      }

      if (heatLoaded.current && rows.length) {
        const heatPoints = rows.map((r) => [r.lat, r.lng, Math.max(0.3, (r[metric] ?? 0) / 1000)]);
        heat.current = L.heatLayer(heatPoints, { radius: 25, blur: 18 }).addTo(mapRef.current);
      }

      rows.forEach((r) => {
        const marker = L.marker([r.lat, r.lng]);
        marker.bindPopup(
          `<div class="popup-card">
            <h3>${r.city}</h3>
            <p><b>Company:</b> ${r.company}</p>
            <p><b>Platform:</b> ${r.platform}</p>
            <p><b>Device:</b> ${r.device}</p>
            <div class="popup-metric">
              <span>${metric}:</span> <strong>${r[metric] ?? 0}</strong>
            </div>
          </div>`
        );
        marker.addTo(markers.current);
      });

      if (rows.length) {
        const bounds = rows.map((r) => [r.lat, r.lng]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [rows, metric]);

  return (
    <div className="custom_card mt-4">
      <div className="custom_card_header">
        <span className="custom_card_title">Lokasyon</span>
      </div>
      <div className="custom_card_body">
        <div ref={containerRef} className="map-container" />
      </div>
    </div>
  );
}
