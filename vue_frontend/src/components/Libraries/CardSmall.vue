<template>
  <!-- <v-card
    class="mx-auto"
    min-height="200"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="headline mb-1">
          {{ library.name }}
        </v-list-item-title>
        <v-list-item-subtitle> {{ library.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Посетить
      </v-btn>
    </v-card-actions> 
  </v-card> -->

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="50px"
    ></v-img>

    <v-card-title>
      {{ library.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ library.creator }}
    </v-card-subtitle>

    <v-card-actions>
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
      
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ library.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>





</template>

<script>
export default {
  name: 'LibraryCardSmall',
  props: {
    library: Object,
  },
  components: {},
  data: () => ({
    show: false,
  }),
}
</script>