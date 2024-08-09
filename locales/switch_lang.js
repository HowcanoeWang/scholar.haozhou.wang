// js/switch-lang.js
i18next.use(i18nextHttpBackend).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
        loadPath: '/locales/{{lng}}/translation.json'
    }
}, function(err, t) {
    // init set content to the default language
    updateContent();
});

function updateContent() {
    document.getElementById('welcome-text').innerHTML = i18next.t('welcome');
}

function switchLanguage(lang) {
    i18next.changeLanguage(lang, function(err, t) {
        if (err) return console.log('something went wrong loading', err);
        updateContent();
    });
}
