import { FiEye, FiLink, FiMail, FiUsers, FiClock, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './statCards.scss';

const StatCards = ({ stats }) => {
  const cards = [
    {
      id: 'totalViews',
      title: 'Toplam Görüntülenme',
      value: stats?.totalViews || 0,
      icon: FiEye,
      iconBg: '#E3F2FD',
      iconColor: '#2196F3',
      change: 12.5,
      changeText: 'son 30 güne göre'
    },
    {
      id: 'totalConnections',
      title: 'Toplam Bağlantı',
      value: stats?.totalConnections || 0,
      icon: FiLink,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50',
      change: 8.3,
      changeText: 'son 30 güne göre'
    },
    {
      id: 'totalContactRequests',
      title: 'İletişim Talebi',
      value: stats?.totalContactRequests || 0,
      icon: FiMail,
      iconBg: '#F3E5F5',
      iconColor: '#9C27B0',
      change: 15.7,
      changeText: 'son 30 güne göre'
    },
    {
      id: 'uniqueVisitors',
      title: 'Benzersiz Ziyaretçi',
      value: stats?.uniqueVisitors || 0,
      icon: FiUsers,
      iconBg: '#E0F2F1',
      iconColor: '#009688',
      change: null,
      changeText: null
    },
    {
      id: 'avgResponseTime',
      title: 'Ort. Yanıt Süresi',
      value: stats?.avgResponseTime || '-',
      icon: FiClock,
      iconBg: '#FFF3E0',
      iconColor: '#FF9800',
      change: null,
      changeText: null,
      isTime: true
    },
    {
      id: 'conversionRate',
      title: 'Dönüşüm Oranı',
      value: stats?.conversionRate || 0,
      icon: FiTrendingUp,
      iconBg: '#E8EAF6',
      iconColor: '#3F51B5',
      change: 3.2,
      changeText: 'son aya göre',
      isPercentage: true
    }
  ];

  return (
    <div className="stat_cards_grid">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="stat_card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="stat_card_icon" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
            <card.icon />
          </div>
          
          <div className="stat_card_content">
            <p className="stat_card_title">{card.title}</p>
            
            <h2 className="stat_card_value">
              {card.isTime ? (
                card.value
              ) : (
                <>
                  <CountUp 
                    end={typeof card.value === 'number' ? card.value : 0} 
                    duration={1.2} 
                    separator={card.isPercentage ? "" : ","} 
                    decimals={0}
                  />
                  {card.isPercentage && '%'}
                </>
              )}
            </h2>
            
            {card.change !== null && (
              <div className="stat_card_change">
                {card.change > 0 ? (
                  <>
                    <FiTrendingUp className="trend_icon trend_up" />
                    <span className="change_value trend_up">{card.change}%</span>
                  </>
                ) : card.change < 0 ? (
                  <>
                    <FiTrendingDown className="trend_icon trend_down" />
                    <span className="change_value trend_down">{Math.abs(card.change)}%</span>
                  </>
                ) : null}
                <span className="change_text">{card.changeText}</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
