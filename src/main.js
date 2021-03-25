// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSpinners from 'vue-spinners'
import { BootstrapVue, BIconHeart, BIconSearch, BIconEye } from 'bootstrap-vue'
import VueYoutube from 'vue-youtube'
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueSpinners)
Vue.use(BootstrapVue)
Vue.component('BIconHeart', BIconHeart)
Vue.component('BIconSearch', BIconSearch)
Vue.component('BIconEye', BIconEye)
Vue.use(VueAxios, axios)
Vue.use(VueYoutube)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
