import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './old/fiches'
import definitions from './old/definitions'
import matieres from './old/matieres'
import years from './old/years'
import user from './old/user'
import cursus from './cursus'
import yearsBis from './years'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help',
    db: null
  },
  actions: {
    saveMatieres () {
      console.log('test')
    },
    initdb ({commit}, val) {
      commit('toSb', val)
    }
  },
  mutations: {
    toSb (state, val) {
      state.db = val
    }
  },
  modules: {
    fiches,
    definitions,
    matieres,
    years,
    user,
    cursus,
    yearsBis
  }/*,
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
  ] */
})
