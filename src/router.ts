import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/user';
//
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';
import DashboardHome from '@/views/DashboardHome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'index', component: Index },
    {
      path: '/login',
      name: 'login',
      component: Login,
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
  ],
});

// route guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.authenticated && to.meta.auth) {
    next({ name: 'login' });
  }
  if (userStore.authenticated && to.meta.auth === false) {
    next({ name: 'dashboard' });
  }

  //
  next();
});

export default router;
