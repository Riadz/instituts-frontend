import { createPinia } from 'pinia';
import piniaPersist from '@/stores/piniaPersist';

const Store = createPinia();
Store.use(piniaPersist);

export default Store;
