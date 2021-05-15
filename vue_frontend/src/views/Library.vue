<template>
  <v-container>
    <v-main>

      <v-row>
        <v-col>
          <h1> {{ lib.name }} </h1>
          <p> {{ lib.description }} </p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="auto" class="ml-auto">
          <v-btn-toggle
            v-model="toggle_view"
            mandatory
            group
          >
            <v-btn>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-view-grid</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <v-divider class="mb-10"></v-divider> 

      <Table
        v-if="toggle_view % 2 == 0"
        :books="books"
      />

      <List
        v-else
        :books="books"
      />

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';
import Table from '@/components/Books/Table.vue';
import List from '@/components/Books/List.vue';

export default {
  name: 'Library',
  components: {
    Table,
    List
  },
  data: () => ({
    books: [],
    lib: null,
    toggle_view: 0,
  }),
  mounted() {
    axios.get(`/get_libraries/${this.$route.params.ind}`)
    .then(response => {
      console.log(response.data)
      this.lib = response.data
    });

    axios.get(`/get_books/${this.$route.params.ind}`)
    .then(response => {
      console.log(response.data)
      this.books = response.data
    });
  },
}
</script>
