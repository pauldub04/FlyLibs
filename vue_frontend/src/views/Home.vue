<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    axios.get('/libraries')
    .then(response => {
      console.log(response.data)
    });
  }
}
</script>
