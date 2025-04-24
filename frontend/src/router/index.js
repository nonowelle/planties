import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/plants',
    name: 'Plants',
    component: () => import('../views/Plants.vue'),
  },
  {
    path: '/plants/new',
    name: 'NewPlant',
    component: () => import('../views/PlantForm.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/plants/:id',
    name: 'PlantDetail',
    component: () => import('../views/PlantDetail.vue'),
  },
  {
    path: '/plants/:id/edit',
    name: 'EditPlant',
    component: () => import('../views/PlantForm.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mycollection',
    name: 'MyCollection',
    component: () => import('../views/Plants.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
