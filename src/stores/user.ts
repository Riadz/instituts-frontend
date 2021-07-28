import { login } from '@/services/auth';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): StoreUser => ({
    authenticated: false,
    authToken: '',
  }),
  actions: {
    async login(email: string, password: string) {
      let res = await login(email, password);

      if (!res.success) return false;

      this.authenticated = true;
      this.authToken = res.data.authToken;
      return true;
    },
  },
  persist: {
    strategies: [{ storage: localStorage }],
    enabled: true,
  },
});

interface StoreUser {
  authenticated: boolean;
  authToken: string;
}
