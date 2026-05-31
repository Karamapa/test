(function () {
  const defaultLanguage = "en";
  const supportedLanguages = ["en", "sk", "de", "ru"];
  const languageButtons = document.querySelectorAll("[data-lang]");
  const translatableNodes = document.querySelectorAll("[data-i18n]");

  function getInitialLanguage() {
    const stored = localStorage.getItem("portfolio-language");
    if (supportedLanguages.includes(stored)) {
      return stored;
    }

    const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
    return supportedLanguages.includes(browserLanguage) ? browserLanguage : defaultLanguage;
  }

  function translate(language) {
    const dictionary = window.portfolioTranslations[language] || window.portfolioTranslations[defaultLanguage];

    document.documentElement.lang = language;
    localStorage.setItem("portfolio-language", language);

    translatableNodes.forEach((node) => {
      const key = node.dataset.i18n;
      const value = dictionary[key] || window.portfolioTranslations[defaultLanguage][key];
      if (value) {
        node.textContent = value;
      }
    });

    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => translate(button.dataset.lang));
  });

  translate(getInitialLanguage());
})();
