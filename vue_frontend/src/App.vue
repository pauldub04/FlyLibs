<template>
  <v-app>
  <!-- <v-navigation-drawer app>
  </v-navigation-drawer>
  <v-app-bar app>
  </v-app-bar> -->

  <v-main>
    <v-container fluid>
      <router-link to="/">main</router-link>
      <router-link to="/about">about</router-link>

      <router-view></router-view>
    </v-container>
  </v-main>

  <!-- <v-footer app>
  </v-footer> -->
</v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
