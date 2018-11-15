import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './fiches'
import definitions from './definitions'
import matieres from './matieres'
import years from './years'
import user from './user'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help'
  },
  actions: {
    saveMatieres () {
      console.log('test')
    },
    userInfos ({state}) {
      let userId = firebase.auth().currentUser.uid
      let email = state.user.user.email
      // eslint-disable-next-line
      db.collection("users").doc(userId).set({
        username: name,
        laemailst: email,
        profile_picture: '1815'
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  },
  modules: {
    fiches,
    definitions,
    matieres,
    years,
    user
  },
  plugins: [
    createPersistedState({
      key: 'Fiches',
      storage: localStorage,
      paths: [],
      reducer: state => {
        const obj = {
          definitions: state.definitions,
          matieres: state.matieres,
          years: state.years
        }
        return obj
      }
    })
  ]
})
