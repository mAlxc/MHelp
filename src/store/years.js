const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: []
}
const mutations = {
  SET_YEARS (state, { years }) {
    const data = years.data()
    state.all = {
      ...state.all,
      [years.id]: { name: data.name, created: data.created }
    }
    state.allNames.push(years.name)
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let convoRef = rootState.db.collection('years')
    let convos = await convoRef.get()
    convos.forEach(years => commit('SET_YEARS', { years }))
  },
  async set ({commit, rootState}, val) {
    const convoRef = rootState.db.collection('years')
    let id = null
    const res = await convoRef.where('name', '==', val).get()
    if (res.size === 0) {
      await convoRef.doc().set({name: val, created: Date.now()}).then((e) => { console.log('good') }).catch((e) => { console.log('bad') })
      return true
    } else {
      let id = null
      res.forEach((y) => {
        console.log(y.data())
        if (y.data().cursus === val.cursus) {
          return false
        } else {
          return id
        }
      })
    }
  }
}
export default { namespaced: true, state, mutations, actions }
