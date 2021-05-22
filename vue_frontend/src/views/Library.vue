<template>
  <v-container>
    <v-main>

      <v-row>
        <v-col>
          <h1> {{ lib.name }} </h1>
          <p> {{ lib.description }} </p>
        </v-col>
      </v-row>
      
      <v-row v-if="books.length == 0">
        <v-col>
          <p> В этой библиотеке ещё нет книг </p>
        </v-col>
      </v-row>

      <div v-else>
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

        <v-row 
          class="mb-15"
        >
          <v-col>
            <Table
              v-if="toggle_view % 2 == 0"
              :books="books"
            />
            <List
              v-else
              :books="books"
            />
          </v-col>
        </v-row>
      </div>

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
    this.toggle_view = JSON.parse(localStorage.getItem("library_view_type")) || 0;

    axios.get(`/libraries/get_libraries/${this.$route.params.ind}`)
    .then(response => {
      // console.log(response.data)
      this.lib = response.data
    });

    axios.get(`/books/get_books/lib/${this.$route.params.ind}`)
    .then(response => {
      // console.log(response.data)
      this.books = response.data
    });
  },
  watch: {
    toggle_view() {
      console.log(this.toggle_view)
      localStorage.setItem("library_view_type", this.toggle_view);
    },
  }
}
</script>
