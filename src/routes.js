import Home from './components/Home.vue';
import Product from './components/product/Product.vue';
import Checkout from './components/checkout/Checkout.vue';

export const routes = [
  { path: '/product/:id', component: Product },
  { path: '', component: Home },
  { path: '/checkout', component: Checkout },
];
