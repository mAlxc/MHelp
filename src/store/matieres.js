const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: [],
  inPeding: {},
  pendingId: 0
}
const mutations = {
  RESET_YEAR (state) {
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
        t.push({ id: key, name: element.name, created: element.created })
      }
    }
    for (const key in state.inPeding) {
      if (state.inPeding.hasOwnProperty(key)) {
        const element = state.inPeding[key]
        t.push({ id: key, name: element.name, created: element.created })
      }
    }
    return t
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
        commit('RESET_YEAR')
      }
    } else {

    }
  },
  async set ({ commit, state, dispatch, rootState }, { val, created }) {
    if (navigator.onLine) {
      console.log(val)
      const convoRef = rootState.db.collection('matieres')
      const res = await convoRef.where('name', '==', val.name).get()
      console.log(res)
      if (res.size === 0) {
        console.log('here')
        await convoRef.doc().set({ name: val.name, id_owner: rootState.user.user.uid, id_year: val.id_year, created: Date.now() })
          .then((e) => { console.log('good'); console.log(e); dispatch('get') })
          .catch((e) => { console.log('bad') })
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
            .then((e) => { console.log('good'); console.log(e); dispatch('get') })
            .catch((e) => { console.log('bad') })
          return true
        }
      }
    } else {
      commit('SET_MATIERES_OFFLINE', val)
    }
  },
  async sync ({ commit, state, dispatch }) {
    console.log('ebut sync')
    if (navigator.onLine) {
      console.log('ebut sync')
      for (const key in state.inPeding) {
        if (state.inPeding.hasOwnProperty(key)) {
          const element = state.inPeding[key]
          dispatch('set', { val: element.name, created: element.created })
            .then(bo => {
              console.log(bo)
              commit('removePending', key)
            })
        }
      }
    }
  }
}
export default { namespaced: true, state, mutations, actions, getters }
