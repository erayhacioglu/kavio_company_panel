import "./home2.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Plus,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import HistoryFeed from "../../components/HistoryFeed";
import HistoryFeed2 from "../../components/HistoryFeed2";
import HistoryFeed3 from "../../components/HistoryFeed3";
import Axios from "../../services/Axios";
import { motion } from "framer-motion";
import DateRangeStatsDemo from "../../components/DateRangeStatsDemo";

const Home2 = () => {
  const companyId = useSelector((state) => state.user?.user?.company?.id);
  const user = useSelector((state) => state.user?.user);

  const [notifications, setNotifications] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data for now
    setNotifications([
      { id: 1, text: "5 yeni bağlantı isteği", time: "10 dk önce", type: "connection" },
      { id: 2, text: "Kart görüntülenme artışı", time: "1 saat önce", type: "trend" },
      { id: 3, text: "3 yeni iletişim talebi", time: "2 saat önce", type: "contact" },
    ]);

    setUpcomingTasks([
      { id: 1, title: "Aylık rapor hazırla", date: "Bugün, 15:00" },
      { id: 2, title: "Yeni çalışan kartı oluştur", date: "Yarın, 10:00" },
      { id: 3, title: "Kampanya analizi", date: "15 Ocak" },
    ]);
  }, [companyId]);

  const quickActions = [
    {
      icon: <Plus size={24} />,
      label: "Yeni Kart",
      link: "/card-management/new",
      color: "#6366F1",
    },
    {
      icon: <Users size={24} />,
      label: "Kartlar",
      link: "/card-management",
      color: "#10B981",
    },
    {
      icon: <BarChart3 size={24} />,
      label: "Analiz",
      link: "/analize",
      color: "#F59E0B",
    },
    {
      icon: <Settings size={24} />,
      label: "Ayarlar",
      link: "/settings",
      color: "#8B5CF6",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };

  return (
    <div className="home2_container">
      <div className="home2_layout">
        {/* Left Side */}
        <div className="home2_content">
          {/* Header */}
          <div className="home2_header">
            <div>
              <h1>{getGreeting()}, {user?.firstName} 👋</h1>
              <p>Hoş geldin, bugün neler yapmak istersin?</p>
            </div>
            <div className="home2_header_actions">
              <button className="home2_icon_btn">
                <Search size={20} />
              </button>
              <button className="home2_icon_btn home2_icon_btn_notification">
                <Bell size={20} />
                <span className="home2_notification_badge">3</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="home2_quick_actions">
            {quickActions.map((action, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={action.link} 
                  className="home2_action_card"
                  style={{ '--card-color': action.color }}
                >
                  <div className="home2_action_icon">
                    {action.icon}
                  </div>
                  <span>{action.label}</span>
                  <ArrowUpRight size={16} className="home2_action_arrow" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Main Cards Grid */}
          <div className="home2_cards_grid">
            {/* Notifications */}
            <motion.div
              className="home2_card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="home2_card_header">
                <h3>
                  <Bell size={18} />
                  Bildirimler
                </h3>
                <Link to="/notifications">Tümü</Link>
              </div>
              <div className="home2_card_body">
                {notifications.map((notif) => (
                  <div key={notif.id} className="home2_notification_item">
                    <div className="home2_notification_dot"></div>
                    <div className="home2_notification_content">
                      <p>{notif.text}</p>
                      <span>
                        <Clock size={12} />
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              className="home2_card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="home2_card_header">
                <h3>
                  <Calendar size={18} />
                  Yaklaşan Görevler
                </h3>
                <Link to="/tasks">Tümü</Link>
              </div>
              <div className="home2_card_body">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="home2_task_item">
                    <input type="checkbox" />
                    <div className="home2_task_content">
                      <p>{task.title}</p>
                      <span>{task.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Shortcuts */}
          <motion.div
            className="home2_shortcuts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Kısayollar</h3>
            <div className="home2_shortcuts_grid">
              <Link to="/card-management" className="home2_shortcut">
                <Users size={16} />
                Kart Yönetimi
              </Link>
              <Link to="/company-management" className="home2_shortcut">
                <Users size={16} />
                Şirket Yönetimi
              </Link>
              <Link to="/group-management" className="home2_shortcut">
                <Users size={16} />
                Grup Yönetimi
              </Link>
              <Link to="/interaction/connections" className="home2_shortcut">
                <Users size={16} />
                Bağlantılar
              </Link>
              <Link to="/interaction/contacts" className="home2_shortcut">
                <Users size={16} />
                İletişim Talepleri
              </Link>
              <Link to="/analize" className="home2_shortcut">
                <BarChart3 size={16} />
                Analiz Paneli
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side - History Feed */}
        <div className="home2_sidebar">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HistoryFeed />
            {/* { <HistoryFeed2 /> } */}
            {/* <HistoryFeed3 /> */}
          </motion.div>
        </div>
      </div>
      <>
                <DateRangeStatsDemo />
      </>
    </div>
  );
};

export default Home2;
