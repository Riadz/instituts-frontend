import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from '@/App.vue';
import Router from '@/router';
import Store from '@/store';

// Styles
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import '@/styles/main.scss';

//
const app = createApp(App).use(Router).use(Store).use(PrimeVue);

app.mount('body');
