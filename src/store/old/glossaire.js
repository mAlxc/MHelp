const initialState = {
  definitions: [{
    title: 'exemple',
    content: 'this is an exemple'
  }]
}
export default {
  namespaced: true,
  state: {
    definitions: []
  },
  actions: {
    initModule ({ commit }) {
      Lf.$storageConfig({
        name: 'MyApp',
        description: 'Base de données interne a lapplication',
        version: 1.0,
        storeName: name
      })
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
