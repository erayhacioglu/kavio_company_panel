import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './DistributionChart.scss';

const DistributionChart = ({ data }) => {
  const chartData = [
    { name: 'Görüntülenme', value: data?.views || 67, color: '#4285F4' },
    { name: 'Bağlantılar', value: data?.connections || 16, color: '#34A853' },
    { name: 'Talepler', value: data?.requests || 7, color: '#9C27B0' },
    { name: 'İndirmeler', value: data?.downloads || 10, color: '#FF6B35' }
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--textColor)"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '0.9375rem', fontWeight: 500 }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom_pie_tooltip">
          <p className="tooltip_label">{payload[0].name}</p>
          <p className="tooltip_value">
            <span className="value_number">{payload[0].value}</span>
            <span className="value_percent">({((payload[0].value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="distribution_chart_card">
      <div className="chart_header">
        <h3 className="chart_title">Etkileşim Dağılımı</h3>
        <p className="chart_subtitle">Etkileşim türlerine göre dağılım</p>
      </div>
      <div className="chart_body">
        <ResponsiveContainer width="100%" aspect={1.2}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionChart;
