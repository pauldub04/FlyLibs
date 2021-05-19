<template>
  <v-container>
    <v-main>

      <v-row>
        <v-col cols="auto" class="mr-auto">
          <h1>Домашние библиотеки</h1>
          <p>Создайте свою прямо сейчас</p>
        </v-col>
        <v-col cols="auto" class="mt-5">
          <v-btn color="primary" to="/create">
            Создать
          </v-btn>
        </v-col>
      </v-row>
      

      <v-divider class="mt-15 mb-15"></v-divider> 

      <LibrariesList
        :libraries="libraries"
        class="mb-15"
      />

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';
import LibrariesList from '@/components/Libraries/List.vue';

export default {
  name: 'Home',
  components: {
    LibrariesList
  },
  data: () => ({
    libraries: [],
  }),
  mounted() {
    console.log(localStorage.getItem('authToken'))
    axios.get('/libraries/get_libraries')
    .then(response => {
      console.log(response.data)
      this.libraries = response.data
    });

  }
}
</script>
