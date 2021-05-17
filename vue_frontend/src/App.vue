<template>
  <v-app>
  <v-navigation-drawer app v-model="drawer">
    <v-list dense rounded>
      <v-list-item
        v-for="item in drawer_list"
        :key="item.title"
        :to="item.link"
        link
        @click="drawer = !drawer"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app flat>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon class="ml-5">
      <v-icon>mdi-book</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>HomeLibrary</v-toolbar-title>
  </v-app-bar>

  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
  </v-footer>
</v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: false,
    drawer_list: [
      { title: 'Главная', icon: 'mdi-view-dashboard', link: '/' },
      { title: 'Мои библиотеки', icon: 'mdi-library', link: '/my' },
      { title: 'О проекте', icon: 'mdi-forum', link: '/about' },
      { title: 'Войти', icon: 'mdi-login', link: '/signin' },
      { title: 'Создать аккаунт', icon: 'mdi-account-circle-outline', link: '/signup' },
    ],
  }),
};
</script>
