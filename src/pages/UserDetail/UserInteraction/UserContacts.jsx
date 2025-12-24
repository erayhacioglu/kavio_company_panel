import { Link } from "react-router";
import "./user_interaction.scss";
import { Check, X, Ban } from "lucide-react";

const UserContacts = () => {
  return (
    <div className="interaction_container">
      {Array.from({ length: 5 }).map((_, key) => (
        <div className="mini_user_card_container" key={key}>
          <Link to="/" className="mini_user_card">
            <div className="mini_user_card_avatar">
              <img
                src="/src/assets/img/avatar.png"
                alt="Eray Hacıoğlu profil fotoğrafı"
                className="mini_user_card_img"
              />
            </div>

            <div className="mini_user_card_content">
              <h2 className="mini_user_card_fullname">Eray Hacıoğlu</h2>
              <h6 className="mini_user_card_job">Frontend Developer</h6>
            </div>
          </Link>

          <div className="mini_user_card_controls">
            <button className="mini_user_card_btn" title="Onayla">
              <Check size={12} />
            </button>

            <button className="mini_user_card_btn" title="Reddet">
              <X size={12} />
            </button>

            <button className="mini_user_card_btn" title="Engelle">
              <Ban size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserContacts;
