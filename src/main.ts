import { createApp } from 'vue';
import App from '@/App.vue';
//
import PrimeVue from 'primevue/config';
import Router from '@/router';

const app = createApp(App).use(Router).use(PrimeVue);

app.mount('#app');
