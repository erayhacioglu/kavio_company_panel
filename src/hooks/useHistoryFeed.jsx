import useSWRInfinite from "swr/infinite";
import { fetchHistory } from "../services/history";

// sonsuz kaydırma + 30sn auto-refresh
export function useHistoryFeed({ scope = "company", scopeId, pageSize = 30, filters = {} }) {
  const getKey = (index, prev) => {
    if (prev && !prev.hasMore) return null;
    const cursor = index === 0 ? undefined : prev?.nextCursor;
    // filtreler key'e dahil edilmeli ki değişince yeniden fetch etsin
    return ["history", scope, scopeId || "all", cursor || "first", pageSize, JSON.stringify(filters)];
  };

  const fetcher = (_key, sc, id, cursorKey, limit, filtersJson) => {
    return fetchHistory({
      scope: sc,
      scopeId: id === "all" ? undefined : id,
      cursor: cursorKey === "first" ? undefined : cursorKey,
      limit,
      filters: JSON.parse(filtersJson || "{}"),
    });
  };

  const swr = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000, // 30 sn'de bir yenile
    parallel: true,
  });

  const pages = swr.data || [];
  const items = pages.flatMap(p => p.items || []);
  const isEnd = pages.length > 0 && pages[pages.length - 1]?.hasMore === false;

  return { ...swr, items, isEnd };
}
