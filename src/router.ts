import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '@/views/pages/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'index', component: Index },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
