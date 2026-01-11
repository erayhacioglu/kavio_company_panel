import { X } from "lucide-react";
import toast from "react-hot-toast";

const SocialMediaList = ({
  socialMediaList,
  selectedSocialMedia,
  setSelectedSocialMedia,
  socialMediaData,
  setSocialMediaData,
}) => {
  const getSocialMediaLength = (item, values) => {
    return values?.filter((el) => el?.platform === item?.name)?.length;
  };

  const emptyItems = (values) =>
    values.filter((item) =>
      Object.values(item).some(
        (val) => val === "" || val === null || val === undefined
      )
    );

  const handleClick = (item, values) => {
    if (emptyItems(values)?.length > 0) {
      toast.error(
        "Yeni bir sosyal medya hesabı eklemek için, mevcut boş alanı doldurun veya silin"
      );
      return;
    }
    if (getSocialMediaLength(item, values) >= 3) {
      toast.error("Aynı sosyal medya hesabından en fazla 3 adet eklenebilir");
      return;
    }
    setSocialMediaData((prev) => [
      ...prev,
      {
        platform: item?.name,
        usernameOrUrl: "",
      },
    ]);
  };

  return (
    <div className="col-md-12">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Sosyal Medya</span>
          {selectedSocialMedia && (
            <div className="custom_card_header_groups">
              <button
                className="btn btn-sm btn_center btn_danger"
                onClick={() => setSelectedSocialMedia(false)}
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="custom_card_body">
          <div className="social_media_list">
            {socialMediaList &&
              socialMediaList?.length > 0 &&
              socialMediaList?.map((item, idx) => (
                <div
                  className="social_media_item"
                  key={idx}
                  onClick={() => handleClick(item, socialMediaData)}
                >
                  {item?.displayName}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaList;
