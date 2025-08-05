import "./info_card.scss";
import {FaUser} from "react-icons/fa";

const InfoCard = () => {
    return(
        <div className="col-lg-4 col-md-6">
          <div className="info_card_container">
            <div className="info_card">
              <div className="info_card_content">
                <div className="info_card_icon">
                  <FaUser />
                </div>
                <div className="info_card_text">
                  <h3 className="info_number">2.4k</h3>
                  <p className="info_text">Yeni Bağlantı</p>
                </div>
              </div>
            </div>
            <div className="info_card">
              <div className="info_card_content">
                <div className="info_card_icon">
                  <FaUser />
                </div>
                <div className="info_card_text">
                  <h3 className="info_number">2.4k</h3>
                  <p className="info_text">Yeni Bağlantı</p>
                </div>
              </div>
            </div>
            <div className="info_card">
              <div className="info_card_content">
                <div className="info_card_icon">
                  <FaUser />
                </div>
                <div className="info_card_text">
                  <h3 className="info_number">2.4k</h3>
                  <p className="info_text">Yeni Bağlantı</p>
                </div>
              </div>
            </div>
            <div className="info_card">
              <div className="info_card_content">
                <div className="info_card_icon">
                  <FaUser />
                </div>
                <div className="info_card_text">
                  <h3 className="info_number">2.4k</h3>
                  <p className="info_text">Yeni Bağlantı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default InfoCard;