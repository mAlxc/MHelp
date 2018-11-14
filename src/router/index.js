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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home // elemnt afficehr au sein du router view
    },
    {
      path: '/years',
      name: 'yearsGest',
      component: GestYears // elemnt afficehr au sein du router view
    },
    {
      path: '/matieres',
      name: 'matieresGest',
      component: GestMats // elemnt afficehr au sein du router view
    },
    {
      path: '/periodic',
      name: 'periodic',
      component: Periodic // elemnt afficehr au sein du router view
    },
    {
      path: '/definitions',
      name: 'definitions',
      component: DefinitionsList // elemnt afficehr au sein du router view
    },
    {
      path: '/charge',
      name: 'charge',
      component: Charge // elemnt afficehr au sein du router view
    },
    {
      path: '/fiches',
      name: 'fiches',
      component: MesCours // elemnt afficehr au sein du router view
    },
    {
      path: '/about',
      name: 'about',
      component: HelloWorld // elemnt afficehr au sein du router view
    }
  ]
})
