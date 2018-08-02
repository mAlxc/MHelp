/**
 * @description Store Module for 'Fiches'
 *
 */
const initialState = {
  myFiches: [],
  myStudies: ['']
}

export default {
  namespaced: true,
  state: {
    myFiches: [],
    myStudies: []
  },
  actions: {
    initModule ({commit}) {
      Lf.getItem('Fiches', (err, res) => {
        if (err) {
          console.error(err)
        } else {
          if (res === null) {
            commit('initState', initialState)
          } else {
            commit('initState', res)
          }
        }
      })
    }
  },
  mutations: {
    initState (state, val) {
      state.myFiches = val.myFiches
      state.myStudies = val.myStudies
    },
    saveFiche (state, fiche) {
      console.info(fiche)
    }
  }
}
