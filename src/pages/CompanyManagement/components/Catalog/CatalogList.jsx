import { Edit, Trash2 } from "lucide-react";
import Axios from "../../../../services/Axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CatalogList = ({ catalogData, getCatalogData, setEditMode, setCatalogFormData }) => {
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu kataloğu silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, Sil",
      cancelButtonText: "İptal",
    });

    if (result.isConfirmed) {
      try {
        const res = await Axios.delete(
          `/company-management/delete-catalog/${id}`
        );
        if (res?.status === 200) {
          toast.success("Katalog başarıyla silindi");
          getCatalogData();
        }
      } catch (error) {
        console.log("Error : ", error);
        toast.error("Katalog silinirken bir hata oluştu");
      }
    }
  };

  const handleEdit = (item) => {
    setCatalogFormData({
      name: item.name,
      url: item.url,
      coverPhoto: item.coverPhoto,
    });
    setEditMode(item);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="col-md-12 my-4">
      {catalogData?.length === 0 && (
        <div className="text-center py-5">
          <div className="text-muted mb-3">
            <h5>Henüz katalog eklenmemiş</h5>
            <p>Yukarıdaki formu kullanarak katalog ekleyebilirsiniz</p>
          </div>
        </div>
      )}
      <div className="catalog_card_container">
        {catalogData &&
          catalogData?.length > 0 &&
          catalogData?.map((item, idx) => (
            <div className="catalog_card" key={idx}>
              <a
                href={item?.url}
                target="_blank"
                rel="noreferrer"
                className="catalog_card_link"
              >
                <div className="catalog_card_thumbnail">
                  <img
                    src={item?.coverPhoto}
                    alt={item?.name}
                    className="catalog_card_img"
                  />
                </div>
                <div className="catalog_card_title">
                  <div className="title_text">{item?.name}</div>
                </div>
              </a>
              <div className="catalog_card_btn_groups">
                <button
                  className="catalog_card_btn edit"
                  onClick={() => handleEdit(item)}
                  title="Düzenle"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="catalog_card_btn delete"
                  onClick={() => handleDelete(item?.id)}
                  title="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CatalogList;
