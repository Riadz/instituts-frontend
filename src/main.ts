import { createApp } from 'vue';
import App from '@/App.vue';
//
import PrimeVue from 'primevue/config';
import Router from '@/router';

//
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import '@/styles/main.scss';

const app = createApp(App).use(Router).use(PrimeVue);

app.mount('#app');
