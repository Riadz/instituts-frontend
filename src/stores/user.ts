import { login } from '@/services/auth';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): StoreUser => ({
    authenticated: false,
    accessToken: '',
    //
    loading: false,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      let res = await login(email, password);
      this.loading = false;

      if (res.success) {
        this.authenticated = true;
        this.accessToken = res.data.accessToken;
      }

      return res;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['authenticated', 'accessToken'],
      },
    ],
  },
});

interface StoreUser {
  authenticated: boolean;
  accessToken: string;
  //
  loading: boolean;
}
