import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async signIn(ctx, credentials) {
      return axios
        .post('/auth/login/', credentials)
        .then(async (response) => {
          // console.log(response.data)

          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
          localStorage.setItem('authToken', response.data.accessToken); 

          console.log('signed in')
          // this.$router.push('/')
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

    logOut() {
      axios.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('authToken');
      console.log('logged out')
    },
  
  },
  modules: {
  }
})
