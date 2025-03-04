import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateView.vue'),
    },
    {
        path: '/game',
        name: 'game',
        component: () => import('@/views/GameView.vue'),
      },
  ],
})

export default router
