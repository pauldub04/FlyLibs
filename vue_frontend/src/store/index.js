import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from '../router/index';

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signIn(ctx, credentials) {
      return axios
        .post('/auth/login/', credentials)
        .then(async (response) => {
          console.log(response.data)

          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
          // axios.setToken(response.data.accessToken);

          ctx.commit('setToken', response.data.accessToken);
          ctx.commit('setUser', response.data.user);

          console.log('signed in')
          router.push('/my')
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response.data)
          alert(error.response.data)
        })z
    },

    async signUp(ctx, credentials) {
      return axios
        .post('/auth/create/', credentials)
        .then(async (response) => {
          console.log(response.data)
          console.log('signed up')
          alert('Ваш аккаунт был успешно создан')
          ctx.dispatch('signIn', credentials)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },

    logOut(ctx) {
      axios.defaults.headers.common['Authorization'] = '';
      ctx.commit('setToken', null);
      ctx.commit('setUser', {});

      console.log('logged out')
      router.push('/')
    },
  
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    }
  },
  modules: {
  }
})
