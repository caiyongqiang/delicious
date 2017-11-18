import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Homepage from '@/components/Homepage/Homepage'
import Find from '@/components/Find/Find'
import Details from '@/components/Find/Details/Details'
import Order from '@/components/Order/Order'
import My from '@/components/My/My'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/find',
      component: Find
    },
    {
      path:'/details',
      component:Details
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/my',
      component: My
    }
  ]
})
