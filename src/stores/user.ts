import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): StoreUser => ({
    authenticated: false,
  }),
  actions: {
    login() {},
  },
  persist: {
    strategies: [{ storage: localStorage }],
    enabled: true,
  },
});

interface StoreUser {
  authenticated: boolean;
}
