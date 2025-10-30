import "./MetricCard.scss";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function MetricCard({ label, value, active, onClick }) {
  return (
    <motion.div
      className={`metric-card ${active ? "active" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="metric-label">{label}</p>
      <h2 className="metric-value">
        <CountUp end={value} duration={1.2} separator="," />
      </h2>
    </motion.div>
  );
}
