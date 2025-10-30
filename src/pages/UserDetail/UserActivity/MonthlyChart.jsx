import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const monthlyData = [
  { name: "Oca", interactions: 140 },
  { name: "Şub", interactions: 180 },
  { name: "Mar", interactions: 210 },
  { name: "Nis", interactions: 260 },
  { name: "May", interactions: 240 },
  { name: "Haz", interactions: 280 },
];

export default function MonthlyChart({className}) {
  return (
    <div className={`custom_card ${className}`}>
      <div className="custom_card_header">
        <span className="custom_card_title">Aylık Etkileşim Trendi</span>
      </div>
      <div className="custom_card_body">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#999" />
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
