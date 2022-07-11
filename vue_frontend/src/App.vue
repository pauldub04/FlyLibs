<template>
  <v-app>
  <v-navigation-drawer app expand-on-hover>
    <v-list dense rounded class="pl-0 pr-1">
      <v-list-item
        v-for="item in drawer_list"
        :key="item.title"
        :to="item.link"
        link
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

      <v-app-bar-nav-icon disabled class="ml-5 mb-1">
        <v-icon x-large>mdi-bird</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        FlyLibs
      </v-toolbar-title>

    <v-spacer/>
    <div v-if="token">
      <v-list-item link :to="`/user/${user.id}`">
        <v-list-item-content>
          <v-list-item-title>
            {{ user.username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-app-bar>

  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <v-sheet class="my-10">
            <router-view></router-view>
          </v-sheet>
        </v-col>
      </v-row>
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
    drawer: true,
  }),
  computed: {
    drawer_list() {
      let isLogged = (this.token !== null);
      let list = [
        { title: 'Главная', icon: 'mdi-view-dashboard', link: '/' },
        { title: 'О проекте', icon: 'mdi-forum', link: '/about' },
      ]

      if (this.user.role === 'admin')
        list.push({ title: 'Администраторы', icon: 'mdi-account', link: '/admin' })

      if (isLogged) {
        list.splice(1, 0, { title: 'Мои библиотеки', icon: 'mdi-library', link: '/my' });
        list.push({ title: 'Заказы', icon: 'mdi-book-open-variant', link: '/orders' })
        list.push({ title: 'Выйти', icon: 'mdi-logout', link: '/logout' })
      } else {
        list.push({ title: 'Войти', icon: 'mdi-login', link: '/signin' })
        list.push({ title: 'Создать аккаунт', icon: 'mdi-account-circle-outline', link: '/signup' })
      }

      return list
    },
    user() {
      return this.$store.getters.getUser;
    },
    token() {
      return this.$store.getters.getToken;
    }
  },
  beforeCreate() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
