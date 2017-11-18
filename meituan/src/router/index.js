import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Homepage from '@/components/Homepage/Homepage'
import CityList from '../components/HomePage/CityList'
import seach from '../components/HomePage/seach'
import detail from '../components/HomePage/detail'
import Find from '@/components/Find/Find'
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
      path: '/order',
      component: Order
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/seach',
      component: seach
    },
    {
      path: '/city',
      component: CityList
    },
    {
      path: '/detail',
      component: detail
    }
  ]
})
