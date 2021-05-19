<template>
  <v-container>
    <v-main>
      <h3>Выход из аккаунта</h3>
    </v-main>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('logOut')
  }
}
</script>