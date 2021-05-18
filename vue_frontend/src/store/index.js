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
          console.log('signed in')
          console.log(response.data)

          ctx.dispatch('setAuthHeader', response.data.accessToken);
          sessionStorage.setItem('authToken', response.data.accessToken); 

          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response.data)
          alert(error.response.data)
        })
    },
    setAuthHeader(ctx, token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
  
  },
  modules: {
  }
})
