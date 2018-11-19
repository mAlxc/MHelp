import Firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    user: null,
    name: '',
    firstname: '',
    email: '',
    birthday: null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser (state, user) { // eslint-disable-next-line
      state.user = Firebase.auth().currentUser
      if (user) {
        state.name = user.name
        state.firstName = user.name
        state.email = state.user.email
        state.birthday = user.birthday
      }
    },
    mLogOff: state => {
      state.user = null
    }
  },
  actions: {
    setUser (context) {
      context.commit('setUser')
    },
    aSignUp ({commit, dispatch}, user) {
      commit('setUser', user)
      dispatch('aSaveUserInfos')
    },
    login ({commit}, user) {
      Firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(
          infoCo => {
            commit('setUser')
          },
          error => {
            alert(error.message)
          }
        )
    },
    logOff ({commit}) {
      Firebase.auth()
        .signOut()
        .then((ing) => {
          commit('mLogOff')
        }).catch((e) => {
          console.log(e)
        })
    },
    /**
     * permet de sauvegarder les informations de l'utilisateur en ligne
     * @param {*} param0
     */
    aSaveUserInfos ({state}) {
      let userId = state.user.uid
      let email = state.user.email
      db.collection('users').doc(userId).set({
        name: state.name,
        firstName: state.firstname,
        email: email,
        birthday: state.birthday
      })
        .then(function () {
          console.log('Document written')
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
