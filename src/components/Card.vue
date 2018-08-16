<template>
    <div>
        <img src="../assets/die-tore-der-welt.jpg" alt='Avatar' style='width:100%'>
        <div class='container'>
            <div><i>{{game.title}} #{{game.id}}</i></div>
            o
            <div>{{game.description|short}}</div>
            <div v-if='game.year'>{{game.year}}</div>
            <div>{{game.duration}}</div>
            <div>{{game.genre}}</div>
            <div><span
                v-if='game.playersAtLeast !== game.playersAtMost'>{{game.playersAtLeast}} - {{game.playersAtMost}}</span><span
                v-else>{{game.playersAtLeast}}</span> players
            </div>
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
            value = value.toString().substring(0, 150)
            var lastIndex = value.lastIndexOf(' ')
            value = value.substring(0, lastIndex)
            value += ' [...]'
            return value
        }
    },
    props: ['game']
}
</script>
