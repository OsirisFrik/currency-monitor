import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../layouts/main'
import Home from '../views/Home'
import AddCurrency from '../views/Add'
import Currency from '../views/Currency'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            title: 'Home'
          }
        },
        {
          path: '/add',
          name: 'add',
          component: AddCurrency,
          meta: {
            title: 'Add Currency'
          }
        }
      ]
    },
    {
      path: '/currency',
      component: Layout,
      children: [
        {
          path: '/currency',
          redirect: '/'
        },
        {
          path: '/currency/:id',
          name: 'currency',
          component: Currency,
          meta: {
            title: null,
            child: true
          }
        }
      ],
      beforeEnter: (to, from, next) => {
        if (to.params.id) next()
        else next(false)
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
