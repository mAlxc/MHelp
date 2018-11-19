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
          reject(new Error({ isIn: true, message: 'Deja present' }))
        } else {
          commit('mAddMatiere', mat)
          resolve({ isIn: false, message: 'Ajouter' })
        }
      })
    },
    getAllMats ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        let uid = 'empty'
        if (rootState.user.user) {
          console.log(uid)
          uid = rootState.user.user.uid
        } else {
          reject(new TypeError('Erreur'))
        }

        console.log(uid)
        db.collection('matieres').doc(uid).get().then(d => {
          if (d.exists) {
            let datas = d.data()
            console.log(datas)
            commit('setMatieres', datas)
          } else {
            db.collection('matieres').doc(uid).set({list: {}})
          }
        })
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
    },
    setMatieres (state, lst) {
      state.matieres = lst.list
    }
  },
  getters: {

  }
}
