<template>
  <v-row>
    <v-col
      v-for="(book, i) in books"
      :key="i"
      cols="4"
    >
      <CardSmall
        :book="book"
      />
    </v-col>
  </v-row>
</template>


<script>
import CardSmall from '@/components/Books/CardSmall.vue';

export default {
  name: 'BooksList',
  props: {
    books: Array,
  },
  components: {
    CardSmall
  },
}
</script>