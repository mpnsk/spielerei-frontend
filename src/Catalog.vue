<template>
  <div id="app">
    <b-modal id="detail-modal" :title="selected.title" ok-only ok-title="close" size="lg">
      <!--<item-detail :game="selected"></item-detail>-->
    </b-modal>
    <card :game="selected"></card>
    <div class="filters stick-to-top">
      <input type="search" v-model="filterQuery" placeholder="any name"/>
      <input type="number" v-model.number="filterPlayers" placeholder="any number of players" min="1" max="99"/>
      <!--<select v-model="filterGenre" multiple>-->
      <!--<option>all</option>-->
      <!--<option>strategy</option>-->
      <!--<option>gamers game</option>-->
      <!--</select>-->
      <v-select multiple :value.sync="filterGenre" :options="allGenres"></v-select>
      <button @click="clearFilters">clear filters</button>
      <button @click="addGame">add game</button>
    </div>

    <transition-group name="flip-list" tag="div" class="flex-container">
      <div v-for="fgame in filteredGames" :key="fgame.id" class="card flip-list-item"
           @click="selected=fgame">
        <card :game="fgame"></card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import Card from './components/Card'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      filterQuery: '',
      filterPlayers: 4,
      games: [],
      filterGenre: [],
      numberOfGames: 5,
      allGenres: ['Strategiespiel', 'Knobelspiel', 'Quiz', 'Kartenspiel', 'Familienspiel', 'Partyspiel', 'Klassiker', 'Gamer\'s Game'],
      selected: {},
    }
  },
  created () {
    let url = 'http://localhost:8080/game/index'
    let headers = {'Accept': 'application/json'}
    if (this.games.length <= 0) {
      console.log("fresh get")
      axios.get(url, {headers: headers})
      .then(response => {
        this.games = response.data.games
      })
    }
  },
  computed: {
    filteredGames () {
      let self = this
      return self.games.filter(item => {
        const searchRegex = new RegExp(self.filterQuery, 'i')
        let display = true
        if (self.filterQuery) display = display && searchRegex.test(item.title)
        if (self.filterPlayers) display = display && (item.players_min <= self.filterPlayers && item.players_max >= self.filterPlayers)
        let somethingSelected = self.filterGenre[0] !== undefined
        if (somethingSelected) display = display && self.filterGenre.includes(item.genre)
        return display
      },
      )
    },
  },
  methods: {
    clearFilters () {
      this.filterQuery = ''
      this.filterPlayers = ''
      this.filterGenre = []
    },
    addGame () {
      this.numberOfGames++
      this.games.splice(0, 0, {
        id: this.numberOfGames,
        name: Math.random().toString(36).substring(7),
        genre: 'Knobelspiel',
        playersAtLeast: 2,
        playersAtMost: 6,
      })
    },
    removeGame (game) {
      this.games.splice(this.games.indexOf(game), 1)
    },
  },
  components: {
    'v-select': VueSelect,
    'card': Card,
  },
}
</script>

<style src="./styles/flip.css"></style>
<style src="./styles/style.css"></style>
