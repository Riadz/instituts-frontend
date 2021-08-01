import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/user';
//
import Index from '@/views/Index.vue';
import DashboardHome from '@/views/DashboardHome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'index', component: Index },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        auth: false,
      },
    },

    //
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardHome,
      meta: {
        auth: true,
      },
    },
    {
      path: '/dashboard/requests',
      name: 'dashboard:requests',
      component: () => import('@/views/DashboardRequests.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/dashboard/institutes',
      name: 'dashboard:institutes',
      component: () => import('@/views/DashboardInstitutes.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/dashboard/data',
      name: 'dashboard:data',
      component: () => import('@/views/DashboardData.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/dashboard/analytics',
      name: 'dashboard:analytics',
      component: () => import('@/views/DashboardAnalytics.vue'),
      meta: {
        auth: true,
      },
    },
  ],
});

// route guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.authenticated && to.meta.auth) {
    next({ name: 'login' });
    return;
  }
  if (userStore.authenticated && to.meta.auth === false) {
    next({ name: 'dashboard' });
    return;
  }

  //
  next();
});

export default router;
