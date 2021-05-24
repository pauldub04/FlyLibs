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

      <v-dialog v-model="dialogOrder" max-width="500px">
        <v-card>
          <v-card-title class="headline">Попросить книгу?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeOrder">Отмена</v-btn>
            <v-btn color="blue darken-1" text @click="orderConfirm">Да</v-btn>
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
    <template v-slot:item.order="{ item }">
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
      <v-icon
        small
        @click="orderItem(item)"
      >
        mdi-book
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
    dialogOrder: false,

    editedItem: null,
    giveItem: null,
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogOrder (val) {
      val || this.closeOrder()
    },
  },

  methods: {
    orderItem(item) {
      this.dialogOrder = true
      this.giveItem = item
    },

    orderConfirm() {
      axios.post('/books/giveBook', {
        id_owner: this.lib.creator_id,
        id_user: this.user.id,
        id_book: this.giveItem.id
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.$router.push('/orders')
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })

      this.closeOrder()
    },

    deleteItem (item) {
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
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

    closeDelete () {
      this.dialogDelete = false
      this.editedItem = null
    },

    closeOrder () {
      this.dialogOrder = false
      this.giveItem = null
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
      if ((this.user.role === 'admin' || this.user.id == this.lib.creator_id) && this.token)
        list.push({ text: 'Действия', value: 'actions', sortable: false })

      if (this.user.id !== this.lib.creator_id && this.token)
        list.push({ text: 'Заказ', value: 'order', sortable: false })

      return list
    },
    user() {
      return this.$store.getters.getUser;
    },
    token() {
      return this.$store.getters.getToken;
    },
  }
}

</script>
