import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from '@/App.vue';
import Store from '@/store';
import Router from '@/router';

// Styles
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/styles/main.scss';

//
const app = createApp(App).use(Store).use(Router).use(PrimeVue);

app.mount('body');
