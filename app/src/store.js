/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser(state, userData) {
      state.apiToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.apiToken = null;
      state.userId = null;
    },
  },
  actions: {
    signup({ commit }, authData) {
      axios.post('/register', authData)
          .then((res) => {
            console.log(res);
            commit('authUser', {
              token: res.data.data.api_token,
              userId: res.data.data.id,
            });
            localStorage.setItem('token', res.data.data.api_token);
          })
          .catch(error => console.log('Error:' + error));
    },
    login({ commit }, authData) {
      axios.post('/login', authData)
          .then((res) => {
            console.log(res);
            commit('authUser', {
              token: res.data.data.api_token,
              userId: res.data.data.id,
            });
            localStorage.setItem('token', res.data.data.api_token);
            localStorage.setItem('userId', res.data.data.id);
            router.replace('/dashboard');
          })
          .catch(error => console.log('Error:' + error));
    },
    tryAutoLogin({ commit }) {
      const temptoken = localStorage.getItem('token');
      if (!temptoken) {
        return;
      }
      const tempuserId = localStorage.getItem('userId');
      const userData = {
        token: temptoken,
        userId: tempuserId,
      };
      commit('authUser', userData);
      router.replace('/dashboard');
    },
    fetchUser({ commit, state }) {
      if (!state.apiToken) {
        return;
      }
      const config = {
        headers: { Authorization: 'Bearer ' + state.apiToken },
      };
      axios.get('/users', config)
        .then((res) => {
          console.log(res.data);
          commit('storeUser', res.data);
        });
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.replace('/');
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.apiToken !== null;
    },
  },
});
