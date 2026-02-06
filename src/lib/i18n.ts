import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => fetch('./locales/en.json').then((res) => res.json()));
register('cn', () => fetch('./locales/cn.json').then((res) => res.json()));
register('jp', () => fetch('./locales/jp.json').then((res) => res.json()));

// Initialize logic
// This should be called in your layout or root component
export function setupI18n() {
    // Basic detection
    const browserLang = getLocaleFromNavigator();
    let initialLocale = 'en';

    if (browserLang) {
        if (browserLang.toLowerCase().includes('zh')) {
            initialLocale = 'cn';
        } else if (browserLang.toLowerCase().includes('jp') || browserLang.toLowerCase().includes('ja')) {
            initialLocale = 'jp';
        }
    }

    // Check URL param ?lang=
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam && ['en', 'cn', 'jp'].includes(langParam)) {
        initialLocale = langParam;
    }

    return init({
        fallbackLocale: 'en',
        initialLocale: initialLocale,
    });
}
