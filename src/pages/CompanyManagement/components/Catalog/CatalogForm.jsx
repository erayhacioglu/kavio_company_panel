import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Axios from "../../../../services/Axios";
import toast from "react-hot-toast";

const CatalogForm = ({ catalogFormData, setCatalogFormData, getCatalogData, editMode, setEditMode }) => {
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Edit mode değiştiğinde formu sıfırla
  useEffect(() => {
    if (!editMode) {
      setCatalogFormData({ name: "", url: "", coverPhoto: "" });
      setCoverPhotoFile(null);
      setPdfFile(null);
    }
  }, [editMode]);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File type kontrolü
    const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Geçersiz dosya formatı. PNG, JPG veya WEBP formatında olmalıdır");
      return;
    }

    // File size kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Resim boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    setCoverPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCatalogFormData((prev) => ({ ...prev, coverPhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File type kontrolü
    if (file.type !== "application/pdf") {
      toast.error("Sadece PDF dosyaları yüklenebilir");
      return;
    }

    // File size kontrolü (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("PDF boyutu 10MB'dan küçük olmalıdır");
      return;
    }

    setPdfFile(file);
  };

  const handleSubmit = async () => {
    // Validation
    if (!catalogFormData.name?.trim()) {
      toast.error("Lütfen katalog başlığı girin");
      return;
    }

    if (editMode) {
      // Edit mode - güncelleme
      setSubmitLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", catalogFormData.name);
        if (coverPhotoFile) {
          formData.append("coverPhoto", coverPhotoFile);
        }
        if (pdfFile) {
          formData.append("file", pdfFile);
        }

        const res = await Axios.put(
          `/company-management/update-catalog/${editMode.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res?.status === 200) {
          toast.success("Katalog başarıyla güncellendi");
          setCatalogFormData({ name: "", url: "", coverPhoto: "" });
          setCoverPhotoFile(null);
          setPdfFile(null);
          setEditMode(null);
          getCatalogData();
        }
      } catch (error) {
        console.log("Error : ", error);
        toast.error("Katalog güncellenirken bir hata oluştu");
      } finally {
        setSubmitLoading(false);
      }
    } else {
      // Create mode - yeni ekleme
      if (!coverPhotoFile) {
        toast.error("Lütfen kapak fotoğrafı seçin");
        return;
      }

      if (!pdfFile) {
        toast.error("Lütfen PDF dosyası seçin");
        return;
      }

      setSubmitLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", catalogFormData.name);
        formData.append("coverPhoto", coverPhotoFile);
        formData.append("file", pdfFile);

        const res = await Axios.post(
          `/company-management/add-catalog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res?.status === 200) {
          toast.success("Katalog başarıyla eklendi");
          setCatalogFormData({ name: "", url: "", coverPhoto: "" });
          setCoverPhotoFile(null);
          setPdfFile(null);
          getCatalogData();
        }
      } catch (error) {
        console.log("Error : ", error);
        toast.error("Katalog eklenirken bir hata oluştu");
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setCatalogFormData({ name: "", url: "", coverPhoto: "" });
    setCoverPhotoFile(null);
    setPdfFile(null);
    setEditMode(null);
  };

  return (
    <div className="col-md-12">
      <div className="custom_card">
        <div className="custom_card_header">
          <span>{editMode ? "Katalog Düzenle" : "Katalog Ekle"}</span>
        </div>
        <div className="custom_card_body">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="form_group">
                <label className="form_label">Başlık *</label>
                <input
                  type="text"
                  className="form_control"
                  value={catalogFormData?.name || ""}
                  onChange={(e) =>
                    setCatalogFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Katalog başlığı girin"
                  maxLength={100}
                />
              </div>
              <div className="catalog_added_container">
                <label htmlFor="thumbnail" className="catalog_add_button">
                  <input
                    type="file"
                    id="thumbnail"
                    className="d-none"
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                    onChange={handleCoverPhotoChange}
                  />
                  <div className="catalog_add_button_body">
                    {!coverPhotoFile && !catalogFormData?.coverPhoto ? (
                      <div className="catalog_added_icon">
                        <div className="catalog_added_icon_circle">
                          <Plus size={30} />
                        </div>
                        <span>Kapak Fotoğrafı Ekle</span>
                        <small className="text-muted d-block mt-2">
                          Max 5MB (PNG, JPG, WEBP)
                        </small>
                      </div>
                    ) : (
                      <div className="selected_added_item">
                        {coverPhotoFile?.name || "Mevcut kapak fotoğrafı"}
                      </div>
                    )}
                  </div>
                </label>
                <label htmlFor="file" className="catalog_add_button">
                  <input
                    type="file"
                    id="file"
                    className="d-none"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                  />
                  <div className="catalog_add_button_body">
                    {!pdfFile ? (
                      <div className="catalog_added_icon">
                        <div className="catalog_added_icon_circle">
                          <Plus size={30} />
                        </div>
                        <span>PDF Ekle {editMode ? "(Opsiyonel)" : ""}</span>
                        <small className="text-muted d-block mt-2">
                          Max 10MB
                        </small>
                      </div>
                    ) : (
                      <div className="selected_added_item">{pdfFile.name}</div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="catalog_card_preview">
                <div className="catalog_card_preview_thumbnail">
                  <img
                    src={
                      catalogFormData?.coverPhoto ||
                      "https://t3.ftcdn.net/jpg/04/61/12/02/360_F_461120287_u67OuAngOw2tMMAB3kSkW2uqCZnMmIwY.jpg"
                    }
                    alt="Preview"
                    className="catalog_card_preview_img"
                  />
                </div>
                <div className="catalog_card_preview_title">
                  <div className="preview_title_text">
                    {catalogFormData?.name || "Katalog Başlığı"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-4 gap-3">
            {editMode && (
              <button
                className="btn btn_secondary"
                onClick={handleCancel}
                disabled={submitLoading}
              >
                İptal
              </button>
            )}
            <button
              className="btn btn_primary"
              onClick={handleSubmit}
              disabled={submitLoading}
            >
              {submitLoading
                ? "Kaydediliyor..."
                : editMode
                ? "Güncelle"
                : "Kaydet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogForm;
