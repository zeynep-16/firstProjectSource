import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Vuetify eklentisini oluşturacağız
import 'vuetify/styles'; 
import '@mdi/font/css/materialdesignicons.css'


import router from './router'


createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
  

