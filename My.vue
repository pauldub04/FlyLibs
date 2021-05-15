<template>
  <v-container>
    <v-content>

      <v-row>
        <v-col cols="auto" class="mr-auto">
          <h1>Мои библиотеки</h1>
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

    </v-content>
  </v-container>
</template>

<script>
import axios from 'axios';
import LibrariesList from '@/components/LibrariesList.vue';

export default {
  name: 'Home',
  components: {
    LibrariesList
  },
  data: () => ({
    libraries: [],
  }),
  mounted() {
    axios.get('/libraries')
    .then(response => {
      console.log(response.data)
      this.libraries = response.data


      console.log(this.libraries)

      let user_id = 3;
      this.libraries = this.libraries.filter(lib => lib.creator_id == user_id);

      console.log(this.libraries)
    });

  }
}
</script>
