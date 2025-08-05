import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Sayfa ilk yüklendiğinde, localStorage'dan dil kontrol et
const userLang =
  localStorage.getItem("language") || navigator.language.split("-")[0] || "tr";

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: userLang, // Eğer localStorage'da dil varsa, onu kullan
    fallbackLng: "tr", // Varsayılan dil
    debug: true,
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlar
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Dil dosyalarının yolu
    },
  });

// Dil değiştiğinde, seçilen dili localStorage'a kaydet
i18next.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18next;