import {Bolt, House, Users,ChartColumn, Briefcase, CreditCard, IdCard} from "lucide-react"

const menuData = [
  {
    type: "item",
    name: "Anasayfa",
    icon: <House size={20}/>,
    path: "/",
  },
  {
    type: "item",
    name: "Card Yönetimi",
    icon: <CreditCard size={20} />,
    path: "/card-management",
  },
  {
    type: "item",
    name: "Gruplar",
    icon: <Users size={20}/>,
    path: "/group-management",
  },
  {
    type:"item",
    name:"Şirket Profili",
    icon:<Briefcase size={20}/>,
    path:"/company-profile"
  },
  {
    type:"item",
    name:"Bağlantılar",
    icon:<IdCard size={20}/>,
    path:"/connections"
  },
  {
    type:"item",
    name:"Analiz",
    icon:<ChartColumn size={20}/>,
    path:"/analize"
  },
  {
    type: "item",
    name: "Ayarlar",
    icon: <Bolt size={20}/>,
    path: "/settings",
  },
  // { type: "title", name: "Kart İşlemleri" },
  // {
  //   type: "block",
  //   name: "Admin Yönetimi",
  //   icon: <Bolt />,
  //   items: [
  //     { name: "Admin Listesi", icon: <Bolt />, path: "/a" },
  //     { name: "Yeni Admin Ekle", icon: <Bolt />, path: "/" }
  //   ],
  // },
];

export default menuData;