import { createMemoryHistory, createRouter } from 'vue-router'

import homePage from './homePage.vue'
import signIn from './signIn.vue'
import register from './register.vue'
import askForaSuggestion from './askForaSuggestion.vue'

const routes = [
  { path: '/', component: homePage },
  { path: '/signin', component: signIn },
  { path: '/register', component: register },
  { path: '/askForaSuggestion', component: askForaSuggestion },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

