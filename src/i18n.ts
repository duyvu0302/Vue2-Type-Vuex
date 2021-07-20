import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './locales/en.json';
import vi from './locales/vi.json';
import eng from 'vee-validate/dist/locale/en.json';
import vn from 'vee-validate/dist/locale/vi.json';
const languages = {
    en: {
        ...en,
        validation: {
            ...eng.messages,
            ...en.messages,
        },
    },
    vi: {
        ...vi,
        validation: {
            ...vi.messages,
            ...vn.messages,
        },
    },
};
const messages = Object.assign(languages);

Vue.use(VueI18n);
const locale = JSON.parse(localStorage.getItem('i18n')!);
export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || locale || 'vi',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || locale || 'vi',
    messages,
});
