<template>
  <div id="app">
    <b-modal id="detail-modal" :title="selectedGame.title" ok-only ok-title="close" size="lg" v-model="showModal"
             @hidden="goHome">
      <item-detail :game="selectedGame"></item-detail>
    </b-modal>
    <div class="filters stick-to-top">
      <input type="search" v-model="filter.q" placeholder="any name"/>
      <input type="number" v-model.number="filter.players" placeholder="any number of players" min="1" max="99"/>
      <!--<select v-model="filterGenre" multiple>-->
      <!--<option>all</option>-->
      <!--<option>strategy</option>-->
      <!--<option>gamers game</option>-->
      <!--</select>-->
      <v-select multiple :value.sync="filter.genre" :options="genres"></v-select>
      <button @click="clearFilters">clear filters</button>
    </div>

    <transition-group name="flip-list" tag="div" class="flex-container">
      <div v-for="fgame in filteredGames" :key="fgame.id" class="card flip-list-item"
           @click="select(fgame)">
        <card :game="fgame"></card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import Card from './components/Card'
import ItemDetail from './components/ItemDetail'

export default {
  name: 'app',
  data () {
    return {
      filter: {q: '', players: 4, genre: []},
      genres: ['Strategiespiel', 'Knobelspiel', 'Quiz', 'Kartenspiel', 'Familienspiel', 'Partyspiel', 'Klassiker', 'Gamer\'s Game'],
      showModal: typeof this.selected !== 'undefined',
    }
  },
  created () {
    this.$store.dispatch('load')
  },
  computed: {
    storegame () {
      return this.$store.state.games
    },
    filteredGames () {
      let self = this
      return self.storegame.filter(item => {
        const searchRegex = new RegExp(self.filter.q, 'i')
        let display = true
        if (self.filter.q) display = display && searchRegex.test(item.title)
        if (self.filter.players) display = display && (item.players_min <= self.filter.players && item.players_max >= self.filter.players)
        let somethingSelected = self.filter.genre[0] !== undefined
        if (somethingSelected) display = display && self.filter.genre.includes(item.genre)
        return display
      },
      )
    },
    selectedGame () {
      if (typeof this.selected !== 'undefined' && typeof this.storegame !== 'undefined') {
        return this.storegame[parseInt(this.selected)]
      }
      return {title: 'placeholder'}
    },
  },
  methods: {
    goHome () {
      this.showModal = false
      this.$router.push({path: '/'})
    },
    clearFilters () {
      this.filter = {q: '', players: '', genre: []}
    },
    select (game) {
      this.showModal = true
      this.$router.push({path: '/' + this.storegame.indexOf(game)})
    },
  },
  components: {
    'v-select': VueSelect,
    'card': Card,
    'item-detail': ItemDetail,
  },
  props: ['selected'],
  beforeRouteUpdate (to, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    console.log(to)
    if (to.path === '/') {
      this.showModal = false
    }
    next()
  },
}
</script>

<style src="./styles/flip.css"></style>
<style src="./styles/style.css"></style>
