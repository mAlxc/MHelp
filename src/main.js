// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'animate.css/animate.css' // Ensure you are using css-loader
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueLocaleForage from 'vue-localforage'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import store from './store'
import VueMathjax from 'vue-mathjax'

Vue.config.productionTip = false

Vue.use(VueLocaleForage)
Vue.use(VueMathjax)
Vue.use(Vuetify, {
  theme: {
    primary: '#42A5F5',
    secondary: '#2196F3',
    accent: '#304FFE',
    error: '#D50000',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
