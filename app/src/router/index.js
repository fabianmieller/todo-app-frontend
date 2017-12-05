import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import WelcomePage from '../components/welcome/welcome';
import DashboardPage from '../components/dashboard/dashboard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: WelcomePage,
    beforeEnter(to, from, next) {
      if (store.state.apiToken) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (store.state.apiToken) {
        next();
      } else {
        next('/');
      }
    },
  },
];

export default new VueRouter(
  {
    mode: 'history', routes,
  },
);
