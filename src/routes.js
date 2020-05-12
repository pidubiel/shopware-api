import Product from './components/product/Product.vue';
import Home from './components/Home.vue';

export const routes = [
  { path: '/product/:id', component: Product },
  { path: '', component: Home },
];
