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

  return (
    <div className="col-md-12 mt-4">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Sosyal Medya Bilgileri</span>
        </div>
        <div className="custom_card_body">
          {sortedData.map((item, idx) => (
            <div className="form_group" key={idx}>
              <label className="form_label">{item?.platform}</label>
              <div className="form_with_delete">
                <input
                  type="text"
                  className="form_control"
                  value={item?.usernameOrUrl}
                  onChange={(e) => handleInputChange(item, e.target.value)}
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
      </div>
    </div>
  );
};

export default SocialMediaManagement;
