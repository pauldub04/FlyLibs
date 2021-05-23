<template>
  <v-data-table
    :headers="headers"
    :items="books"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Удалить эту книгу?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    books: Array,
    lib: Object,
  },
  data: () => ({
    dialogDelete: false,
    // headers: ,

    editedIndex: -1,
    editedItem: null,
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    deleteItem (item) {
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      // this.desserts.splice(this.editedIndex, 1)

      console.log(this.editedItem)
      axios.post('/books/deleteBook', {
        id: this.editedItem.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.$parent.$parent.fetchBooks();
        // this.$emit('fetchBooks')
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })

      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

  },

  computed: {
    headers() {
      let list = [
        {
          text: 'Название книги',
          align: 'start',
          // sortable: false,
          value: 'book_name',
        },
        { text: 'Автор', value: 'author_fullname' },
        { text: 'Жанр', value: 'genre' },
      ]
      if (this.user.role === 'admin' || this.user.id == this.lib.creator_id)
        list.push({ text: 'Действия', value: 'actions', sortable: false })

      return list
    },
    user() {
      return this.$store.getters.getUser;
    },
  }
}

</script>
