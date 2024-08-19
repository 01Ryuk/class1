import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsSite from '../views/NewsSite.vue'
import AsTable from '../views/AsTable.vue'
import Weather from '../views/Weather.vue'
import Weather2 from '../views/Weather2.vue'
import Finances from '../views/Finances.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/news-site',
      name: 'News',
      component: NewsSite
    },
    {
      path: '/as-table',
      name: 'Table',
      component: AsTable
    },
    {
      path: '/Weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/Weather2',
      name: 'Weather2',
      component: Weather2
    },
    {
      path: '/Finances',
      name: 'Finances',
      component: Finances
      
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
