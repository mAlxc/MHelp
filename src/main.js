// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueLocaleForage from 'vue-localforage'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(VueLocaleForage)
/*
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
}) */

Vue.use(Vuetify, {
  theme: {
    // primary: '#1976D2',
    // secondary: '#ebeff2',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
    primary: '#5488c7',
    secondary: '#EDEDED',
    accent: '#FFC646',
    error: '#FE7572',
    info: '#71BFF1',
    success: '#51D2B7', // #51d2b7
    warning: '#F7A600'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
