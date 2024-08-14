// 获取URL中的lang参数
function getLangFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let browserLanguage = navigator.language || navigator.userLanguage;
    console.log("Browser Language:", browserLanguage);

    // 获取 URL 中的 lang 参数
    let langFromUrl = urlParams.get('lang');

    // 如果 URL 中有 lang 参数，直接返回该参数值
    if (langFromUrl) {
        return langFromUrl;
    }
    
    // 否则，判断浏览器语言
    return convertLangCode(browserLanguage) || 'en'; // 如果没有lang参数，默认使用'en'
}

const lng = getLangFromUrl();

i18next
    .use(i18nextHttpBackend)
    .init({
        lng: lng,
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        }
    }, function(err, t) {
    // init set content to the default language
    jqueryI18next.init(i18next, $);
    updateContent();
});

// 将语言代码转换为指定格式
function convertLangCode(language) {
    switch (language.toLowerCase()) {
        case 'zh-cn':
        case 'zh':
            return 'cn';
        case 'en-us':
        case 'en':
            return 'en';
        case 'ja-jp':
        case 'ja':
            return 'jp';
        default:
            return 'en'; // 默认返回'en'，可以根据需要调整
    }
}

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
