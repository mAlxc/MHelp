import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './fiches'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help'
  },
  modules: {
    fiches
  },
  plugins: [
    createPersistedState({
      key: 'Fiches',
      storage: localStorage,
      paths: [],
      reducer: state => {
        const obj = {
          fiches: {
            fiches: state.fiches.fiches,
            definitions: state.fiches.definition,
            times: state.fiches.times
          }}
        return obj
      }
    })
  ]
})
