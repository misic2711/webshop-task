import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'ShowAllProductsComponent',
    component: () => import('../components/ShowAllProductsComponent.vue'),
  },
  {
    path: '/product-detal-page/:id',
    name: 'ProductDetailPage',
    component: () => import('../components/ProductDetailPage.vue'),
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;