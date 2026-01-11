import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Check, X, Ban, Calendar, Users } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Axios from "../../services/Axios";
import PageLoader from "../../components/PageLoader";
import "./interaction.scss";

const ContactRequests = () => {
  // Redux'tan company ID'yi çek
  const companyId = useSelector((state) => state.user?.user?.company?.id);

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  // Filters
  const [filters, setFilters] = useState({
    start: "",
    end: "",
    groupId: "",
  });

  // Fetch groups
  const fetchGroups = async () => {
    if (!companyId) return;
    try {
      const res = await Axios.get(`/user-groups/company/${companyId}`);
      if (res?.status === 200 && res?.data?.content) {
        // API response'u array'e çevir
        const groupsData = Array.isArray(res?.data?.content) ? res?.data?.content : [];
        setGroups(groupsData);
      }
    } catch (error) {
      console.error("Grup listesi yüklenirken hata:", error);
      setGroups([]);
    }
  };

  // Fetch contact requests
  const fetchContactRequests = async () => {
    if (!companyId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.start) params.append("start", filters.start);
      if (filters.end) params.append("end", filters.end);
      if (filters.groupId) params.append("groupId", filters.groupId);

      const url = `/company-admin/${companyId}/guest-contacts${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await Axios.get(url);
      if (res?.status === 200 && res?.data) {
        // API response'u array'e çevir
        const contactsData = Array.isArray(res.data) ? res.data : [];
        setContacts(contactsData);
      }
    } catch (error) {
      console.error("İletişim talepleri yüklenirken hata:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "İletişim talepleri yüklenirken bir hata oluştu";
      toast.error(errorMsg);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchContactRequests();
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      start: "",
      end: "",
      groupId: "",
    });
  };

  // Initial fetch
  useEffect(() => {
    fetchGroups();
    fetchContactRequests();
  }, [companyId]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="interaction_filters">
        <form onSubmit={handleFilterSubmit} className="filter_form">
          <div className="filter_group">
            <label className="filter_label">
              <Calendar size={16} />
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              name="start"
              value={filters.start}
              onChange={handleFilterChange}
              className="filter_input"
            />
          </div>

          <div className="filter_group">
            <label className="filter_label">
              <Calendar size={16} />
              Bitiş Tarihi
            </label>
            <input
              type="date"
              name="end"
              value={filters.end}
              onChange={handleFilterChange}
              className="filter_input"
            />
          </div>

          <div className="filter_group">
            <label className="filter_label">
              <Users size={16} />
              Grup
            </label>
            <select
              name="groupId"
              value={filters.groupId}
              onChange={handleFilterChange}
              className="filter_input"
            >
              <option value="">Tüm Gruplar</option>
              {groups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter_actions">
            <button type="submit" className="btn btn_primary">
              Filtrele
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn_secondary"
            >
              Temizle
            </button>
          </div>
        </form>
      </div>

      {/* Contact Requests Grid */}
      {contacts?.length === 0 ? (
        <div className="empty_state">
          <p>Henüz iletişim talebi bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="interaction_container">
          {contacts?.map((contact) => (
            <div className="mini_user_card_container" key={contact.id}>
              <Link to={`/user/${contact.id}`} className="mini_user_card">
                <div className="mini_user_card_avatar">
                  <img
                    src={
                      contact.profileImg || "/src/assets/img/avatar.png"
                    }
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="mini_user_card_img"
                  />
                </div>

                <div className="mini_user_card_content">
                  <h2 className="mini_user_card_fullname">
                    {contact.firstName} {contact.lastName}
                  </h2>
                  <h6 className="mini_user_card_job">
                    {contact.bio || "Kullanıcı"}
                  </h6>
                </div>
              </Link>

              <div className="mini_user_card_controls">
                <button
                  className="mini_user_card_btn"
                  title="Onayla"
                  onClick={() => {
                    toast.success("Onaylama özelliği yakında!");
                  }}
                >
                  <Check size={12} />
                </button>

                <button
                  className="mini_user_card_btn"
                  title="Reddet"
                  onClick={() => {
                    toast.success("Reddetme özelliği yakında!");
                  }}
                >
                  <X size={12} />
                </button>

                <button
                  className="mini_user_card_btn"
                  title="Engelle"
                  onClick={() => {
                    toast.success("Engelleme özelliği yakında!");
                  }}
                >
                  <Ban size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
