import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Periodic from '@/views/Chimie/Periodic'
import GestYears from '@/views/Year/Gest'
import GestMats from '@/views/Matiere/Gest'
import Home from '@/views/Home'
// import Creator from '@/views/Inspectors/DetailsCours'
import DefinitionsList from '@/views/Definition/DefinitionList'
import Charge from '@/views/Fiches/Charge.vue'
import MesCours from '@/views/Fiches/MesCours.vue'

import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import Error404 from '@/components/Error404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, // elemnt afficehr au sein du router view
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/years',
      name: 'yearsGest',
      meta: {
        requiresAuth: true
      },
      component: GestYears // elemnt afficehr au sein du router view
    },
    {
      path: '/matieres',
      name: 'matieresGest',
      meta: {
        requiresAuth: true
      },
      component: GestMats // elemnt afficehr au sein du router view
    },
    {
      path: '/periodic',
      name: 'periodic',
      meta: {
        requiresAuth: true
      },
      component: Periodic // elemnt afficehr au sein du router view
    },
    {
      path: '/definitions',
      name: 'definitions',
      meta: {
        requiresAuth: true
      },
      component: DefinitionsList // elemnt afficehr au sein du router view
    },
    {
      path: '/charge',
      name: 'charge',
      meta: {
        requiresAuth: true
      },
      component: Charge // elemnt afficehr au sein du router view
    },
    {
      path: '/fiches',
      name: 'fiches',
      meta: {
        requiresAuth: true
      },
      component: MesCours // elemnt afficehr au sein du router view
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      component: HelloWorld // elemnt afficehr au sein du router view
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
