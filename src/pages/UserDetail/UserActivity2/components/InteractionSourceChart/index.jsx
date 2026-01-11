import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './InteractionSourceChart.scss';

const InteractionSourceChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percent = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div className="custom_source_tooltip">
          <p className="tooltip_label">{payload[0].name}</p>
          <p className="tooltip_value">
            <span className="value_number">{payload[0].value}</span>
            <span className="value_percent">({percent}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="interaction_source_card">
      <div className="chart_header">
        <h3 className="chart_title">Etkileşim Kaynağı</h3>
        <p className="chart_subtitle">Ziyaretçilerin geldiği kanallar</p>
      </div>
      <div className="chart_body">
        <ResponsiveContainer width="100%" aspect={1.2}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '0.875rem' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InteractionSourceChart;
