import Vue from 'vue'
import Vuex from 'vuex'
import fiches from './fiches'
import glossaire from './glossaire'

Vue.use(Vuex)

const persistPlugin = store => {
  store.subscribe((mutations, state) => {
    let name = mutations.type.split('/')[0]
    Lf.setItem(name, state[name], function (err, res) {
      console.log(res, err)
    })
  })
}

export default new Vuex.Store({
  state: {
    title: 'Maro\'s Help'
  },
  modules: {
    fiches,
    glossaire
  },
  plugins: [persistPlugin]
})
