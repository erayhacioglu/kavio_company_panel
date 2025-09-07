import { Cable, CircleUser, Image, UserPen } from "lucide-react";
import "./permissions.scss";
import SwitchCheckbox from "../../../components/SwitchCheckbox";
import { useState } from "react";

const Permissions = () => {
  const [editablePhoto, setEditablePhoto] = useState(false);
  return (
    <div className="permission_card">
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <Image size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Profil Görseli Düzenleme Yetkisi
            <span className="permission_badge badge_primary">Pro</span>
          </h3>
          <p className="permission_card_text">
            Karttaki profil görselinin kullanıcı tarafından güncellenebilmesine
            dair yetki.
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            checked={editablePhoto}
            onChange={setEditablePhoto}
            id="editable-photo"
          />
        </div>
      </div>
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <UserPen size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Kullanıcı Bilgilerini Düzenleme Yetkisi
          </h3>
          <p className="permission_card_text">
            Çalışanların şirket panelinden kendi profil alanlarını
            güncelleyebilmesine yönelik yetki.
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            checked={editablePhoto}
            onChange={setEditablePhoto}
            id="editable-photo"
          />
        </div>
      </div>
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <Cable size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Kullanıcıların Bağlantı Yetkisi
          </h3>
          <p className="permission_card_text">
            Kullanıcıların başka kullanıcıları bağlantı ekleyebilmesine dair
            yetki
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            checked={editablePhoto}
            onChange={setEditablePhoto}
            id="editable-photo"
          />
        </div>
      </div>
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <CircleUser size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Şirket Profili Görünürlüğü Yekisi
          </h3>
          <p className="permission_card_text">
            Kullanıcı kartında şirket bilgilerin görüntülenmesine ilişkin yetki
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            checked={editablePhoto}
            onChange={setEditablePhoto}
            id="editable-photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Permissions;
