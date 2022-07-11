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
      src="https://avatars.mds.yandex.net/get-zen_doc/1722013/pub_5d7e8f05e6e8ef00ad8d5821_5d7e9c7586c4a900b2be40a3/scale_1200"
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