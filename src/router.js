import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './Catalog'
import ItemDetail from './components/ItemDetail'

Vue.use(Router)

export default new Router({
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
      props: true,
    },
  ],
})
