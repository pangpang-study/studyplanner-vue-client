import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //hash mode와 history mode의 차이 - /#/ 안쓰려고
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {//path는 주소, component는 내가원하는 vue파일
      path: '/users',
      name: 'user',
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
    }
  ]
})
