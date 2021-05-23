import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/My.vue'),
    meta: {
      toLog: true,
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
    meta: {
      toMain: true,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
    meta: {
      toMain: true,
    },
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: () => import(/* webpackChunkName: "logout" */ '../views/LogOut.vue'),
  },
  {
    path: '/library/:ind',
    name: 'Library',
    component: () => import(/* webpackChunkName: "library" */ '../views/Library.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
    meta: {
      toLog: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      toLog: true,
      admin: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.admin && (store.getters.getUser.role !== 'admin' || store.getters.getToken === null))
    next('/')
  else if (to.meta.toMain && store.getters.getToken !== null)
    next('/')
  else if (to.meta.toLog && store.getters.getToken == null)
    next('/signin')
  else
    next()
})

export default router
