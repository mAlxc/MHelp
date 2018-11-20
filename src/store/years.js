/**
 * @description Store Module for 'Fiches'
 *
 */

const COLLECTION = 'years'

export default {
  namespaced: true,
  state: {
    counter: 0,
    years: []
  },
  actions: {
    aAddYear ({ state, commit, rootState }, year) {
      let id = year.name + '_' + year.cursus
      let ref = db.collection(COLLECTION).doc(id)
      const result = state.years.find(obj => {
        return obj.id === id
      })
      if (!result) {
        let y = {
          name: year.name,
          cursus: year.cursus,
          id_owner: rootState.user.user.uid,
          create_at: Date.now(),
          update_at: Date.now()
        }
        ref.set(y)
          .then(() => {
            y.id = id // path pour les corespondances
            if (!result) {
              commit('mAddYear', y)
            }
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      } else {
        ref.update({
          'update_at': Date.now()
        }).then(function () {
          console.log('Document successfully updated!')
        })
      }

      console.log(ref)
    },
    // action a lancer a lancement de l'application afin de recupere les années apres le set du user
    aGetYears ({ state, commit, rootState }) {
      if (navigator.onLine) {
        if (rootState.user.user) {
          let uid = rootState.user.user.uid
          db.collection(COLLECTION).where('id_owner', '==', uid).get().then(d => {
            if (!d.empty) {
              let data = []
              d.forEach(element => {
                const t = element.data()
                t.path = element.ref.path
                t.id = element.id
                data.push(t)
                commit('mAddYear', t)
              })
            } else {
              console.log('no years')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  },
  mutations: {
    mAddYear (state, year) {
      const result = state.years.find(obj => {
        return obj.id === year.id
      })
      if (!result) {
        state.years.push(year)
      }
    }
  },
  getters: {
  }
}
