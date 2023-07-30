import { ThemeProvider } from "@emotion/react";
import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/header/Header";
import { en } from "@src/locales/en";
import { ru } from "@src/locales/ru";
import { Layout } from "@src/theme/layout/Layout";
import { theme } from "@src/theme/theme";
// import { i18n } from "@src/i18n/config";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en,
    ru,
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

function MyApp({ router, Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
