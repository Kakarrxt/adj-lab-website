import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng:'en',
        fallbackLng: "en",
        debug: false,
        ns: [
            'general',
            'user-management',
        ],
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },

    });

export default i18n;
