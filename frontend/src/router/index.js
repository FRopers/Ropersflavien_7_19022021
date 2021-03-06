import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import CreatePost from '../views/CreatePost.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home
  },

  {
    path: '/post',
    name: "post",
    component: Post
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
