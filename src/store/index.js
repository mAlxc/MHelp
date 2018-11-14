import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './fiches'
import definitions from './definitions'
import matieres from './matieres'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help'
  },
  modules: {
    fiches,
    definitions,
    matieres
  },
  plugins: [
    createPersistedState({
      key: 'Fiches',
      storage: localStorage,
      paths: [],
      reducer: state => {
        const obj = {
          definitions: state.definitions,
          matieres: state.matieres
        }
        return obj
      }
    })
  ]
})
