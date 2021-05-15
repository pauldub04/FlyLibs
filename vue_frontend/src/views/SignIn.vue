<template>
  <v-container>
    <v-main>

      <h1>Вход в аккаунт</h1>

      <v-form
        class="mt-10"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :counter="10"
          label="First name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>
      </v-form>

    </v-main>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>
</style>