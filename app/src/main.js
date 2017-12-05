// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';

import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';

import App from './App';

import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://localhost:8000/api';
Vue.use(BootstrapVue);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
