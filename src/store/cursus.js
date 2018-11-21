const state = {
  all: {},
  allNames: [], // indexation des names afin de ne pas dupliquer
  allCursusIds: []
}
const mutations = {
  SET_CURSUS (state, { cursus }) {
    const data = cursus.data()
    state.all = {
      ...state.all,
      [cursus.id]: { name: data.name, created: data.created }
    }
    state.allNames.push(cursus.name)
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let convoRef = rootState.db.collection('cursus')
    let convos = await convoRef.get()
    convos.forEach(cursus => commit('SET_CURSUS', { cursus }))
  },
  async set ({commit, rootState}, val) {
    const convoRef = rootState.db.collection('cursus')
    const res = await convoRef.where('name', '==', val).get()
    if (res.size === 0) {
      await convoRef.doc().set({name: val, created: Date.now()}).then((e) => { console.log('good') }).catch((e) => { console.log('bad') })
      return true
    } else {
      return false
    }
  }
}
export default { namespaced: true, state, mutations, actions }
