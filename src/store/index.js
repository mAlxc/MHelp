import Vue from 'vue'
import Vuex from 'vuex'
// import fiches from './old/fiches'
// import definitions from './old/definitions'
// import matieres from './matieres'
// import years from './old/years'
// import user from './old/user'
import cursus from './cursus'
import userData from './userData'
// import years from './years'
// import createPersistedState from 'vuex-persistedstate'

import createEasyFirestore from 'vuex-easy-firestore'

Vue.use(Vuex)

const easyFirestore = createEasyFirestore([cursus, userData], {logging: true})

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help',
    db: null
  },
  actions: {
    saveMatieres () {
      console.log('test')
    },
    initdb ({ commit }, val) {
      commit('toSb', val)
    },
    sync ({ dispatch }) {
      console.log('debut sync all')
      dispatch('cursus/sync')
      dispatch('years/sync')
      dispatch('matieres/sync')
    },
    get ({ dispatch }) {
      dispatch('cursus/get')
      dispatch('years/get')
      dispatch('matieres/get')
    }
  },
  mutations: {
    toSb (state, val) {
      state.db = val
    }
  },
  modules: { },
  plugins: [easyFirestore
  ]
})

/*
let persistData = createPersistedState({
  key: 'Fiches',
  storage: localStorage,
  paths: [],
  reducer: state => {
    const obj = {
      definitions: state.definitions,
      matieres: {
        all: state.matieres.all,
        inPeding: state.matieres.inPeding,
        pendingId: state.matieres.pendingId
      },
      years: {
        all: state.years.all,
        inPeding: state.years.inPeding,
        pendingId: state.years.pendingId
      },
      cursus: {
        all: state.cursus.all,
        inPeding: state.cursus.inPeding,
        pendingId: state.cursus.pendingId
      }
    }
    return obj
  }
}) */
