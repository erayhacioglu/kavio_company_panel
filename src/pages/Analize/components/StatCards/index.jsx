import { FiEye, FiLink, FiMail, FiUsers, FiCreditCard, FiTrendingUp, FiTrendingDown, FiAward } from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './statCards.scss';

const StatCards = ({ stats, onTopTeamClick }) => {
  const cards = [
    {
      id: 'topTeam',
      title: 'En Aktif Ekip',
      teamName: stats?.topTeam?.name || 'Satış Ekibi',
      interactions: stats?.topTeam?.interactions || 2450,
      icon: FiAward,
      iconBg: '#FFF9E6',
      iconColor: '#F59E0B',
      isSpecial: true
    },
    {
      id: 'views',
      title: 'Toplam Görüntülenme',
      value: stats?.views || 22,
      icon: FiEye,
      iconBg: '#E3F2FD',
      iconColor: '#2196F3',
      change: -15.4,
      changeText: 'önceki döneme göre'
    },
    {
      id: 'connections',
      title: 'Toplam Bağlantı',
      value: stats?.connections || 20,
      icon: FiLink,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50',
      change: -4.8,
      changeText: 'önceki döneme göre'
    },
    {
      id: 'contactRequests',
      title: 'İletişim İsteği',
      value: stats?.contactRequests || 25,
      icon: FiMail,
      iconBg: '#F3E5F5',
      iconColor: '#9C27B0',
      change: 47.1,
      changeText: 'önceki döneme göre'
    },
    {
      id: 'uniqueVisitors',
      title: 'Benzersiz Ziyaretçi',
      value: stats?.uniqueVisitors || 27,
      icon: FiUsers,
      iconBg: '#E0F2F1',
      iconColor: '#009688',
      change: null,
      changeText: null
    },
    {
      id: 'activeCards',
      title: 'Aktif Kart',
      value: stats?.activeCards || 8,
      icon: FiCreditCard,
      iconBg: '#FCE4EC',
      iconColor: '#E91E63',
      change: null,
      changeText: null
    }
  ];

  return (
    <div className="stat_cards_grid">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`stat_card ${card.isSpecial ? 'stat_card_special' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={card.isSpecial ? onTopTeamClick : undefined}
        >
          <div className="stat_card_icon" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
            <card.icon />
          </div>
          
          <div className="stat_card_content">
            <p className="stat_card_title">{card.title}</p>
            
            {card.isSpecial ? (
              <>
                <h2 className="stat_card_value stat_card_team_name">{card.teamName}</h2>
                <p className="stat_card_interactions">
                  <CountUp end={card.interactions} duration={1.2} separator="," /> etkileşim
                </p>
              </>
            ) : (
              <>
                <h2 className="stat_card_value">
                  <CountUp 
                    end={card.value} 
                    duration={1.2} 
                    separator={card.isPercentage ? "" : ","} 
                    decimals={card.isPercentage ? 2 : 0}
                    decimal="."
                  />
                  {card.isPercentage && '%'}
                </h2>
                
                {card.change !== null && (
                  <div className="stat_card_change">
                    {card.change > 0 ? (
                      <>
                        <FiTrendingUp className="trend_icon trend_up" />
                        <span className="change_value trend_up">{card.change}%</span>
                      </>
                    ) : (
                      <>
                        <FiTrendingDown className="trend_icon trend_down" />
                        <span className="change_value trend_down">{Math.abs(card.change)}%</span>
                      </>
                    )}
                    <span className="change_text">{card.changeText}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;