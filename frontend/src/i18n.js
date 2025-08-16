import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import nl from "./locales/nl/translation.json";
import en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl }
  },
  lng: "en",
  fallbackLng: "nl",
  interpolation: { escapeValue: false }
});

export default i18n;
