import Vue from 'vue'
import Router from 'vue-router'
import TableData from '@/components/TableData.vue'
import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    { path: '/page/:page', component: TableData },
  ]
})
