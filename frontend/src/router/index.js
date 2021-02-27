import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: {
        name: "home"
    }
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },

  {
    path: "/home",
    name: "home",
    component: Home
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
