import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      key: "Welcome to React and react",
    },
  },
  de: {
    translation: {
      key: "Bienvenue à React et react-i18next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",

  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
