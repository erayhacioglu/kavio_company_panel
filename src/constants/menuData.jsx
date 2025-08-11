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
    path: "/group-management",
  },
  {
    type: "item",
    name: "Card Yönetimi",
    icon: <FaIdCard />,
    path: "/card-management",
  },

  // { type: "title", name: "Kart İşlemleri" },
  {
    type: "block",
    name: "Firma Yönetimi",
    icon: <FaBuilding />,
    items: [
      { name: "Şirket Bilgileri", icon: <FaPalette />, path: "/company-information" },
      { name: "Marka Ayarları", icon: <FaTag />, path: "/" },
      { name: "Sosyal Medya Linkleri", icon: <FaLink />, path: "/" },
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
];

export default menuData;