<template>
  <v-container>
    <v-main>

      <h1>Создание библиотеки</h1>
      
      <v-row>
        <v-col cols="6">
          <v-form
            class="mt-10"
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="name"
              label="Название"
              :rules="namesRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="desc"
              label="Описание"
            ></v-text-field>
            <v-text-field
              v-model="img"
              label="Фотография (ссылка)"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-10"
              @click="create"
            >
              Создать библиотеку
            </v-btn>
          </v-form>
        </v-col>
      </v-row>

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Create',
  components: {},
  data: () => ({
    valid: false,
    name: 'Библиотека ',
    desc: '',
    img: '',
    namesRules: [
      v => !!v || 'Введите название',
      v => (v != 'Библиотека ') || 'Введите название',
    ]
  }),
  mounted() {},
  computed: {},
  methods: {
    create() {
      axios.post('/libraries/create', {
        name: this.name,
        description: this.desc,
        image: this.img,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.$router.push(`/library/${response.data.id}`)
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })

    }
  },
}
</script>
