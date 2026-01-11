import { Trash2 } from "lucide-react";

const SocialMediaManagement = ({ socialMediaData, setSocialMediaData }) => {
  const sortSocialMediaData = (data) => {
    return [...data].sort((a, b) => {
      const aHasId = !!a.id;
      const bHasId = !!b.id;

      const aIsEmpty = !a.usernameOrUrl?.trim();
      const bIsEmpty = !b.usernameOrUrl?.trim();

      if (!aHasId && aIsEmpty && (bHasId || !bIsEmpty)) return -1;
      if (!bHasId && bIsEmpty && (aHasId || !aIsEmpty)) return 1;

      if (!aHasId && bHasId) return -1;
      if (!bHasId && aHasId) return 1;

      return 0;
    });
  };

  const getPlaceholder = (platform) => {
    const placeholders = {
      Instagram: "@kullaniciadi veya https://instagram.com/kullaniciadi",
      Facebook: "https://facebook.com/kullaniciadi",
      Twitter: "@kullaniciadi veya https://twitter.com/kullaniciadi",
      LinkedIn: "https://linkedin.com/in/kullaniciadi",
      YouTube: "https://youtube.com/@kullaniciadi",
      TikTok: "@kullaniciadi veya https://tiktok.com/@kullaniciadi",
      WhatsApp: "+90 5XX XXX XX XX",
      Telegram: "@kullaniciadi",
    };
    return placeholders[platform] || "Kullanıcı adı veya link girin";
  };

  const getPlatformCount = (platform) => {
    return socialMediaData?.filter((item) => item?.platform === platform)
      ?.length;
  };

  const handleInputChange = (item, value) => {
    const updatedData = socialMediaData.map((entry) =>
      entry === item ? { ...entry, usernameOrUrl: value } : entry
    );
    setSocialMediaData(updatedData);
  };

  const handleDelete = (item) => {
    const updatedData = socialMediaData.filter((entry) => entry !== item);
    setSocialMediaData(updatedData);
  };

  const sortedData = sortSocialMediaData(socialMediaData);

  // Platform'a göre gruplama
  const groupedData = sortedData.reduce((acc, item) => {
    if (!acc[item.platform]) {
      acc[item.platform] = [];
    }
    acc[item.platform].push(item);
    return acc;
  }, {});

  return (
    <div className="col-md-12 mt-4">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Sosyal Medya Bilgileri</span>
        </div>
        <div className="custom_card_body">
          {sortedData?.length === 0 && (
            <div className="text-center py-4 text-muted">
              Henüz sosyal medya hesabı eklenmemiş
            </div>
          )}
          {Object.entries(groupedData).map(([platform, items]) => (
            <div key={platform} className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0">{platform}</h6>
                <span className="badge bg-secondary">
                  {getPlatformCount(platform)}/3
                </span>
              </div>
              {items.map((item, idx) => (
                <div className="form_group" key={idx}>
                  <div className="form_with_delete">
                    <input
                      type="text"
                      className="form_control"
                      value={item?.usernameOrUrl || ""}
                      onChange={(e) => handleInputChange(item, e.target.value)}
                      placeholder={getPlaceholder(platform)}
                      maxLength={200}
                    />
                    <button
                      className="form_delete_button"
                      onClick={() => handleDelete(item)}
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManagement;
