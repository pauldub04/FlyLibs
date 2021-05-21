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
    }
  },
  actions: {
    async signIn(ctx, credentials) {
      return axios
        .post('/auth/login/', credentials)
        .then(async (response) => {
          // console.log(response.data)

          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
          ctx.commit('setToken', response.data.accessToken);

          console.log('signed in')
          router.push('/')
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response.data)
          alert(error.response.data)
        })
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

      console.log('logged out')
      router.push('/')
    },
  
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  modules: {
  }
})
