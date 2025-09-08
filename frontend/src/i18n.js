// 🌍 Library imports
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// 📁 Translation files
import nl from "./locales/nl/translation.json"
import en from "./locales/en/translation.json"

/**
 * Initialize i18next for internationalization (i18n) in the app.
 *
 * Loads translations for supported languages and configures React integration.
 *
 * - `resources`: Object containing translation files for each language.
 * - `lng`: Default language of the app.
 * - `fallbackLng`: Language to use if the current language key is missing.
 * - `interpolation.escapeValue`: Disable escaping because React handles it safely.
 *
 * @module i18n
 */
i18n
  .use(initReactI18next) // Integrates i18next with React
  .init({
    resources: {
      en: { translation: en }, // English translations
      nl: { translation: nl }, // Dutch translations
    },
    lng: "en", // Default language
    fallbackLng: "nl", // Use Dutch if translation key is missing in current language
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  })

export default i18n
