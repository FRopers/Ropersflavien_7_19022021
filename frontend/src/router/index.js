import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'

const routes = [
  {
    path: '/',
    redirect: {
      name:"login"
    }
  },

  {
    path: "/home",
    name: "home",
    component: Home
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },

  {
    path: "/post",
    name: "post",
    component: Post
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
