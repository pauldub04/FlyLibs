<template>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      v-if="book.image"
      :src="'http://localhost:3000/' + book.image"
      height="200px"
    ></v-img>
    <v-img
      v-else
      src="https://catherineasquithgallery.com/uploads/posts/2021-02/1612504554_94-p-knigi-na-serom-fone-126.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ book.book_name }}
    </v-card-title>

    <v-card-subtitle>
      {{ book.author_shortname }}
    </v-card-subtitle>

    <!-- <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        :to="'library/' + library.id"
      >
        Перейти
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          v-if="library.description !== '' && library.description !== null"
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      
    </v-card-actions> -->

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ book.genre }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

</template>

<script>
export default {
  name: 'BooksCardSmall',
  props: {
    book: Object,
  },
  components: {},
  data: () => ({
    show: false,
  }),
}
</script>