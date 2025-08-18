import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaImage, FaPlus, FaTrash } from "react-icons/fa6";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { linkData } from "../../helpers";

const Profile = () => {
  const { id } = useParams();

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [isSwalOpen, setIsSwalOpen] = useState(false);

  const [profileImg, setProfileImg] = useState("");
  const [profileImgLoading, setProfileImgLoading] = useState(false);
  const [updateProfileImgLoading, setUpdateProfileImgLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    cardId: id,
    userInfo: {
      firstName: "",
      lastName: "",
      bio: "",
    },
    links: [
      {
        title: "",
        value: "",
      },
    ],
    contactInfos: [
      {
        contactType: "",
        value: "",
      },
    ],
  });

  const handleSubmit = async () => {
    if (!id) return;
    setProfileUpdateLoading(true);
    try {
      const res = await axios.post(
        `https://api.kavio.co/api/profile-management/update-personel-information`,
        profileData
      );
      if (res?.status === 200) {
        toast.success(res?.data);
        getProfileData();
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const getProfileData = async () => {
    if (!id) return;
    setProfileLoading(true);
    try {
      const res = await axios.get(
        `https://api.kavio.co/api/profile-management/get-profile/${id}`
      );
      if (res?.status === 200) {
        setProfileData(res?.data);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const getProfileImg = async () => {
    if (!id) return;
    setProfileImgLoading(true);
    try {
      const res = await axios.get(
        `
https://api.kavio.co/api/card/user-images/${id}`
      );
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
    if (id) {
      getProfileData();
      getProfileImg();
    }
  }, [id]);

  const handleUpdateProfileImg = async () => {
    if (!id || !profileImg?.name) return;
    setUpdateProfileImgLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", id);
      formData.append("img", profileImg);
      const res = await axios.post(
        "https://api.kavio.co/api/user/update-profile-img",
        formData
      );
      if (res?.status === 200) {
        getProfileImg();
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setUpdateProfileImgLoading(false);
    }
  };

  const generateProfileImg = () => {
    if (profileImgLoading) return;
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

    const validTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!validTypes.includes(uploadedImg?.type)) {
      toast.error("Geçersiz resim formatı");
    } else {
      setProfileImg(uploadedImg);
    }
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
  useEffect(() => {
    if (generalLoading && !isSwalOpen) {
      setIsSwalOpen(true);
      Swal.fire({
        html: `
<div style="display: flex; flex-direction: column; align-items: center;">
 <strong>Yükleniyor...</strong>
<p>Lütfen bekleyin</p>
 </div> `,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if (!generalLoading && isSwalOpen) {
      setIsSwalOpen(false);
      Swal.close();
    }
  }, [isSwalOpen, generalLoading]);

  return (
    <div className="row my-4">
      <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Kişisel Bilgiler</span>
            <div className="custom_card_header_groups">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Düzenlensin"
              />
            </div>
          </div>
          <div className="custom_card_body">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <div className="custom_card_avatar">
                  <label htmlFor="avatar" className="custom_card_avatar_upload">
                    <FaImage />
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    id="avatar"
                    accept="*"
                    onChange={handleChangeProfileImg}
                  />
                  <img
                    src={`${generateProfileImg()}`}
                    alt=""
                    className="custom_card_avatar_img"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="form_group">
                  <label className="form_label">Ad</label>
                  <input
                    type="text"
                    className="form_control"
                    name="firstName"
                    value={profileData?.userInfo?.firstName}
                    onChange={handleChangeUserInfo}
                  />
                </div>
                <div className="form_group">
                  <label className="form_label">Soyad</label>
                  <input
                    type="text"
                    className="form_control"
                    name="lastName"
                    value={profileData?.userInfo?.lastName}
                    onChange={handleChangeUserInfo}
                  />
                </div>
                <div className="form_group">
                  <label className="form_label">Ünvan</label>
                  <input
                    type="text"
                    className="form_control"
                    name="bio"
                    value={profileData?.userInfo?.bio}
                    onChange={handleChangeUserInfo}
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
            <div className="add_form_item_container">
              {linkData &&
                linkData?.map((item, idx) => (
                  <div
                    className="add_form_item"
                    onClick={() => addContactInfo(item?.contactType)}
                    key={idx}
                  >
                    {item?.value}&nbsp;
                    <FaPlus />
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
                      value={item?.value}
                      onChange={(e) =>
                        handleContactChange(idx, "value", e.target.value)
                      }
                    />
                    <button
                      className="form_delete_button"
                      onClick={() => removeContactInfo(idx)}
                    >
                      <FaTrash />
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
            <div className="add_form_item_container">
              <div className="add_form_item" onClick={addLink}>
                Link&nbsp;
                <FaPlus />
              </div>
            </div>
            {profileData?.links?.length > 0 &&
              profileData.links.map((item, idx) => (
                <div className="form_group" key={idx}>
                  <div className="form_with_delete">
                    <input
                      type="text"
                      className="form_control"
                      value={item?.value}
                      onChange={(e) =>
                        handleLinkChange(idx, "value", e.target.value)
                      }
                    />
                    <button
                      className="form_delete_button"
                      onClick={() => removeLink(idx)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-end mt-5"
        onClick={() => {
          handleSubmit();
          handleUpdateProfileImg();
        }}
      >
        <button className="btn btn-primary">Kaydet</button>
      </div>
    </div>
  );
};

export default Profile;
