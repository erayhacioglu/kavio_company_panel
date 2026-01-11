import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FiX, FiChevronDown, FiChevronUp, FiEye, FiLink, FiMail, FiAward } from 'react-icons/fi';
import './AllCardsModal.scss';

const AllCardsModal = ({ show, onHide, cards }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const getPerformanceBadge = (interactions) => {
    if (interactions >= 33) return { label: 'Yüksek', class: 'badge_high' };
    if (interactions >= 25) return { label: 'Orta', class: 'badge_medium' };
    return { label: 'Düşük', class: 'badge_low' };
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="all_cards_modal">
      <Modal.Header>
        <div className="modal_header_content">
          <div className="modal_header_icon">
            <FiAward />
          </div>
          <div>
            <h5 className="modal_title">Tüm Performans Kartları</h5>
            <p className="modal_subtitle">En yüksek etkileşimli kartlar</p>
          </div>
        </div>
        <button className="modal_close_btn" onClick={onHide}>
          <FiX />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_cards_list">
          {cards.map((card, index) => {
            const badge = getPerformanceBadge(card.totalInteractions);
            const isExpanded = expandedCard === index;
            return (
              <div key={index} className="modal_performance_card_item">
                <div className="card_main" onClick={() => toggleCard(index)}>
                  <div className="card_left">
                    <div className="rank_number">{index + 1}</div>
                    <div className="card_info">
                      <h4 className="card_name">{card.name}</h4>
                      <div className="card_meta">
                        <span className="card_type">{card.cardType}</span>
                        <span className="card_interactions">{card.totalInteractions} etkileşim</span>
                      </div>
                    </div>
                  </div>
                  <div className="card_right">
                    <span className={`performance_badge ${badge.class}`}>
                      {badge.label}
                    </span>
                    <div className={`chevron_icon ${isExpanded ? 'expanded' : ''}`}>
                      {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                </div>

                <div className={`card_details ${isExpanded ? 'expanded' : ''}`}>
                  <div className="details_grid">
                    <div className="detail_item">
                      <div className="detail_icon_wrapper" style={{ backgroundColor: '#E3F2FD' }}>
                        <FiEye className="detail_icon" style={{ color: '#2196F3' }} />
                      </div>
                      <div className="detail_content">
                        <span className="detail_label">Görüntülenme</span>
                        <span className="detail_value">{card.views}</span>
                      </div>
                    </div>
                    <div className="detail_item">
                      <div className="detail_icon_wrapper" style={{ backgroundColor: '#E8F5E9' }}>
                        <FiLink className="detail_icon" style={{ color: '#4CAF50' }} />
                      </div>
                      <div className="detail_content">
                        <span className="detail_label">Bağlantı</span>
                        <span className="detail_value">{card.connections}</span>
                      </div>
                    </div>
                    <div className="detail_item">
                      <div className="detail_icon_wrapper" style={{ backgroundColor: '#F3E5F5' }}>
                        <FiMail className="detail_icon" style={{ color: '#9C27B0' }} />
                      </div>
                      <div className="detail_content">
                        <span className="detail_label">İletişim Talebi</span>
                        <span className="detail_value">{card.contactRequests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AllCardsModal;