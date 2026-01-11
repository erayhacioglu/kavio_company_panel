import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CompanyInfo = ({ data, setData }) => {
  const handleAddCompanyInfo = () => {
    // Boş alan kontrolü
    const emptyItems = data?.filter(
      (item) =>
        !item?.name?.trim() ||
        !item?.taxNo?.trim() ||
        !item?.taxBody?.trim() ||
        !item?.address?.trim()
    );

    if (emptyItems?.length > 0) {
      toast.error("Lütfen mevcut boş şirket bilgilerini doldurun veya silin");
      return;
    }

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

  const handleDeleteCompanyInfoItem = async (idx, item) => {
    // Eğer ID varsa (DB'den gelmiş) confirmation göster
    if (item?.id) {
      const result = await Swal.fire({
        title: "Emin misiniz?",
        text: "Bu şirket bilgisini silmek istediğinizden emin misiniz?",
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
      const updated = prev.companyInfos.filter((_, i) => i !== idx);
      return { ...prev, companyInfos: updated };
    });

    if (item?.id) {
      toast.success("Şirket bilgisi silindi");
    }
  };

  return (
    <div className="col-md-12">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>Şirket Bilgileri</span>
        </div>
        <div className="custom_card_body">
          {data?.length === 0 && (
            <div className="text-center py-4 text-muted mb-3">
              Henüz şirket bilgisi eklenmemiş
            </div>
          )}
          <div className="row">
            {data &&
              data?.map((el, idx) => (
                <div className="col-md-12 mb-3" key={el?.id || idx}>
                  <div className="form_group">
                    <label className="form_label">Şirket Adı *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.name || ""}
                      onChange={(e) =>
                        handleChange(idx, "name", e.target.value)
                      }
                      placeholder="Şirket adını girin"
                      maxLength={100}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Vergi Numarası *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.taxNo || ""}
                      onChange={(e) =>
                        handleChange(idx, "taxNo", e.target.value)
                      }
                      placeholder="Vergi numarasını girin"
                      maxLength={20}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Vergi Dairesi *</label>
                    <input
                      type="text"
                      className="form_control"
                      value={el?.taxBody || ""}
                      onChange={(e) =>
                        handleChange(idx, "taxBody", e.target.value)
                      }
                      placeholder="Vergi dairesini girin"
                      maxLength={100}
                    />
                  </div>
                  <div className="form_group">
                    <label className="form_label">Adres *</label>
                    <textarea
                      className="form_control"
                      value={el?.address || ""}
                      onChange={(e) =>
                        handleChange(idx, "address", e.target.value)
                      }
                      placeholder="Adresi girin"
                      rows={3}
                      maxLength={500}
                    />
                  </div>
                  <button
                    className="btn btn-sm btn_danger"
                    onClick={() => handleDeleteCompanyInfoItem(idx, el)}
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
                onClick={handleAddCompanyInfo}
                type="button"
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
