import { Plus, Trash2 } from "lucide-react";
import { Form } from "react-bootstrap";

const CompanyInfo = ({ data, setData }) => {
  const handleAddCompanyInfo = () => {
    setData((prev) => ({
      ...prev,
      companyInfos: [
        ...prev.companyInfos,
        {
          name: "",
          address: "",
          taxNo: "",
          taxBody: "",
        },
      ],
    }));
  };

  const handleChange = (idx, field, value) => {
    setData((prev) => {
      const updated = [...prev.companyInfos];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, companyInfos: updated };
    });
  };

  const handleDeleteCompanyInfoItem = (idx) => {
    setData((prev) => {
      const updated = prev.companyInfos.filter((_, i) => i !== idx);
      return { ...prev, companyInfos: updated };
    });
  };

  return (
    <div className="col-md-12">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Şirket Bilgileri</span>
        </div>
        <div className="custom_card_body">
          <div className="row">
            {data &&
              data?.map((el, idx) => (
                <div className="col-md-12 mb-3" key={el?.id || idx}>
                  <div className="form_group">
                    <label className="form_label">Şirket Adı</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.name}
                      onChange={(e) =>
                        handleChange(idx, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Vergi Numarası</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.taxNo}
                      onChange={(e) =>
                        handleChange(idx, "taxNo", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Vergi Dairesi</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.taxBody}
                      onChange={(e) =>
                        handleChange(idx, "taxBody", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Adres</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.address}
                      onChange={(e) =>
                        handleChange(idx, "address", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn_danger"
                    onClick={() => handleDeleteCompanyInfoItem(idx)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            <div className="col-md-12">
              <button
                className="btn btn-sm btn_primary w-100"
                onClick={handleAddCompanyInfo}
              >
                <Plus size={18} />
                &nbsp;Şirket Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
