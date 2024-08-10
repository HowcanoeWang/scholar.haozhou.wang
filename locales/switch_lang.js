// js/switch-lang.js
i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        }
    }, function(err, t) {
    // init set content to the default language
    // updateContent();
    jqueryI18next.init(i18next, $);
});

function updateContent() {
    // document.getElementById('welcome-text').innerHTML = i18next.t('welcome');
    $('body').localize();
}

function switchLanguage(lang) {
    i18next.changeLanguage(lang, function(err, t) {
        if (err) return console.log('something went wrong loading', err);
        updateContent();
    });
}
