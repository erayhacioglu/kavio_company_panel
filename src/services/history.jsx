// // Basit fetcher + history endpoint adaptörü
// export async function fetchHistory({ scope = "company", scopeId, cursor, limit = 30, filters = {} }) {
//   const params = new URLSearchParams();
//   params.set("scope", scope);           // company | card
//   if (scopeId) params.set("scopeId", scopeId);
//   params.set("limit", String(limit));
//   if (cursor) params.set("cursor", cursor);

//   // Filtreler: cardId, eventTypes[], dateFrom, dateTo
//   if (filters.cardId) params.set("cardId", filters.cardId);
//   if (Array.isArray(filters.eventTypes) && filters.eventTypes.length) {
//     for (const t of filters.eventTypes) params.append("eventTypes", t);
//   }
//   if (filters.dateFrom) params.set("dateFrom", filters.dateFrom); // ISO (YYYY-MM-DD)
//   if (filters.dateTo) params.set("dateTo", filters.dateTo);       // ISO (YYYY-MM-DD)

//   const res = await fetch(`/api/history?${params.toString()}`, { credentials: "include" });
//   if (!res.ok) throw new Error("History fetch failed");
//   return res.json(); // { items: [], nextCursor: string|undefined, hasMore: boolean }
// }


// DUMMY DATA versiyonu

export async function fetchHistory() {
  const now = new Date();

  const items = [
    {
      id: "1",
      type: "PROFILE_VIEW",
      occurredAt: new Date(now - 1000 * 60 * 3).toISOString(),
      cardOwner: { name: "Ahmet Yılmaz" },
      actor: { name: "Ziyaretçi #1234" },
    },
    {
      id: "2",
      type: "SOCIAL_CLICK",
      occurredAt: new Date(now - 1000 * 60 * 15).toISOString(),
      cardOwner: { name: "Merve Kaya" },
      target: { platform: "linkedin", label: "LinkedIn" },
    },
    {
      id: "3",
      type: "CONTACT_VIEW",
      occurredAt: new Date(now - 1000 * 60 * 60).toISOString(),
      cardOwner: { name: "Kadir Demir" },
      meta: {
        message: "Merhaba, kurumsal kart fiyatlarını öğrenebilir miyim?",
        email: "ziyaretci@example.com",
      },
    },
    {
      id: "4",
      type: "CONTACT_REQUEST_SENT",
      occurredAt: new Date(now - 1000 * 60 * 120).toISOString(),
      cardOwner: { name: "Zeynep Doğan" },
      target: { label: "E-posta" },
    },
    {
      id: "5",
      type: "SOCIAL_CLICK",
      occurredAt: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
      cardOwner: { name: "Ahmet Yılmaz" },
      target: { platform: "instagram", label: "@kavio.tr" },
    },
  ];

  return {
    items,
    nextCursor: null,
    hasMore: false,
  };
}

