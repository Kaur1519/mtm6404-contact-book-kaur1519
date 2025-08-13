import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ContactDetailView from '../views/ContactDetailView.vue';
import AddContactView from '../views/AddContactView.vue';
import EditContactView from '../views/EditContactView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contacts/new', name: 'add', component: AddContactView },
  { path: '/contacts/:id', name: 'detail', component: ContactDetailView, props: true },
  { path: '/contacts/:id/edit', name: 'edit', component: EditContactView, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(), // works locally and on GitHub Pages
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
