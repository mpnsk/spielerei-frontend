<template>
    <div>
        <div class='container'>
            <b-container>
               <b-row>
                   <b-col cols="6">
                       <img src="../assets/die-tore-der-welt.jpg" alt='Avatar' style='width:100%'>
                   </b-col>
                   <b-col cols="6">
                       <div><i>{{game.title}}</i></div>
                       <div v-if='game.year'>{{game.year}}</div>
                       <div>{{game.duration}}</div>
                       <div>{{game.genre}}</div>
                       <div><span
                               v-if='game.playersAtLeast !== game.playersAtMost'>{{game.playersAtLeast}} - {{game.playersAtMost}}</span><span
                               v-else>{{game.playersAtLeast}}</span> players
                       </div>
                       <router-link :to="{name: 'byid', params: {id: 1, game: game}}">detail</router-link>
                   </b-col>
               </b-row>
            </b-container>
            <div>{{game.description|short}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    filters: {
        short: (value) => {
            if (!value) return ''
            if (value.length < 250) return value
            value = value.toString().substring(0, 250)
            var lastIndex = Math.max(value.lastIndexOf('.'), value.lastIndexOf('!'), value.lastIndexOf('?'))
            value = value.substring(0, lastIndex+1)
            value += ' [...]'
            return value
        }
    },
    props: ['game']
}
</script>
