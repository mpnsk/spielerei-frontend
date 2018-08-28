<template>
  <div>
    <!--<div>{{game.title}}</div>-->
    <!--<div>{{game.description}}</div>-->
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="0" sm="4">
          <b-img slot="aside" fluid :src="require('../assets/die-tore-der-welt.jpg')" class=".d-none"
                 alt="placeholder"></b-img>
        </b-col>
        <b-col cols="12" sm="8" style="background: aqua">{{game.title}}</b-col>
      </b-row>
    </b-container>

    <img src="../assets/die-tore-der-welt.jpg" height="100px" alt="Media Aside"/>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {}
  },
  props: ['game']
  ,
  beforeRouteLeave (to, from, next) {
    console.log("route leave!")
    next()
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  }
}
</script>

<style scoped>

</style>
