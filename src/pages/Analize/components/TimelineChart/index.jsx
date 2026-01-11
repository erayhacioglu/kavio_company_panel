// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './TimelineChart.scss';

// const TimelineChart = ({ data }) => {
//   // Custom Tooltip
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom_tooltip">
//           <p className="tooltip_label">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="tooltip_item" style={{ color: entry.color }}>
//               {entry.name}: <strong>{entry.value}</strong>
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="timeline_chart_card">
//       <div className="chart_header">
//         <h3 className="chart_title">Zaman Çizelgesi</h3>
//       </div>
//       <div className="chart_body">
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             data={data}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid 
//               strokeDasharray="3 3" 
//               stroke="var(--borderColor)"
//               opacity={0.5}
//             />
//             <XAxis 
//               dataKey="date" 
//               stroke="var(--subTextColor)"
//               style={{ fontSize: '0.875rem' }}
//             />
//             <YAxis 
//               stroke="var(--subTextColor)"
//               style={{ fontSize: '0.875rem' }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend 
//               wrapperStyle={{ 
//                 fontSize: '0.875rem',
//                 paddingTop: '20px'
//               }}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="views" 
//               stroke="#2196F3" 
//               strokeWidth={2.5}
//               name="Görüntülenme"
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="connections" 
//               stroke="#4CAF50" 
//               strokeWidth={2.5}
//               name="Bağlantılar"
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="requests" 
//               stroke="#9C27B0" 
//               strokeWidth={2.5}
//               name="Talepler"
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default TimelineChart;





import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './TimelineChart.scss';

const TimelineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom_tooltip">
          <p className="tooltip_label">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="tooltip_item"
              style={{ color: entry.color }}
            >
              {entry.name}: <strong>{entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="timeline_chart_card">
      <div className="chart_header">
        <h3 className="chart_title">Zaman Çizelgesi</h3>
      </div>

      <div className="chart_body">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--borderColor)"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              stroke="var(--subTextColor)"
              style={{ fontSize: '0.875rem' }}
            />
            <YAxis
              stroke="var(--subTextColor)"
              style={{ fontSize: '0.875rem' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: '0.875rem',
                paddingTop: '20px',
              }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#2196F3"
              strokeWidth={2.5}
              name="Görüntülenme"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="connections"
              stroke="#4CAF50"
              strokeWidth={2.5}
              name="Bağlantılar"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#9C27B0"
              strokeWidth={2.5}
              name="Talepler"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimelineChart;
