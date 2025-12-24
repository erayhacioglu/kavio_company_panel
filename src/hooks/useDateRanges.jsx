import { useMemo } from "react";

const useDateRanges = () => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return useMemo(() => {
    const now = new Date();

    /* -----------------------------
        AY BAŞLANGIÇ / BİTİŞ
    ----------------------------- */
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    /* -----------------------------
        HAFTA BAŞLANGIÇ / BİTİŞ
        (ISO – Pazartesi başlangıç)
    ----------------------------- */
    const day = now.getDay(); // 0=pazar
    const isoDay = day === 0 ? 7 : day;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - isoDay + 1);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return {
      monthStart: formatDate(monthStart),
      monthEnd: formatDate(monthEnd),
      weekStart: formatDate(weekStart),
      weekEnd: formatDate(weekEnd),
    };
  }, []);
};

export default useDateRanges;
