import { createRouter, createWebHistory } from 'vue-router'
import AppForm from '../views/AppForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: AppForm
    }
  ]
})

export default router
