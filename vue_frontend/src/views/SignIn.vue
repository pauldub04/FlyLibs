<template>
  <v-container>
    <v-main>

      <h1>Вход в аккаунт</h1>

      <v-row>
        <v-col cols="6">
          <v-form
            class="mt-10"
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="username"
              :rules="rules.required"
              :counter="10"
              label="Имя пользователя"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="rules.required"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              label="Пароль"
              required
              @keyup.enter="signIn"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-10"
              @click="signIn"
            >
              Войти
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-btn
        class="mt-10"
        @click="checkAuth"
      >
        check
      </v-btn>
      <v-btn
        class="mt-10 ml-5"
        @click="logOut"
      >
        logout
      </v-btn>

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    username: null,
    password: null,
    valid: false,

    showPassword: false,
    rules: {
      required: [(value) => !!value || 'Поле должно быть заполнено'],
    },

  }),
  methods: {
    signIn () {
      // if (this.$refs.form.validate()) {
      //   console.log('kek')
      // }
      // this.$refs.form.reset()

      this.$store.dispatch('signIn', {
        username: this.username,
        password: this.password,
      })
    },
    checkAuth() {
      axios.get('/users/testauth')
      .then(response => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    },
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style>
</style>