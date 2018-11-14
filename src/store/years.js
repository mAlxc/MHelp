/**
 * @description Store Module for 'Fiches'
 *
 */
const PREFIXID = 'yr_'

export default {
  namespaced: true,
  state: {
    counter: 0,
    years: []
  },
  actions: {
    aAddYear ({ state, commit }, year) {
      return new Promise((resolve, reject) => {
        if (state.years.find(m => m.name.toUpperCase() === year.toUpperCase())) {
          reject(new Error({isIn: true, message: 'Deja present'}))
        } else {
          commit('mAddYear', year)
          resolve({isIn: false, message: 'Ajouter'})
        }
      })
    }
  },
  mutations: {
    mAddYear (state, year) {
      state.years.push({
        id: PREFIXID + state.counter++,
        name: year
      })
    }
  },
  getters: {
  }
}
