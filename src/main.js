import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import brapiapi from './mixins/brapiapi.js'

Vue.mixin(brapiapi)

Vue.use(BootstrapVue)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
