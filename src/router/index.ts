import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crypto-blocks',
      name: 'crypto-blocks',
      component: () => import('@/views/CryptoBlocks.vue')
    },
    {
      path: '/nft-blocks',
      name: 'nft-blocks',
      component: () => import('@/views/NftBlocks.vue')
    },
  ]
})

export default router
