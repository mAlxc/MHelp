import Vue from 'vue'

const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: [],
  inPeding: {},
  pendingId: 0
}
const mutations = {
  togglefav (state, id) {
    if (state.all[id]) {
      Vue.set(state.all[id], 'fav', !state.all[id].fav)
    } else if (state.inPeding[id]) {
      Vue.set(state.inPeding[id], 'fav', !state.inPeding[id].fav)
    }
  },
  RESET_YEAR (state) {
    state.all = {}
    state.allNames = []
  },
  SET_YEARS (state, { years }) {
    if (navigator.onLine) {
      const data = years.data()
      state.all = {
        ...state.all,
        [years.id]: { name: data.name, id_owner: data.id_owner, id_cursus: data.id_cursus, created: data.created, fav: data.fav }
      }
      if (!state.allNames.includes(data.name)) {
        state.allNames.push(data.name)
      }
    } else {

    }
  },
  SET_YEARS_OFFLINE (state, val) {
    let is = state.allNames.includes(val.name)
    if (!is) {
      state.allNames.push(val.name)
      state.inPeding = {
        ...state.inPeding,
        [state.pendingId++]: { name: val.name, id_cursus: val.id_cursus, created: Date.now() }
      }
    } else {
      let isIn = false
      for (const key in state.all) {
        if (state.all.hasOwnProperty(key)) {
          const element = state.all[key]
          if (element.id_cursus === val.id_cursus) {
            isIn = true
          }
        }
      }
      for (const key in state.inPeding) {
        if (state.inPeding.hasOwnProperty(key)) {
          const element = state.inPeding[key]
          if (element.id_cursus === val.id_cursus) {
            isIn = true
          }
        }
      }
      if (!isIn) {
        state.inPeding = {
          ...state.inPeding,
          [state.pendingId++]: { name: val.name, id_cursus: val.id_cursus, created: Date.now() }
        }
      }
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
        console.log(element)
        t.push({ id: key, name: element.name, id_cursus: element.id_cursus, created: new Date(element.created), fav: element.fav })
      }
    }
    for (const key in state.inPeding) {
      if (state.inPeding.hasOwnProperty(key)) {
        const element = state.inPeding[key]
        t.push({ id: key, name: element.name, id_cursus: element.id_cursus, created: new Date(element.created), fav: element.fav })
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
  togglefav ({ state, dispatch, commit }, index) {
    console.log(index)
    if (navigator.onLine) {
      commit('togglefav', index)
      if (state.all[index]) {
        dispatch('set', { val: state.all[index] })
      } else if (state.inPeding[index]) {
        dispatch('sync')
      }
    } else {
      commit('togglefav', index)
    }
  },
  async get ({ commit, rootState }) {
    if (navigator.onLine) {
      let convoRef = rootState.db.collection('years').where('id_owner', '==', rootState.user.user.uid)
      let convos = await convoRef.get()
      if (convos.size > 0) {
        convos.forEach(years => commit('SET_YEARS', { years }))
      } else {
        commit('RESET_YEAR')
      }
    } else {

    }
  },
  async set ({ commit, state, dispatch, rootState }, { val, created }) {
    if (navigator.onLine) {
      const convoRef = rootState.db.collection('years')
      const res = await convoRef.where('name', '==', val.name).get()
      if (res.size === 0) {
        await convoRef.doc().set({ name: val.name, id_owner: rootState.user.user.uid, id_cursus: val.id_cursus, created: Date.now(), fav: false })
          .then((e) => { console.info('good'); dispatch('get') })
          .catch((e) => { console.warn('bad') })
        return true
      } else {
        let isIn = false
        res.forEach(year => {
          let data = year.data()
          if ((data.id_cursus === val.id_cursus) && (data.id_owner === rootState.user.user.uid)) {
            console.log('fail')
            isIn = true
            console.log(val)
            val.id_owner = rootState.user.user.uid
            val.update = Date.now()
            console.log(year)
            convoRef.doc(year.id).set(val)
              .then((e) => { console.info('good'); dispatch('get') })
              .catch((e) => { console.warn('bad') })
            return true
          }
        })
        if (isIn) {
          console.log('double fail')
          return false
        } else {
          await convoRef.doc().set({ name: val.name, id_owner: rootState.user.user.uid, id_cursus: val.id_cursus, created: (created || Date.now()), fav: false })
            .then((e) => { console.info('good'); dispatch('get') })
            .catch((e) => { console.warn('bad') })
          return true
        }
      }
    } else {
      commit('SET_YEARS_OFFLINE', val)
    }
  },
  async sync ({ commit, state, dispatch }) {
    if (navigator.onLine) {
      for (const key in state.inPeding) {
        if (state.inPeding.hasOwnProperty(key)) {
          const element = state.inPeding[key]
          dispatch('set', { val: element, created: element.created })
            .then(bo => {
              commit('removePending', key)
            })
        }
      }
    }
  }
}
export default { namespaced: true, state, mutations, actions, getters }
