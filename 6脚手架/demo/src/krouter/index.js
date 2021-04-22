import Vue from 'vue'
import VueRouter from '../krouter/kvue-router'
import Home from '../views/Home.vue'
//1应用插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    //懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/detail/:name',
    name:'Detail',
    component: () => import('../views/Detail.vue'),
    children:[
      {
        path:'user',
        name:'User',
        // component
      }
    ]
  }
]
//创建插件
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
