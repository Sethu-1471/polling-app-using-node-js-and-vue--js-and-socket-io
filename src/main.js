import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import VueToastify from "vue-toastify";
import DatetimePicker from 'vuetify-datetime-picker'
// import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker)
Vue.use(VueToastify);
Vue.config.productionTip = false
Vue.prototype.$hostname = (Vue.config.productionTip) ? this.$hostname : 'http://localhost:3500';

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
