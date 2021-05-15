<template>
  <v-data-table
    :headers="headers"
    :items="books"
    item-key="name"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  props: {
    books: Array,
  },
  data: () => ({
    headers: [
      {
        text: 'Название книги',
        align: 'start',
        // sortable: false,
        value: 'book_name',
      },
      { text: 'Автор', value: 'author_fullname' },
      { text: 'Жанр', value: 'genre' },
      { text: 'Издательство', value: 'publisher' },
      { text: 'Шкаф', value: 'shelf' },
    ],
  }),
}
</script>
