import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './Catalog'
import ItemDetail from './components/ItemDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Catalog,
    },
    {
      path: '/:id',
      name: 'byid',
      component: ItemDetail,
      props: {
        game: {
          title: 'test title'
        }
      }
    },
    // {
    //   path: '/about/:param?',
    //   name: 'about',
    //   route level code-splitting
    //   this generates a separate chunk (about.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      // props: {name: 'attr'}
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.log("doing scrolly things")
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
