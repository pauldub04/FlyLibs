<template>
  <v-container>
    <v-main>

      <div v-if="error">
        <h1>Такого пользователя не существует</h1>
        <v-btn to="/" color="success" class="my-5">
          На главную
        </v-btn>
      </div>

      <div v-else>
        <v-list v-if="!edit">
          <v-list-item>
            <v-row>
              <v-col cols="2">
                <v-avatar
                  color="grey lighten-1"
                  size="88"
                >
                  <span class="white--text headline"> {{ user.name.charAt(0) + user.surname.charAt(0) }} </span>
                </v-avatar>
              </v-col>
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-row>
                      <v-col cols="3">
                        <h1>{{ user.name }} {{ user.surname }}</h1>
                      </v-col>
                      <v-col v-if="$route.params.id == $store.getters.getUser.id" class="ml-5">
                        <v-btn icon @click="edit = !edit">
                          <v-icon>mdi-pen</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-title>

                  <v-list-item-title class="mt-5">
                    {{ user.username }}
                    <span v-if="user.role === 'admin'" class="primary--text"> (администратор)</span>
                  </v-list-item-title>
                  <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
                  
                  <v-row v-if="$store.getters.getUser.id == $route.params.id">
                    <v-col>
                      <v-btn to="/logout" class="mt-10">
                        Выйти
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-list-item-content>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>

      <!-- ---------------------------- -->
        <v-row v-else>
          <v-col cols="6">
            <v-form
              class="mb-10"
              ref="form"
              v-model="valid"
            >

              <v-text-field
                v-model="change_user.username"
                :rules="[v => !!v || 'Введите логин']"
                label="Логин"
                required
              ></v-text-field>
              <v-text-field
                v-model="change_user.email"
                :rules="emailRules"
                label="Почта"
                required
              ></v-text-field>
              <v-text-field
                v-model="change_user.name"
                :rules="[v => !!v || 'Введите имя']"
                label="Имя"
                required
              ></v-text-field>
              <v-text-field
                v-model="change_user.surname"
                label="Фамилия"
                :rules="[v => !!v || 'Введите фамилию']"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mt-10"
                @click="save"
              >
                Сохранить
              </v-btn>

              <v-btn
                color="error"
                class="mt-10 ml-5"
                @click="edit = !edit"
              >
                Отмена
              </v-btn>
            </v-form>
          </v-col>
        </v-row>

      </div>
    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'User',
  data: () => ({
    valid: false,
    user: {},
    change_user: {},
    error: null,
    edit: false,
    emailRules: [
      v => !!v || 'Введите почту',
      v => /.+@.+\..+/.test(v) || 'Введите правильную почту',
    ],
  }),
  mounted() {
    // console.log(this.$store.getters.getToken)
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios.get(`/users/get_user/${this.$route.params.id}`)
      .then(response => {
        // console.log(response.data)
        this.user = response.data
        this.change_user = response.data
      })
      .catch((error) => {
        console.log(error.response)
        this.error = error.response.status;
      })
    },
    save() {
      console.log(this.change_user);

      axios.post(`/users/update/${this.change_user.id}`, {
        id: this.change_user.id,
        username: this.change_user.username,
        name: this.change_user.name,
        surname: this.change_user.surname,
        email: this.change_user.email,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.fetchUser();
        this.edit = !this.edit;
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })

    }
  }
}
</script>
