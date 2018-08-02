const initialState = {
  definitions: []
}
export default {
  namespaced: true,
  state: {
    definitions: []
  },
  actions: {
    initModule ({ commit }) {
      Lf.getItem('glossaire', (err, res) => {
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
      state.definitions = val.definitions
    },
    saveDefinition (state, def) {
      console.info(def)
    }
  }
}
