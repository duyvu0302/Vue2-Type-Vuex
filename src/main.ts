import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import store from './store';
import i18n from './i18n';
import './vee-validate';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.directive('color', function(el, binding) {
    el.style.backgroundColor = binding.value;
});

new Vue({
    router,
    store,
    i18n,
    el: '#app',
    render: (h) => h(App),
}).$mount('#app');
