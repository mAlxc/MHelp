const COLLECTION = 'matieres'

export default {
  namespaced: true,
  state: {
    matieres: [],
    counter: 0
  },
  actions: {
    aAddMatiere ({ state, commit, rootState }, matiere) {
      return new Promise((resolve, reject) => {
        let ref = db.collection(COLLECTION)
        let q = ref.where('id_year', '==', matiere.year).where('name', '==', matiere.name)
        q.get().then(e => {
          if (e.size > 0) {
            resolve(false)
          } else {
            console.log('on continue')
            let y = {
              name: matiere.name,
              id_year: matiere.year,
              id_owner: rootState.user.user.uid,
              icon: matiere.icon,
              create_at: Date.now(),
              update_at: Date.now()
            }
            console.log(y)
            db.collection(COLLECTION).doc().set(y).then(() => {
              console.log('toto')
              commit('mAddMatiere', y)
              resolve(true)
            })
              .catch(function (error) {
                console.error('Error adding document: ', error)
                resolve(false)
              })
          }
        }).catch((e) => {
          console.log(e)
          resolve(false)
        })
      })
    },
    // action a lancer a lancement de l'application afin de recupere les années apres le set du user
    aGetMatieres ({ commit, rootState }) {
      if (navigator.onLine) {
        if (rootState.user.user) {
          let uid = rootState.user.user.uid
          db.collection(COLLECTION).where('id_owner', '==', uid).get().then(d => {
            commit('mReset')
            if (!d.empty) {
              let data = []
              d.forEach(element => {
                const t = element.data()
                t.path = element.ref.path
                t.id = element.id
                data.push(t)
                commit('mAddMatiere', t)
              })
            } else {
              console.log('no matieres')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  },
  mutations: {
    mAddMatiere (state, matiere) {
      const result = state.matieres.find(obj => {
        return obj.id === matiere.id
      })
      if (!result) {
        state.matieres.push(matiere)
      }
    },
    mReset (state) {
      state[COLLECTION] = []
    }
  }
}
