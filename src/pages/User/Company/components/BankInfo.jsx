import { Plus, Trash2 } from "lucide-react";
import { Form } from "react-bootstrap";

const BankInfo = ({ data, setData }) => {
  const handleAddBankInfo = () => {
    setData((prev) => ({
      ...prev,
      bankAccounts: [
        ...prev.bankAccounts,
        {
          bankName: "",
          iban: "",
          holderName: "",
        },
      ],
    }));
  };

  const handleChange = (idx, field, value) => {
    setData((prev) => {
      const updated = [...prev.bankAccounts];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, bankAccounts: updated };
    });
  };

  const handleDeleteBankInfoItem = (idx) => {
    setData((prev) => {
      const updated = prev.bankAccounts.filter((_, i) => i !== idx);
      return { ...prev, bankAccounts: updated };
    });
  };

  return (
    <div className="col-md-12 mt-4">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Banka Bilgileri</span>
        </div>
        <div className="custom_card_body">
          <div className="row">
            {data &&
              data?.map((el, idx) => (
                <div className="col-md-12 mb-3" key={el?.id || idx}>
                  <div className="form_group">
                    <label className="form_label">Banka Adı</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.bankName}
                      onChange={(e) =>
                        handleChange(idx, "bankName", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">İBAN</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.iban}
                      onChange={(e) =>
                        handleChange(idx, "iban", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Hesap Sahibi</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.holderName}
                      onChange={(e) =>
                        handleChange(idx, "holderName", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn_danger"
                    onClick={() => handleDeleteBankInfoItem(idx)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            <div className="col-md-12">
              <button
                className="btn btn-sm btn_primary w-100"
                onClick={handleAddBankInfo}
              >
                <Plus size={18} />
                &nbsp;Banka Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
