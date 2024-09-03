import { createRouter, createWebHashHistory } from 'vue-router'
import ConvertPage from '../views/ConvertPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/convert', component: ConvertPage, name: 'Convert' },
	{
    path: '/:catchAll(.*)',
    redirect: '/'  
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes 
});

export default router;
