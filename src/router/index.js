import Vue from 'vue'
import VueRouter from 'vue-router'

// import pages
import Home from '@/views/HomePage'
import ProjectManagement from '@/views/ProjectManagement'
import ModelStore from '@/views/ModelStore'
import ModelTraining from '@/views/ModelTraining'
import ModelApp from '@/views/ModelApp'
import LearnVue from '@/components/LearnVue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/projectManagement',
    name: 'ProjectManagement',
    component: ProjectManagement
  },
  {
    path: '/modelstore',
    name: 'ModelStore',
    component: ModelStore
  },
  {
    path: '/modeltraining',
    name: 'ModelTraining',
    component: ModelTraining
  },
  {
    path: '/modelapp',
    name: 'ModelApp',
    component: ModelApp
  },
  {
    path: '/learnvue',
    name: 'LearnVue',
    component: LearnVue
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
