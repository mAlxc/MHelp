import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Periodic from '@/views/Chimie/Periodic'
import Creator from '@/views/Creator/Creator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld // elemnt afficehr au sein du router view
    },
    {
      path: '/periodic',
      name: 'periodic',
      component: Periodic // elemnt afficehr au sein du router view
    },
    {
      path: '/creator',
      name: 'creator',
      component: Creator // elemnt afficehr au sein du router view
    },
    {
      path: '/about',
      name: 'about',
      component: HelloWorld // elemnt afficehr au sein du router view
    }
  ]
})
