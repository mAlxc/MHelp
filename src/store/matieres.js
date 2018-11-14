const PREFIXID = 'm_'

export default {
  namespaced: true,
  state: {
    matieres: [],
    counter: 0
  },
  actions: {
    aAddMatiere ({ state, commit }, mat) {
      return new Promise((resolve, reject) => {
        if (state.matieres.find(m => m.name.toUpperCase() === mat.toUpperCase())) {
          reject(new Error({isIn: true, message: 'Deja present'}))
        } else {
          commit('mAddMatiere', mat)
          resolve({isIn: false, message: 'Ajouter'})
        }
      })
    }
  },
  mutations: {
    mAddMatiere (state, mat) {
      state.matieres.push({
        id: PREFIXID + state.counter++,
        name: mat,
        icon: 'mdi-calculator-variant'
      })
    }
  },
  getters: {

  }
}
