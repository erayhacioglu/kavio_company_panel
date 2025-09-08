import { Cable, CircleUser, Image, UserPen } from "lucide-react";
import "./permissions.scss";
import SwitchCheckbox from "../../../components/SwitchCheckbox";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";
import Axios from "../../../services/Axios";

const Permissions = () => {
  const { user } = useSelector((state) => state.user);

  const initial = useMemo(
    () => ({
      editablePhoto: !!(user && user.company && user.company.editablePhoto),
      editableUser: !!(user && user.company && user.company.editableUser),
      companyProfileView: !!(
        user &&
        user.company &&
        user.company.companyProfileView
      ),
      showConnect: !!(user && user.company && user.company.showConnect),
    }),
    [user]
  );

  const [permissions, setPermissions] = useState(initial);

  const [loading, setLoading] = useState(false);

  const ENDPOINTS = {
    editablePhoto: `/admin/${user?.company?.id}/editable-photo`,
    editableUser: `/admin/${user?.company?.id}/editable-user`,
    companyProfileView: `/admin/${user?.company?.id}/company-profile-view`,
    showConnect: `/admin/${user?.company?.id}/show-connect`,
  };

  const handleToggle = async (key, checked) => {
    if (!ENDPOINTS[key]) return;

    const prevVal = permissions[key];

    setPermissions((p) => ({ ...p, [key]: checked }));
    setLoading(true);

    try {
      const res = await Axios.put(ENDPOINTS[key]);
      if (res?.status === 200) {
        toast.success(res?.data);
      }
    } catch (err) {
      setPermissions((p) => ({ ...p, [key]: prevVal }));
      const msg =
        (err &&
          err.response &&
          err.response.data &&
          err.response.data.message) ||
        (err && err.message) ||
        "Güncelleme sırasında bir hata oluştu";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="permission_card">
      {/* 1) Profil görseli */}
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
            id="editable-photo"
            checked={permissions.editablePhoto}
            onChange={(e) => handleToggle("editablePhoto", e.target.checked)}
          />
        </div>
      </div>

      {/* 2) Kullanıcı bilgilerini düzenleme */}
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
            id="editable-user-info"
            checked={permissions.editableUser}
            onChange={(e) => handleToggle("editableUser", e.target.checked)}
          />
        </div>
      </div>

      {/* 3) Bağlantı yetkisi */}
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <Cable size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Kullanıcıların Bağlantı Yetkisi
          </h3>
          <p className="permission_card_text">
            Kullanıcıların başka kullanıcıları bağlantı olarak ekleyebilmesine
            dair yetki.
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            id="can-link-users"
            checked={permissions.showConnect}
            onChange={(e) => handleToggle("showConnect", e.target.checked)}
          />
        </div>
      </div>

      {/* 4) Şirket profili görünürlüğü */}
      <div className="permission_card_item">
        <div className="permission_card_icon">
          <CircleUser size={20} />
        </div>
        <div className="permission_card_content">
          <h3 className="permission_card_title">
            Şirket Profili Görünürlüğü Yetkisi
          </h3>
          <p className="permission_card_text">
            Kullanıcı kartında şirket bilgilerinin görüntülenmesine ilişkin
            yetki.
          </p>
        </div>
        <div className="permission_card_action">
          <SwitchCheckbox
            size="md"
            id="show-company-profile"
            checked={permissions.companyProfileView}
            onChange={(e) =>
              handleToggle("companyProfileView", e.target.checked)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Permissions;
