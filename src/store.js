import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    games: [],
  },
  mutations: {
    load (state) {
      if (state.games.length <= 0) {
        console.log('fresh get in store')
        let url = 'http://localhost:8080/game/index'
        let headers = {'Accept': 'application/json'}
        axios.get(url, {headers: headers})
        .then(response => {
          state.games = response.data.games
        })
      } else {
        console.log('reuse old data')
      }
    },
  },
})
