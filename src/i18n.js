import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import voltconfig from './volt.config.js';

const resources = {
  en: {
    translation: {
      "upload-title": "Upload your folder here",
      "button-sort-images": "Sort Images",
      "button-clear-upload": "Clear upload",
      "button-download-images": "Download images",
      "p-drag-upload": "Drag 'n' drop some files here, or click to select files",
      "screen-label-loading": "Loading...",
    }
  },
  de: {
    translation: {
      "upload-title": "Lade deinen Ordner hier hoch",
      "button-sort-images": "Bilder sortieren",
      "button-clear-upload": "Upload löschen",
      "button-download-images": "Bilder herunterladen",
      "p-drag-upload": "Ziehe Dateien hier hinein oder klicke, um welche auszuwählen",
      "screen-label-loading": "Lädt...",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: voltconfig.lang,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;