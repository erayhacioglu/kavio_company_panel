import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BankInfo = ({ data, setData }) => {
  const handleAddBankInfo = () => {
    // Boş alan kontrolü
    const emptyItems = data?.filter(
      (item) =>
        !item?.bankName?.trim() ||
        !item?.iban?.trim() ||
        !item?.holderName?.trim()
    );

    if (emptyItems?.length > 0) {
      toast.error("Lütfen mevcut boş banka bilgilerini doldurun veya silin");
      return;
    }

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
    // IBAN için özel formatlama
    if (field === "iban") {
      // Sadece harf ve rakam kabul et, boşlukları temizle
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      // Her 4 karakterde bir boşluk ekle
      value = value.match(/.{1,4}/g)?.join(" ") || value;
    }

    setData((prev) => {
      const updated = [...prev.bankAccounts];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, bankAccounts: updated };
    });
  };

  const handleDeleteBankInfoItem = async (idx, item) => {
    // Eğer ID varsa (DB'den gelmiş) confirmation göster
    if (item?.id) {
      const result = await Swal.fire({
        title: "Emin misiniz?",
        text: "Bu banka hesabını silmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "İptal",
      });

      if (!result.isConfirmed) return;
    }

    setData((prev) => {
      const updated = prev.bankAccounts.filter((_, i) => i !== idx);
      return { ...prev, bankAccounts: updated };
    });

    if (item?.id) {
      toast.success("Banka hesabı silindi");
    }
  };

  return (
    <div className="col-md-12 mt-4">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Banka Bilgileri</span>
        </div>
        <div className="custom_card_body">
          {data?.length === 0 && (
            <div className="text-center py-4 text-muted mb-3">
              Henüz banka bilgisi eklenmemiş
            </div>
          )}
          <div className="row">
            {data &&
              data?.map((el, idx) => (
                <div className="col-md-12 mb-3" key={el?.id || idx}>
                  <div className="form_group">
                    <label className="form_label">Banka Adı *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.bankName || ""}
                      onChange={(e) =>
                        handleChange(idx, "bankName", e.target.value)
                      }
                      placeholder="Banka adını girin"
                      maxLength={100}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">İBAN *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.iban || ""}
                      onChange={(e) =>
                        handleChange(idx, "iban", e.target.value)
                      }
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      maxLength={34}
                    />
                    <small className="text-muted">
                      Örnek: TR00 0000 0000 0000 0000 0000 00
                    </small>
                  </div>
                  <div className="form_group">
                    <label className="form_label">Hesap Sahibi *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.holderName || ""}
                      onChange={(e) =>
                        handleChange(idx, "holderName", e.target.value)
                      }
                      placeholder="Hesap sahibi adını girin"
                      maxLength={100}
                    />
                  </div>
                  <button
                    className="btn btn-sm btn_danger"
                    onClick={() => handleDeleteBankInfoItem(idx, el)}
                    type="button"
                  >
                    <Trash2 size={18} />
                    &nbsp;Sil
                  </button>
                </div>
              ))}
            <div className="col-md-12">
              <button
                className="btn btn-sm btn_primary w-100"
                onClick={handleAddBankInfo}
                type="button"
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
