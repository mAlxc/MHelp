import Firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    user: null,
    name: '',
    firstname: ''
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser: state => { // eslint-disable-next-line
      state.user = Firebase.auth().currentUser
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  }
}
