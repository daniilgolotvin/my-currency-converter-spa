import { createRouter, createWebHistory } from 'vue-router'
import ConvertPage from '../views/ConvertPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/convert', component: ConvertPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router