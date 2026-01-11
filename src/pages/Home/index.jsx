import "./home.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Users,
  UserPlus,
  Eye,
  Download,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
} from "lucide-react";
import HistoryFeed from "../../components/HistoryFeed";
import Axios from "../../services/Axios";
import CountUp from "react-countup";

const Home = () => {
  const companyId = useSelector((state) => state.user?.user?.company?.id);

  const [stats, setStats] = useState({
    totalViews: 0,
    totalConnections: 0,
    totalContacts: 0,
    totalDownloads: 0,
  });

  const [recentStats, setRecentStats] = useState({
    todayViews: 0,
    weeklyViews: 0,
    monthlyViews: 0,
    todayConnections: 0,
  });

  const [topLocations, setTopLocations] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  const fetchStats = async () => {
    if (!companyId) return;
    try {
      const res = await Axios.get(`/dashboard/stats/${companyId}`);
      if (res?.status === 200 && res?.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Dashboard stats yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent stats
  const fetchRecentStats = async () => {
    if (!companyId) return;
    try {
      const res = await Axios.get(`/dashboard/recent-stats/${companyId}`);
      if (res?.status === 200 && res?.data) {
        setRecentStats(res.data);
      }
    } catch (error) {
      console.error("Recent stats yüklenirken hata:", error);
    }
  };

  // Fetch top locations
  const fetchTopLocations = async () => {
    if (!companyId) return;
    try {
      const res = await Axios.get(`/dashboard/top-locations/${companyId}`);
      if (res?.status === 200 && res?.data) {
        const locationsData = Array.isArray(res.data) ? res.data : [];
        setTopLocations(locationsData.slice(0, 5));
      }
    } catch (error) {
      console.error("Top locations yüklenirken hata:", error);
    }
  };

  // Fetch recent users
  const fetchRecentUsers = async () => {
    if (!companyId) return;
    try {
      const res = await Axios.get(`/dashboard/recent-users/${companyId}`);
      if (res?.status === 200 && res?.data) {
        const usersData = Array.isArray(res.data) ? res.data : [];
        setRecentUsers(usersData.slice(0, 5));
      }
    } catch (error) {
      console.error("Recent users yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentStats();
    fetchTopLocations();
    fetchRecentUsers();
  }, [companyId]);

  // Main stats data
  const statsData = [
    {
      icon: <Eye size={24} />,
      label: "Toplam Görüntülenme",
      value: stats.totalViews || 0,
      color: "blue",
      link: "/analize",
    },
    {
      icon: <Users size={24} />,
      label: "Bağlantılar",
      value: stats.totalConnections || 0,
      color: "green",
      link: "/interaction/connections",
    },
    {
      icon: <UserPlus size={24} />,
      label: "İletişim Talepleri",
      value: stats.totalContacts || 0,
      color: "purple",
      link: "/interaction/contacts",
    },
    {
      icon: <Download size={24} />,
      label: "İndirmeler",
      value: stats.totalDownloads || 0,
      color: "orange",
      link: "/analize",
    },
  ];

  // Calculate percentage change (mock data - backend'den gelecek)
  const getPercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="home_container">
      {/* Main Stats Grid */}
      <div className="home_stats_grid">
        {statsData.map((stat, idx) => (
          <Link
            to={stat.link}
            key={idx}
            className={`home_stat_card home_stat_card_${stat.color}`}
          >
            <div className="home_stat_icon">{stat.icon}</div>
            <div className="home_stat_content">
              <h3 className="home_stat_value">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={stat.value} duration={2} separator="," />
                )}
              </h3>
              <p className="home_stat_label">{stat.label}</p>
            </div>
            <ArrowRight className="home_stat_arrow" size={20} />
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="home_two_column">
        {/* Left Column */}
        <div className="home_left_column">
          {/* Recent Activity Stats */}
          <div className="home_card">
            <div className="home_card_header">
              <h3 className="home_card_title">Son Aktiviteler</h3>
            </div>
            <div className="home_card_body">
              <div className="home_activity_grid">
                <div className="home_activity_item">
                  <div className="home_activity_icon home_activity_icon_blue">
                    <Clock size={18} />
                  </div>
                  <div className="home_activity_content">
                    <p className="home_activity_label">Bugün</p>
                    <h4 className="home_activity_value">
                      {recentStats.todayViews || 0}
                    </h4>
                    <p className="home_activity_sublabel">Görüntülenme</p>
                  </div>
                </div>

                <div className="home_activity_item">
                  <div className="home_activity_icon home_activity_icon_green">
                    <TrendingUp size={18} />
                  </div>
                  <div className="home_activity_content">
                    <p className="home_activity_label">Bu Hafta</p>
                    <h4 className="home_activity_value">
                      {recentStats.weeklyViews || 0}
                    </h4>
                    <p className="home_activity_sublabel">Görüntülenme</p>
                  </div>
                </div>

                <div className="home_activity_item">
                  <div className="home_activity_icon home_activity_icon_purple">
                    <Users size={18} />
                  </div>
                  <div className="home_activity_content">
                    <p className="home_activity_label">Bugün</p>
                    <h4 className="home_activity_value">
                      {recentStats.todayConnections || 0}
                    </h4>
                    <p className="home_activity_sublabel">Yeni Bağlantı</p>
                  </div>
                </div>

                <div className="home_activity_item">
                  <div className="home_activity_icon home_activity_icon_orange">
                    <TrendingDown size={18} />
                  </div>
                  <div className="home_activity_content">
                    <p className="home_activity_label">Bu Ay</p>
                    <h4 className="home_activity_value">
                      {recentStats.monthlyViews || 0}
                    </h4>
                    <p className="home_activity_sublabel">Görüntülenme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Locations */}
          <div className="home_card">
            <div className="home_card_header">
              <h3 className="home_card_title">En Çok Görüntüleyen Şehirler</h3>
              <Link to="/analize3" className="home_card_link">
                Tümünü Gör
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="home_card_body">
              {topLocations.length === 0 ? (
                <p className="home_empty_text">Henüz veri bulunmuyor</p>
              ) : (
                <div className="home_location_list">
                  {topLocations.map((location, idx) => (
                    <div className="home_location_item" key={idx}>
                      <div className="home_location_rank">{idx + 1}</div>
                      <div className="home_location_info">
                        <div className="home_location_name">
                          <MapPin size={14} />
                          {location.city}
                        </div>
                        <div className="home_location_bar">
                          <div
                            className="home_location_bar_fill"
                            style={{
                              width: `${(location.count / topLocations[0].count) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="home_location_count">
                        {location.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div className="home_card">
            <div className="home_card_header">
              <h3 className="home_card_title">Son Bağlananlar</h3>
              <Link to="/interaction/connections" className="home_card_link">
                Tümünü Gör
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="home_card_body">
              {recentUsers.length === 0 ? (
                <p className="home_empty_text">Henüz kullanıcı bulunmuyor</p>
              ) : (
                <div className="home_users_list">
                  {recentUsers.map((user, idx) => (
                    <Link
                      to={`/user/${user.id}`}
                      className="home_user_item"
                      key={idx}
                    >
                      <div className="home_user_avatar">
                        <img
                          src={user.profileImg || "/src/assets/img/avatar.png"}
                          alt={user.firstName}
                        />
                      </div>
                      <div className="home_user_info">
                        <p className="home_user_name">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="home_user_bio">{user.bio || "Kullanıcı"}</p>
                      </div>
                      <ArrowRight size={16} className="home_user_arrow" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - History Feed */}
        <div className="home_right_column">
          <HistoryFeed />
        </div>
      </div>

      {/* OLD COMPONENTS - COMMENTED OUT */}
      {/* 
      <div className="row align-items-stretch">
        <InfoCard />
        <Carousel />
        <div className="col-md-6">SOL TARAF</div>
        <div className="col-md-6">
          <HistoryFeed/>
        </div>
      </div>
      */}
    </div>
  );
};

export default Home;
