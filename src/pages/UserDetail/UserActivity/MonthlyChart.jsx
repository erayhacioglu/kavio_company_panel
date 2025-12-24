import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export default function MonthlyChart({ className, data }) {
  // Backend verisini Recharts formatına dönüştürme
  const formattedData = data?.map((item) => {
    const monthIndex = new Date(item.month).getMonth(); // 10 → Kasım
    const interactions =
      (item.viewCount || 0) +
      (item.downloadCount || 0) +
      (item.contactCount || 0) +
      (item.connectionCount || 0);

    return {
      name: monthNames[monthIndex],
      interactions,
    };
  });

  return (
    <div className={`custom_card ${className}`}>
      <div className="custom_card_header">
        <span className="custom_card_title">Aylık Etkileşim Trendi</span>
      </div>
      <div className="custom_card_body">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="var(--textColor)" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="interactions"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5, fill: "#6366f1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
