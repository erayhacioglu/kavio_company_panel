export const cardStatus = {
    ACTIVE:{
        text:"Active",
        color:"success"
    },
    SETUP:{
        text:"Setup",
        color:"warning"
    },
}

export const historyType = {
    // Connection Events
    CONNECTION_CREATED: "Bağlantı oluşturuldu",
    CONNECTION_ACCEPTED: "Bağlantı kabul edildi",
    CONNECTION_REJECTED: "Bağlantı reddedildi",
    CONNECTION_REMOVED: "Bağlantı kaldırıldı",

    // Social Media Events
    SOCIAL_MEDIA_ADDED: "Sosyal medya hesabı eklendi",
    SOCIAL_MEDIA_BULK_UPDATED: "Sosyal medya hesabı güncellendi",
    SOCIAL_MEDIA_UPDATED: "Sosyal medya hesabı güncellendi",
    SOCIAL_MEDIA_REMOVED: "Sosyal medya hesabı kaldırıldı",

    // Profile Picture Events
    PROFILE_PICTURE_UPDATED: "Profil resmi güncellendi",
    PROFILE_PICTURE_REMOVED: "Profil resmi kaldırıldı",

    // Banner Picture Events
    BANNER_PICTURE_UPDATED: "Banner resmi güncellendi",
    BANNER_PICTURE_REMOVED: "Banner resmi kaldırıldı",

    // Catalog Events
    CATALOG_ADDED: "Katalog eklendi",
    CATALOG_UPDATED: "Katalog güncellendi",
    CATALOG_REMOVED: "Katalog kaldırıldı",

    // Link Events
    LINK_ADDED: "Link eklendi",
    LINK_UPDATED: "Link güncellendi",
    LINK_BULK_UPDATED: "Link güncellendi",
    LINK_REMOVED: "Link kaldırıldı",

    // Bank Account Info Events
    BANK_ACCOUNT_INFO_ADDED: "Banka hesabı eklendi",
    BANK_ACCOUNT_INFO_BULK_UPDATED: "Banka hesabı güncellendi",
    BANK_ACCOUNT_INFO_UPDATED: "Banka hesabı güncellendi",
    BANK_ACCOUNT_INFO_REMOVED: "Banka hesabı kaldırıldı",

    // Company Info Events
    COMPANY_INFO_ADDED: "Şirket bilgisi eklendi",
    COMPANY_INFO_UPDATED: "Şirket bilgisi güncellendi",
    COMPANY_INFO_REMOVED: "Şirket bilgisi kaldırıldı",

    // Crypto Wallet Info Events
    CRYPTO_WALLET_INFO_ADDED: "Kripto cüzdan bilgisi eklendi",
    CRYPTO_WALLET_INFO_UPDATED: "Kripto cüzdan bilgisi güncellendi",
    CRYPTO_WALLET_INFO_REMOVED: "Kripto cüzdan bilgisi kaldırıldı",

    // User Information Events
    CONTACT_INFO_CREATED: "Kullanıcı bilgileri eklendi",
    CONTACT_INFO_UPDATED: "Kullanıcı bilgileri güncellendi",
    CONTACT_INFO_BULK_UPDATED: "Kullanıcı bilgileri güncellendi",
    CONTACT_INFO_DELETED: "Kullanıcı bilgileri silindi",

    USER_INFO_UPDATED: "Kullanici bilgisi guncellendi",

    // Card Events
    CARD_CREATED: "Kart oluşturuldu",
    CARD_ACTIVATED: "Kart aktif edildi",
    CARD_DEACTIVATED: "Kart deaktif edildi"
}

// Event category mapping helper
export const getEventCategory = (eventType) => {
    if (!eventType) return "card";
    
    const type = eventType.toUpperCase();
    
    if (type.includes("CONNECTION")) return "connection";
    if (type.includes("SOCIAL")) return "social";
    if (type.includes("PROFILE_PICTURE") || type.includes("BANNER_PICTURE")) return "profile";
    if (type.includes("CATALOG")) return "catalog";
    if (type.includes("LINK")) return "link";
    if (type.includes("BANK")) return "bank";
    if (type.includes("COMPANY")) return "company";
    if (type.includes("CRYPTO")) return "crypto";
    if (type.includes("CONTACT") || type.includes("USER_INFO")) return "contact";
    if (type.includes("CARD")) return "card";
    
    return "card";
}
