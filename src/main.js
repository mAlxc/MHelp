// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'animate.css/animate.css' // Ensure you are using css-loader
import Vue from 'vue'
import App from './App'
import Firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import VueLocaleForage from 'vue-localforage'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import VueMathjax from 'vue-mathjax'
import {config} from './configFirebase' // Ensure you are using css-loader
Firebase.initializeApp(config)
// gestion de firebase
// Initialize Firebase

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/sign-in')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends

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
// Initialize Cloud Firestore through Firebase
global.db = Firebase.firestore()

// Disable deprecated features
// eslint-disable-next-line
db.settings({
  timestampsInSnapshots: true
})
