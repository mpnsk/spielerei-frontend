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
      path: '/:selected?',
      name: 'home',
      component: Catalog,
      props: true,
    },
    {
      path: '/id/:id',
      name: 'byid',
      component: ItemDetail,
      props: true,
    },
  ],
})
