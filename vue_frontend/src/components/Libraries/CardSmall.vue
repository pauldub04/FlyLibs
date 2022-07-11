<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img v-if="library.image"
      :src="'http://localhost:3000/' + library.image"
      color='grey'
      height="50px"
    ></v-img>
    <v-img v-else
      src="https://avatars.mds.yandex.net/i?id=e4cdd76503ad8f779bab5bfd1be112aa-3979426-images-thumbs&n=13&exp=1"
      color='grey'
      height="50px"
    ></v-img>

    <v-card-title>
      {{ library.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ library.userSurname }} {{ library.userName }}
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