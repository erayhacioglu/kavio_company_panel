import {
  FaBook,
  FaBuilding,
  FaChartColumn,
  FaClock,
  FaEye,
  FaGear,
  FaIdCard,
  FaLink,
  FaList,
  FaLocationDot,
  FaPalette,
  FaPhone,
  FaPlus,
  FaQrcode,
  FaQuestion,
  FaShieldHalved,
  FaTag,
  FaUserClock,
  FaUserGear,
  FaUserGroup,
  FaUserPlus,
  FaUsers,
  FaUsersGear,
  FaWrench,
  FaLayerGroup
} from "react-icons/fa6";
import {
  FaHandsHelping,
  FaHome
} from "react-icons/fa";

const menuData = [
  {
    type: "item",
    name: "Anasayfa",
    icon: <FaHome />,
    path: "/",
  },
  {
    type: "item",
    name: "Grup Yönetimi",
    icon: <FaLayerGroup />,
    path: "/group-list",
  },

  { type: "title", name: "Kart İşlemleri" },
  {
    type: "block",
    name: "Kart Yönetimi",
    icon: <FaIdCard />,
    items: [
      { name: "Kart Listesi", icon: <FaList />, path: "/" },
      { name: "Yeni Kart Oluştur", icon: <FaPlus />, path: "/" },
      { name: "QR Kod Yönetimi", icon: <FaQrcode />, path: "/" },
    ],
  },

  { type: "title", name: "Firma ve Kullanıcı Yönetimi" },
  {
    type: "block",
    name: "Firma Yönetimi",
    icon: <FaBuilding />,
    items: [
      { name: "Şirket Bilgileri", icon: <FaPalette />, path: "/" },
      { name: "Marka Ayarları", icon: <FaTag />, path: "/" },
      { name: "Sosyal Medya Linkleri", icon: <FaLink />, path: "/" },
    ],
  },
  {
    type: "block",
    name: "Kullanıcılar / Personel",
    icon: <FaUsersGear />,
    items: [
      { name: "Personel Listesi", icon: <FaUsers />, path: "/" },
      { name: "Yeni Kullanıcı Ekle", icon: <FaUserPlus />, path: "/" },
      { name: "Rol & Yetkiler", icon: <FaUserGear />, path: "/" },
      { name: "Aktivite Geçmişi", icon: <FaUserClock />, path: "/" },
    ],
  },
  {
    type: "block",
    name: "Admin Yönetimi",
    icon: <FaUsersGear />,
    items: [
      { name: "Admin Listesi", icon: <FaUsers />, path: "/admin-list" },
      { name: "Yeni Admin Ekle", icon: <FaUserPlus />, path: "/admin-create" }
    ],
  },

  { type: "title", name: "Analiz & Ayarlar" },
  {
    type: "block",
    name: "Analitik & Raporlama",
    icon: <FaChartColumn />,
    items: [
      { name: "Görüntülenme Raporu", icon: <FaEye />, path: "/" },
      { name: "Lokasyon Bazlı Tıklamalar", icon: <FaLocationDot />, path: "/" },
      { name: "Zaman Bazlı İstatistikler", icon: <FaClock />, path: "/" },
      { name: "Kullanıcı Etkileşimleri", icon: <FaUserGroup />, path: "/" },
    ],
  },
  {
    type: "block",
    name: "Ayarlar",
    icon: <FaGear />,
    items: [
      { name: "Genel Ayarlar", icon: <FaWrench />, path: "/" },
      { name: "Hesap Ayarları", icon: <FaUserGear />, path: "/" },
      { name: "Güvenlik & Yetkilendirme", icon: <FaShieldHalved />, path: "/" },
    ],
  },

  {
    type: "block",
    name: "Destek / Yardım",
    icon: <FaHandsHelping />,
    items: [
      { name: "SSS", icon: <FaQuestion />, path: "/" },
      { name: "Destek Talebi Oluştur", icon: <FaPhone />, path: "/" },
      { name: "Dokümantasyon", icon: <FaBook />, path: "/" },
    ],
  },
];

export default menuData;