import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserRoundX, Ban, Calendar, Users } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Axios from "../../services/Axios";
import PageLoader from "../../components/PageLoader";
import "./interaction.scss";

const Connections = () => {
  // Redux'tan company ID'yi çek
  const companyId = useSelector((state) => state.user?.user?.company?.id);
  
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState([]);
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
        const groupsData = Array.isArray(res?.data?.content) ? res?.data?.content : [];
        setGroups(groupsData);
      }
    } catch (error) {
      console.error("Grup listesi yüklenirken hata:", error);
      setGroups([]);
    }
  };

  // Fetch connections
  const fetchConnections = async () => {
    if (!companyId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.start) params.append("start", filters.start);
      if (filters.end) params.append("end", filters.end);
      if (filters.groupId) params.append("groupId", filters.groupId);

      const url = `/company-admin/${companyId}/connections${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await Axios.get(url);
      if (res?.status === 200 && res?.data) {
        const connectionsData = Array.isArray(res.data) ? res.data : [];
        setConnections(connectionsData);
      }
    } catch (error) {
      console.error("Bağlantılar yüklenirken hata:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Bağlantılar yüklenirken bir hata oluştu";
      toast.error(errorMsg);
      setConnections([]);
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
    fetchConnections();
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
    fetchConnections();
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

      {/* Connections Grid */}
      {connections?.length === 0 ? (
        <div className="empty_state">
          <p>Henüz bağlantı bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="interaction_container">
          {connections?.map((connection,key) => (
            <div className="mini_user_card_container" key={key}>
              <Link
                to={`/user/${connection.id}`}
                className="mini_user_card"
              >
                <div className="mini_user_card_avatar">
                  <img
                    src={
                      connection.profileImg ||
                      "/src/assets/img/avatar.png"
                    }
                    alt={`${connection?.fullName}`}
                    className="mini_user_card_img"
                  />
                </div>

                <div className="mini_user_card_content">
                  <h2 className="mini_user_card_fullname">
                    {connection?.fullName}
                  </h2>
                  <h6 className="mini_user_card_job">
                    {connection.bio || "Kullanıcı"}
                  </h6>
                </div>
              </Link>

              <div className="mini_user_card_controls">
                <button
                  className="mini_user_card_btn"
                  title="Bağlantıyı Kaldır"
                  onClick={() => {
                    toast.success("Bağlantı kaldırma özelliği yakında!");
                  }}
                >
                  <UserRoundX size={12} />
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

export default Connections;
