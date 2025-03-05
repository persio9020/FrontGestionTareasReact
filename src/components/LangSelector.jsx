
import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";

function LangSelector() {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState("EN");

    const getUserBrowserLanguage = () => {
        const lang = window.navigator.language;

        if (lang.includes("es")) return "es";
        if (lang.includes("en")) return "en";

        return "en";
    };

    const countryCodeToLangCode = (countryCode) => {
        const country = countryCode.toLowerCase();

        if (country.includes("us")) return "en";
        if (country.includes("es")) return "es";

        return "en";
    };

    const handleLangSelect = (countryCode) => {
        const currentLang = countryCodeToLangCode(countryCode);
        i18n.changeLanguage(currentLang);

        setLang(countryCode);
    };

    useEffect(() => {
        const userBrowserLang = getUserBrowserLanguage();

        i18n.changeLanguage(userBrowserLang);
        setLang(userBrowserLang);
    }, []);

    return (
        <ReactFlagsSelect
            countries={["US", "ES"]}
            customLabels={{ US: "EN", ES: "ES" }}
            selected={lang.toUpperCase()}
            onSelect={handleLangSelect}
        />
    );
}

export default LangSelector;
