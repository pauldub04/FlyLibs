<template>
  <v-container>
    <v-main>

      <div v-if="adding">
        <h2>Добавление администратора</h2>

        <v-row>
          <v-col cols="8">
            <v-form
              class="mt-10"
              ref="form"
              v-model="valid"
            >
              <v-autocomplete
                v-model="newAdmin"
                :items="users.filter(value => value.role !== 'admin').map(value => value.username)"
                label="Пользователь"
              ></v-autocomplete>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mt-10"
                @click="save"
              >
                Добавить
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row>
          <v-col>
            <h1>Администраторы сайта</h1>
          </v-col>
          <v-btn @click="adding = !adding" class="mt-10">
            Добавить
          </v-btn>
        </v-row>

        <v-divider class="mt-15 mb-15"></v-divider>

        <v-row>
          <v-col
            v-for="(admin, i) in admins"
            :key="i"
            cols="5"
          >
            <v-card
              class="mx-auto mb-5"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ admin.email }}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ admin.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ admin.name }} {{ admin.surname }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-card>
          </v-col>
        </v-row>
      </div>

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data: () => ({
    valid: false,
    admins: [],
    users: [],
    adding: false,
    newAdmin: '',
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      axios.get('/users/get_admins')
      .then(response => {
        // console.log(response.data)
        this.admins = response.data
      });
      axios.get('/users/get_users')
      .then(response => {
        console.log(response.data)
        this.users = response.data
      });
    },
    save() {
      let ind = this.users.map(value => value.username).indexOf(this.newAdmin);
      let user = this.users[ind]

      axios.post('/users/make_admin', {
        id: user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)

        this.fetch()
        this.newAdmin = ''
        this.adding = false
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    }
  }
}
</script>
