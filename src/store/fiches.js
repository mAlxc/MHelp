/**
 * @description Store Module for 'Fiches'
 *
 */
function initialState () {
  return {
    total: 1,
    fiches: {
      chimie: [{
        title: 'Introduction Generale',
        parts: [],
        id: 0,
        time: 'L1',
        type: 'Chimie'
      }]
    },
    definitions: [{
      id: 'def01',
      word: '',
      content: ''
    }],
    times: ['L1']
  }
}

export default {
  namespaced: true,
  state: initialState,
  actions: {
    initModule ({ commit }) {
      console.log(this.state.fiches.fiches)
      if (this.state.fiches.fiches === undefined) {
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
    newMat (state, val) {
      state.fiches = { ...state.fiches, [val]: [] }
    },
    newTime (state, val) {
      if (state.times.indexOf(val) < 0) {
        state.times.push(val)
      }
    },
    saveFiche (state, fiche) {
      let id = state.fiches[fiche.type].findIndex((el) => {
        return el.id === fiche.id
      })
      console.log(id)
      if (id === -1) {
        fiche.id = state.fiches[fiche.type].length
        state.fiches[fiche.type].push(fiche)
      } else {
        state.fiches[fiche.type][id] = fiche
      }
    }
  }
}
