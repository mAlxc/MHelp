const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: [],
  inPeding: {},
  pendingId: 0
}
const mutations = {
  RESET_MATIERES (state) {
    state.all = {}
    state.allNames = []
  },
  SET_MATIERES (state, { matieres }) {
    if (navigator.onLine) {
      const data = matieres.data()
      state.all = {
        ...state.all,
        [matieres.id]: { name: data.name, id_owner: data.id_owner, id_year: data.id_year, created: data.created }
      }
      if (!state.allNames.includes(data.name)) {
        state.allNames.push(data.name)
      }
    } else {

    }
  },
  SET_MATIERES_OFFLINE (state, val) {
    state.allNames.push(name)
    state.inPeding = {
      ...state.inPeding,
      [state.pendingId++]: { name: val.name, id_year: val.id_year, created: Date.now() }
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
        t.push({ id: key, name: element.name, created: new Date(element.created) })
      }
    }
    for (const key in state.inPeding) {
      if (state.inPeding.hasOwnProperty(key)) {
        const element = state.inPeding[key]
        t.push({ id: key, name: element.name, created: new Date(element.created) })
      }
    }
    return t
  },
  getNameById: (state) => (id) => {
    if (state.all[id]) {
      return state.all[id].name
    }
    return false
  }
}

const actions = {
  async get ({ commit, rootState }) {
    if (navigator.onLine) {
      let convoRef = rootState.db.collection('matieres').where('id_owner', '==', rootState.user.user.uid)
      let convos = await convoRef.get()
      if (convos.size > 0) {
        convos.forEach(matieres => commit('SET_MATIERES', { matieres }))
      } else {
        commit('RESET_MATIERES')
      }
    } else {

    }
  },
  async set ({ commit, state, dispatch, rootState }, { val, created }) {
    if (navigator.onLine) {
      const convoRef = rootState.db.collection('matieres')
      const res = await convoRef.where('name', '==', val.name).get()
      if (res.size === 0) {
        await convoRef.doc().set({ name: val.name, id_owner: rootState.user.user.uid, id_year: val.id_year, created: Date.now() })
          .then((e) => { console.info('good'); dispatch('get') })
          .catch((e) => { console.warn('bad') })
        return true
      } else {
        let isIn = false
        res.forEach(year => {
          let data = year.data()
          if (data.id_year === val.id_year) {
            isIn = true
          }
        })
        if (isIn) {
          return false
        } else {
          await convoRef.doc().set({ name: val.name, id_owner: rootState.user.user.uid, id_year: val.id_year, created: created || Date.now() })
            .then((e) => { console.info('good'); dispatch('get') })
            .catch((e) => { console.warn('bad') })
          return true
        }
      }
    } else {
      commit('SET_MATIERES_OFFLINE', val)
    }
  },
  async sync ({ commit, state, dispatch }) {
    if (navigator.onLine) {
      for (const key in state.inPeding) {
        if (state.inPeding.hasOwnProperty(key)) {
          const element = state.inPeding[key]
          dispatch('set', { val: element.name, created: element.created })
            .then(bo => {
              commit('removePending', key)
            })
        }
      }
    }
  }
}
export default { namespaced: true, state, mutations, actions, getters }
