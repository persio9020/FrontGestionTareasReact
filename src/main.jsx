import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import store from './store/store'
import {Provider} from "react-redux";
import { initReactI18next } from "react-i18next";
import englishContent from "./lang/en.json";
import spanishContent from "./lang/es.json";
import i18n from "i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: englishContent,
        es: spanishContent,
    },
    fallbackLng: "es",

    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    </Provider>,
)
