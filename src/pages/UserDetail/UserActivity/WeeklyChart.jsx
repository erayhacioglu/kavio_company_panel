import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const weeklyData = [
  { name: "Pzt", connections: 4, contacts: 2, views: 6 },
  { name: "Sal", connections: 3, contacts: 1, views: 4 },
  { name: "Çar", connections: 6, contacts: 3, views: 8 },
  { name: "Per", connections: 2, contacts: 4, views: 5 },
  { name: "Cum", connections: 7, contacts: 2, views: 10 },
];

export default function WeeklyChart() {
  return (
    <div className="custom_card">
      <div className="custom_card_header">
        <span className="custom_card_title">Haftalık Etkileşim Özeti</span>
      </div>
      <div className="custom_card_body">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#888"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "#f9fafb" }} />
            <Bar dataKey="connections" fill="#34d399" radius={[4, 4, 0, 0]} />
            <Bar dataKey="contacts" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="views" fill="#f472b6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
