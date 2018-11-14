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
        if (state.matieres.find(m => m.name.toUpperCase() === mat.name.toUpperCase())) {
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
        year_id: mat.year,
        name: mat.name,
        icon: 'mdi-calculator-variant'
      })
    }
  },
  getters: {

  }
}
