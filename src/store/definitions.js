/**
 * @description Store Module for 'Fiches'
 *
 */
function initialState () {
  return {
    total: 0,
    definitions: [{name: 'Chimie', children: [{name: 'Organique', children: [{icon: 'test-tube', name: 'test'}]}]}, {name: 'Physique', children: []}, {name: 'Maths', children: []}]
  }
}

export default {
  namespaced: true,
  state: initialState,
  actions: {
    initModule ({ commit }) {
      if (this.state.definitions === undefined) {
        commit('reset')
      }
    }
  },
  mutations: {
    reset (state) {
      // acquire initial state
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    newDefinition (state, val) {
      state.definitions.push(val)
    }
  }
}
