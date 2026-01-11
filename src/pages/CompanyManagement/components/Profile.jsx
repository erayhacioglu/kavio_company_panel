import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Image, Plus, Trash2 } from "lucide-react";
import { linkData } from "../../../helpers";
import Axios from "../../../services/Axios";
import PageLoader from "../../../components/PageLoader";

const Profile = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  const [profileImg, setProfileImg] = useState("");
  const [profileImgLoading, setProfileImgLoading] = useState(false);
  const [updateProfileImgLoading, setUpdateProfileImgLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    userInfo: {
      firstName: "",
      lastName: "",
      bio: "",
    },
    links: [],
    contactInfos: [],
  });

  const validateForm = () => {
    if (!profileData?.userInfo?.firstName?.trim()) {
      toast.error("Ad alanı boş bırakılamaz");
      return false;
    }
    if (!profileData?.userInfo?.lastName?.trim()) {
      toast.error("Soyad alanı boş bırakılamaz");
      return false;
    }

    // Boş contact info kontrolü
    const emptyContacts = profileData?.contactInfos?.filter(
      (item) => !item?.value?.trim()
    );
    if (emptyContacts?.length > 0) {
      toast.error("Lütfen boş iletişim bilgilerini doldurun veya silin");
      return false;
    }

    // Boş link kontrolü
    const emptyLinks = profileData?.links?.filter((item) => !item?.value?.trim());
    if (emptyLinks?.length > 0) {
      toast.error("Lütfen boş linkleri doldurun veya silin");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setProfileUpdateLoading(true);
    try {
      const res = await Axios.post(
        `/company-management/update-personel-information`,
        profileData
      );
      if (res?.status === 200) {
        toast.success("Profil bilgileri başarıyla güncellendi");
        getProfileData();
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Profil güncellenirken bir hata oluştu");
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const getProfileData = async () => {
    setProfileLoading(true);
    try {
      const res = await Axios.get(`/company-management/get-profile`);
      if (res?.status === 200) {
        setProfileData(res?.data);
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Profil bilgileri yüklenirken bir hata oluştu");
    } finally {
      setProfileLoading(false);
    }
  };

  const getProfileImg = async () => {
    setProfileImgLoading(true);
    try {
      const res = await Axios.get(`/company-management/get-profile-image`);
      if (res?.status === 200) {
        setProfileImg(res?.data?.profileImg);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setProfileImgLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
    getProfileImg();
  }, []);

  const handleUpdateProfileImg = async () => {
    if (!profileImg?.name) return;
    
    // File size kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (profileImg.size > maxSize) {
      toast.error("Resim boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    setUpdateProfileImgLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", profileImg);
      const res = await Axios.post(
        "/company-management/update-profile-img",
        formData
      );
      if (res?.status === 200) {
        toast.success("Profil resmi başarıyla güncellendi");
        getProfileImg();
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Profil resmi güncellenirken bir hata oluştu");
    } finally {
      setUpdateProfileImgLoading(false);
    }
  };

  const generateProfileImg = () => {
    if (profileImgLoading) return "https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-1.png";
    if (profileImg) {
      if (profileImg?.name) {
        return URL.createObjectURL(profileImg);
      } else {
        return profileImg;
      }
    } else {
      return "https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-1.png";
    }
  };

  const handleChangeProfileImg = (e) => {
    const uploadedImg = e.target.files[0];
    if (!uploadedImg) return;

    const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if (!validTypes.includes(uploadedImg?.type)) {
      toast.error("Geçersiz resim formatı. PNG, JPG veya WEBP formatında olmalıdır");
      return;
    }

    // File size kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (uploadedImg.size > maxSize) {
      toast.error("Resim boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    setProfileImg(uploadedImg);
  };

  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [name]: value,
      },
    }));
  };

  const handleContactChange = (index, field, value) => {
    setProfileData((prev) => {
      const updatedContacts = [...prev.contactInfos];
      updatedContacts[index][field] = value;
      return {
        ...prev,
        contactInfos: updatedContacts,
      };
    });
  };

  const addContactInfo = (contactType) => {
    // Boş alan kontrolü
    const emptyContacts = profileData?.contactInfos?.filter(
      (item) => !item?.value?.trim()
    );
    if (emptyContacts?.length > 0) {
      toast.error("Lütfen mevcut boş iletişim bilgisini doldurun veya silin");
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      contactInfos: [
        ...prev.contactInfos,
        {
          contactType,
          value: "",
        },
      ],
    }));
  };

  const removeContactInfo = (index) => {
    setProfileData((prev) => {
      const updatedContacts = prev.contactInfos
        .filter((_, i) => i !== index)
        .map((item, idx) => ({ ...item, position: idx + 1 }));
      return {
        ...prev,
        contactInfos: updatedContacts,
      };
    });
  };

  const addLink = () => {
    // Boş alan kontrolü
    const emptyLinks = profileData?.links?.filter((item) => !item?.value?.trim());
    if (emptyLinks?.length > 0) {
      toast.error("Lütfen mevcut boş linki doldurun veya silin");
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      links: [
        ...prev.links,
        {
          title: "",
          value: "",
        },
      ],
    }));
  };

  const handleLinkChange = (index, field, value) => {
    setProfileData((prev) => {
      const updatedLinks = [...prev.links];
      updatedLinks[index][field] = value;
      return {
        ...prev,
        links: updatedLinks,
      };
    });
  };

  const removeLink = (index) => {
    setProfileData((prev) => {
      const updatedLinks = prev.links.filter((_, i) => i !== index);
      return {
        ...prev,
        links: updatedLinks,
      };
    });
  };

  const generalLoading =
    profileLoading ||
    profileUpdateLoading ||
    profileImgLoading ||
    updateProfileImgLoading;

  if (generalLoading) {
    return <PageLoader />;
  }

  const hasEmptyFields =
    !profileData?.userInfo?.firstName?.trim() ||
    !profileData?.userInfo?.lastName?.trim() ||
    profileData?.contactInfos?.some((item) => !item?.value?.trim()) ||
    profileData?.links?.some((item) => !item?.value?.trim());

  return (
    <div className="row my-4">
      <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Kişisel Bilgiler</span>
          </div>
          <div className="custom_card_body">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <div className="custom_card_avatar">
                  <label htmlFor="avatar" className="custom_card_avatar_upload">
                    <Image />
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    id="avatar"
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                    onChange={handleChangeProfileImg}
                  />
                  <img
                    src={generateProfileImg()}
                    alt="Profile"
                    className="custom_card_avatar_img"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="form_group">
                  <label className="form_label">Ad *</label>
                  <input
                    type="text"
                    className="form_control"
                    name="firstName"
                    value={profileData?.userInfo?.firstName || ""}
                    onChange={handleChangeUserInfo}
                    placeholder="Adınızı girin"
                    maxLength={50}
                  />
                </div>
                <div className="form_group">
                  <label className="form_label">Soyad *</label>
                  <input
                    type="text"
                    className="form_control"
                    name="lastName"
                    value={profileData?.userInfo?.lastName || ""}
                    onChange={handleChangeUserInfo}
                    placeholder="Soyadınızı girin"
                    maxLength={50}
                  />
                </div>
                <div className="form_group">
                  <label className="form_label">Ünvan</label>
                  <input
                    type="text"
                    className="form_control"
                    name="bio"
                    value={profileData?.userInfo?.bio || ""}
                    onChange={handleChangeUserInfo}
                    placeholder="Ünvanınızı girin"
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 my-4">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>İletişim Bilgileri</span>
          </div>
          <div className="custom_card_body">
            {profileData?.contactInfos?.length === 0 && (
              <div className="text-center py-4 text-muted">
                Henüz iletişim bilgisi eklenmemiş
              </div>
            )}
            <div className="add_form_item_container">
              {linkData &&
                linkData?.map((item, idx) => (
                  <div
                    className="add_form_item"
                    onClick={() => addContactInfo(item?.contactType)}
                    key={idx}
                  >
                    {item?.value}&nbsp;
                    <Plus size={18} />
                  </div>
                ))}
            </div>
            {profileData &&
              profileData?.contactInfos?.length > 0 &&
              profileData?.contactInfos?.map((item, idx) => (
                <div className="form_group" key={idx}>
                  <label className="form_label">{item?.contactType}</label>
                  <div className="form_with_delete">
                    <input
                      type="text"
                      className="form_control"
                      value={item?.value || ""}
                      onChange={(e) =>
                        handleContactChange(idx, "value", e.target.value)
                      }
                      placeholder={`${item?.contactType} bilgisi girin`}
                      maxLength={100}
                    />
                    <button
                      className="form_delete_button"
                      onClick={() => removeContactInfo(idx)}
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Linkler</span>
          </div>
          <div className="custom_card_body">
            {profileData?.links?.length === 0 && (
              <div className="text-center py-4 text-muted">
                Henüz link eklenmemiş
              </div>
            )}
            <div className="add_form_item_container">
              <div className="add_form_item" onClick={addLink}>
                Link&nbsp;
                <Plus size={18} />
              </div>
            </div>
            {profileData?.links?.length > 0 &&
              profileData.links.map((item, idx) => (
                <div className="form_group" key={idx}>
                  <div className="form_with_delete">
                    <input
                      type="url"
                      className="form_control"
                      value={item?.value || ""}
                      onChange={(e) =>
                        handleLinkChange(idx, "value", e.target.value)
                      }
                      placeholder="https://example.com"
                      maxLength={200}
                    />
                    <button
                      className="form_delete_button"
                      onClick={() => removeLink(idx)}
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end mt-5 gap-3">
        {profileImg?.name && (
          <button
            className="btn btn_secondary"
            onClick={handleUpdateProfileImg}
            disabled={updateProfileImgLoading}
          >
            {updateProfileImgLoading ? "Yükleniyor..." : "Resmi Güncelle"}
          </button>
        )}
        <button
          className="btn btn_primary"
          onClick={handleSubmit}
          disabled={hasEmptyFields || profileUpdateLoading}
        >
          {profileUpdateLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
