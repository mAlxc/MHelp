import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './fiches'
import definitions from './definitions'
import matieres from './matieres'
import years from './years'
import user from './user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help'
  },
  actions: {
    saveMatieres () {
      console.log('test')
    }
  },
  modules: {
    fiches,
    definitions,
    matieres,
    years,
    user
  },
  plugins: [
    createPersistedState({
      key: 'Fiches',
      storage: localStorage,
      paths: [],
      reducer: state => {
        const obj = {
          definitions: state.definitions,
          matieres: state.matieres,
          years: state.years
        }
        return obj
      }
    })
  ]
})
