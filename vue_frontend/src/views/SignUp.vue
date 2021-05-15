<template>
  <v-container>
    <v-main>

      <h1>Создание аккаунта</h1>

      <v-form
        class="mt-10"
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="login"
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
          label="Пароль"
          required
        ></v-text-field>
        <v-text-field
          label="Повторите пароль"
          :rules="[v => (v && v == password) || 'Пароли не совпадают',]"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mt-4"
          @click="signup"
        >
          Создать аккаунт
        </v-btn>
      </v-form>

    </v-main>
  </v-container>
</template>

<script>
export default {
    data: () => ({
      valid: false,
      login: '',
      email: '',
      name: '',
      surname: '',
      password: '',
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
        if (this.$refs.form.validate()) {
          console.log('kek')
        }

        // this.$refs.form.reset()
      },
    }
}
</script>

<style>

</style>