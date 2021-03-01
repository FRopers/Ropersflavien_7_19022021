import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'
import Signup from '../views/Signup.vue'

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home
  },

  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost
  },

  {
    path: '/login',
    name: "Login",
    component: Login
  },

  {
    path: '/signup',
    name: "Signup",
    component: Signup
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
