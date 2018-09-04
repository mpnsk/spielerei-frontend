import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    games: [],
  },
  mutations: {
    load (state, payload) {
      state.games = payload
    },
  },
  actions: {
    load (context) {
      var LOAD_DUMMY_DATA = true
      if (LOAD_DUMMY_DATA) {
        console.log('using dummy data')
        let data = require('./assets/dummy')
        context.commit('load', data.games)
        return
      }
      if (this.state.games.length <= 0) {
        console.log('loading data from backend')
        let url = 'http://localhost:8084/game/index'
        let headers = {'Accept': 'application/json'}
        axios.get(url, {headers: headers})
        .then(response => {
          context.commit('load', response.data.games)
        })
      }
      else {
        console.log('reuse old data')
      }
    },
  },
})
