const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: [],
  inPeding: {},
  pendingId: 0
}
const mutations = {
  SET_CURSUS (state, { cursus }) {
    if (navigator.onLine) {
      const data = cursus.data()
      state.all = {
        ...state.all,
        [cursus.id]: { name: data.name, created: data.created }
      }
      if (!state.allNames.includes(data.name)) {
        state.allNames.push(data.name)
      }
    } else {

    }
  },
  RESET_CURSUS (state) {
    state.all = {}
    state.allNames = []
  },
  SET_CURSUS_OFFLINE (state, name) {
    state.allNames.push(name)
    state.inPeding = {
      ...state.inPeding,
      [state.pendingId++]: { name: name, created: Date.now() }
    }
  },
  removePending (state, id) {
    delete state.inPeding[id]
  }
}

const getters = {
  all (state) {
    let t = []
    for (const key in state.all) {
      if (state.all.hasOwnProperty(key)) {
        const element = state.all[key]
        t.push({id: key, name: element.name, created: element.created})
      }
    }
    for (const key in state.inPeding) {
      if (state.inPeding.hasOwnProperty(key)) {
        const element = state.inPeding[key]
        t.push({id: key, name: element.name, created: element.created})
      }
    }
    return t
  }
}

const actions = {
  async get ({ commit, rootState }) {
    if (navigator.onLine) {
      let convoRef = rootState.db.collection('cursus')
      let convos = await convoRef.get()
      if (convos.size > 0) {
        convos.forEach(cursus => commit('SET_CURSUS', { cursus }))
      } else {
        commit('RESET_CURSUS')
      }
    } else {

    }
  },
  async set ({ commit, state, dispatch, rootState }, {val, created}) {
    if (navigator.onLine) {
      const convoRef = rootState.db.collection('cursus')
      const res = await convoRef.where('name', '==', val).get()
      if (res.size === 0) {
        await convoRef.doc().set({ name: val, created: created || Date.now() })
          .then((e) => { console.log('good'); console.log(e); dispatch('get') })
          .catch((e) => { console.log('bad') })
        return true
      } else {
        return false
      }
    } else {
      commit('SET_CURSUS_OFFLINE', val)
    }
  },
  async sync ({commit, state, dispatch}) {
    if (navigator.onLine) {
      for (const key in state.inPeding) {
        if (state.inPeding.hasOwnProperty(key)) {
          const element = state.inPeding[key]
          dispatch('set', {val: element.name, created: element.created})
            .then(bo => {
              commit('removePending', key)
            })
        }
      }
    }
  }
}
export default { namespaced: true, state, mutations, actions, getters }
