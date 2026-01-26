import { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import useTheme from "./hooks/useTheme";
import { useDispatch } from "react-redux";
import { hydrateAuth } from "./redux/slices/userSlice";
import Axios from "./services/Axios";

const App = () => {
  useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
const [groupStats, setGroupStats] = useState([]);
const [userStats, setUserStats] = useState([]);
const [totalStats, setTotalStats] = useState({
  users: {
    total: 0,
    userNumber: 0,
  },
  groups: {
    total: 0,
    groupNumber: 0,
  },
});

console.log('groups', groups)
console.log('users', users)
console.log('groupStats', groupStats)
console.log('userStats', userStats)
console.log('totalStats', totalStats)


  const fetchStats = async () => {
  try {
    const res = await Axios.get("/statistics/company/1/monthly");
    processStatsToFlatModel(res.data);
  } catch (err) {
    console.error("Stats alınamadı:", err);
  }
};


const processStatsToFlatModel = (data) => {
  const groupsArr = [];
  const usersArr = []; // 👈 yeni
  const groupStatsArr = [];
  const userStatsArr = [];

  let groupInteractionTotal = 0;
  let userInteractionTotal = 0;

  Object.keys(data).forEach((key) => {
    const items = Array.isArray(data[key]) ? data[key] : [];
    if (!items.length) return;

    // ---------------- NO_GROUP → USER STATS ----------------
    if (key === "NO_GROUP") {
      const userMap = {}; // uniqueCode bazlı birleştir

      items.forEach((item) => {
        const card = item.card || {};
        const userKey = card.uniqueCode || item.id;

        const fullName =
          `${card.firstName || ""} ${card.lastName || ""}`.trim() || "Anonim";

        if (!usersArr.includes(fullName)) {
          usersArr.push(fullName); // 👈 users dizisine ekle
        }

        if (!userMap[userKey]) {
          userMap[userKey] = {
            date: item.month,
            fullName,
            cardName: card.cardName || "-",
            view: 0,
            download: 0,
            contact: 0,
            connection: 0,
            total: 0,
          };
        }

        userMap[userKey].view += item.viewCount || 0;
        userMap[userKey].download += item.downloadCount || 0;
        userMap[userKey].contact += item.contactCount || 0;
        userMap[userKey].connection += item.connectionCount || 0;
      });

      Object.values(userMap).forEach((u) => {
        u.total = u.view + u.download + u.contact + u.connection;
        userInteractionTotal += u.total;
        userStatsArr.push(u);
      });
    }

    // ---------------- GROUPS → GROUP STATS ----------------
    else {
      if (!groupsArr.includes(key)) groupsArr.push(key);

      const groupMonthMap = {};

      items.forEach((item) => {
        const date = item.month;

        if (!groupMonthMap[date]) {
          groupMonthMap[date] = {
            date,
            group: key,
            view: 0,
            download: 0,
            contact: 0,
            connection: 0,
            total: 0,
          };
        }

        groupMonthMap[date].view += item.viewCount || 0;
        groupMonthMap[date].download += item.downloadCount || 0;
        groupMonthMap[date].contact += item.contactCount || 0;
        groupMonthMap[date].connection += item.connectionCount || 0;
      });

      Object.values(groupMonthMap).forEach((g) => {
        g.total = g.view + g.download + g.contact + g.connection;
        groupInteractionTotal += g.total;
        groupStatsArr.push(g);
      });
    }
  });

  setGroups(groupsArr);
  setUsers(usersArr); // 👈 burada set ediyoruz
  setGroupStats(groupStatsArr);
  setUserStats(userStatsArr);

  setTotalStats({
    users: {
      total: userInteractionTotal,
      userNumber: usersArr.length,
    },
    groups: {
      total: groupInteractionTotal,
      groupNumber: groupsArr.length,
    },
  });
};



  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
