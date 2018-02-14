import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/main/index'
import indexList from '@/pages/main/indexList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path:'/',
          component:indexList
        },
        {
          path:'/category',
          component:indexList
        }
      ]
    }
  ]
})
