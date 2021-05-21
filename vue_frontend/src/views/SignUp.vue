<template>
  <v-container>
    <v-main>

      <h1>Создание аккаунта</h1>

      <v-row>
        <v-col cols="6">
          <v-form
            class="mt-10"
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="username"
              label="Логин"
              :rules="[v => !!v || 'Введите логин']"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Почта"
              required
            ></v-text-field>
            <v-text-field
              v-model="name"
              label="Имя"
              :rules="[v => !!v || 'Введите имя']"
              required
            ></v-text-field>
            <v-text-field
              v-model="surname"
              label="Фамилия"
              :rules="[v => !!v || 'Введите фамилию']"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              label="Пароль"
              required
            ></v-text-field>
            <v-text-field
              label="Повторите пароль"
              :rules="[v => (v && v == password) || 'Пароли не совпадают',]"
              type="password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-10"
              @click="signup"
            >
              Создать аккаунт
            </v-btn>
          </v-form>
        </v-col>
      </v-row>

    </v-main>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    valid: false,
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    showPassword: false,
    emailRules: [
      v => !!v || 'Введите почту',
      v => /.+@.+\..+/.test(v) || 'Введите правильную почту',
    ],
    passwordRules: [
      v => !!v || 'Введите пароль',
      v => (v && v.length >= 8) || 'Пароль должен содержать хотя бы 8 символов',
    ]
  }),
  methods: {
    signup () {
      // if (this.$refs.form.validate()) {
      //   console.log('kek')
      // }
      // this.$refs.form.reset()

      this.$store.dispatch('signUp', {
        username: this.username,
        email: this.email,
        name: this.name,
        surname: this.surname,
        password: this.password,
      })

    },
  }
}
</script>

<style>

</style>