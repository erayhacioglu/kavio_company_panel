import { Modal } from 'react-bootstrap';
import { FiX, FiEye, FiLink, FiMail, FiUsers, FiTrendingUp } from 'react-icons/fi';
import CountUp from 'react-countup';
import './TopTeamModal.scss';

const TopTeamModal = ({ show, onHide, teamData }) => {
  const stats = [
    {
      icon: FiEye,
      label: 'Görüntülenme',
      value: teamData?.views || 1250,
      iconBg: '#E3F2FD',
      iconColor: '#2196F3'
    },
    {
      icon: FiLink,
      label: 'Bağlantı',
      value: teamData?.connections || 850,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50'
    },
    {
      icon: FiMail,
      label: 'İletişim İsteği',
      value: teamData?.contactRequests || 350,
      iconBg: '#F3E5F5',
      iconColor: '#9C27B0'
    },
    {
      icon: FiUsers,
      label: 'Benzersiz Ziyaretçi',
      value: teamData?.uniqueVisitors || 420,
      iconBg: '#E0F2F1',
      iconColor: '#009688'
    }
  ];

  const totalInteractions = stats.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="top_team_modal">
      <Modal.Header>
        <div className="modal_header_content">
          <div className="modal_header_icon">
            <FiTrendingUp />
          </div>
          <div>
            <h5 className="modal_title">En Aktif Ekip Detayları</h5>
            <p className="modal_subtitle">{teamData?.name || 'Satış Ekibi'}</p>
          </div>
        </div>
        <button className="modal_close_btn" onClick={onHide}>
          <FiX />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="team_stats_summary">
          <div className="summary_card">
            <p className="summary_label">Toplam Etkileşim</p>
            <h3 className="summary_value">
              <CountUp end={totalInteractions} duration={1.2} separator="," />
            </h3>
          </div>
        </div>

        <div className="team_stats_grid">
          {stats.map((stat, index) => (
            <div key={index} className="team_stat_card">
              <div className="team_stat_icon" style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}>
                <stat.icon />
              </div>
              <div className="team_stat_content">
                <p className="team_stat_label">{stat.label}</p>
                <h4 className="team_stat_value">
                  <CountUp end={stat.value} duration={1.2} separator="," />
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="team_info_section">
          <h6 className="info_section_title">Ekip Bilgileri</h6>
          <div className="info_row">
            <span className="info_label">Ekip Adı:</span>
            <span className="info_value">{teamData?.name || 'Satış Ekibi'}</span>
          </div>
          <div className="info_row">
            <span className="info_label">Üye Sayısı:</span>
            <span className="info_value">{teamData?.memberCount || 12} kişi</span>
          </div>
          <div className="info_row">
            <span className="info_label">Ortalama Günlük Etkileşim:</span>
            <span className="info_value">{Math.round(totalInteractions / 30)} etkileşim</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TopTeamModal;