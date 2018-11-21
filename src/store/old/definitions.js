/**
 * @description Store Module for 'Fiches'
 *
 */
const PREFIXID = 'df_'

export default {
  namespaced: true,
  state: {
    counter: 0,
    definitions: []
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
      state.definitions.push({
        id: PREFIXID + state.counter++,
        name: mat,
        icon: 'mdi-information'
      })
    }
  },
  getters: {
    gDefForMat: (state) => (id) => {
      return state.definitions.filter(todo => todo.matiere_id === id)
    },
    gNumDefForMat: (state) => (id) => {
      return state.definitions.filter(todo => todo.matiere_id === id).length
    }
  }
}
