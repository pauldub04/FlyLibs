<template>
  <v-container>
    <v-main>

      <h1>Заказы книг</h1>

      <v-btn-toggle
        class="mt-10 mb-5"
        v-model="toggle"
        mandatory
        group
      >
        <v-btn>
          Мои заказы
        </v-btn>
        <v-btn>
          Заказы у меня
        </v-btn>
      </v-btn-toggle>

      <div v-if="toggle % 2 == 0">
        <p class="ml-2 mt-5" v-if="my_orders.length == 0">Вы пока не делали заказoв</p>

        <v-row v-for="(order, i) in my_orders" v-bind:key="i" class='mt-5'>
          <v-col class="ml-5" cols="1">{{i+1}}</v-col>
          <v-col>
            {{order.name}}
          </v-col>
          <v-col>
            {{statuses[order.status]}}
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <p class="ml-2 mt-5" v-if="from_me_orders.length == 0">У вас пока не делали заказoв</p>

        <v-row v-for="(order, i) in from_me_orders" v-bind:key="i" class='mt-5'>
          <v-col class="ml-5" cols="1">{{i+1}}</v-col>
          <v-col>
            {{order.name}}
          </v-col>
          <!-- <v-col>
            {{statuses[order.status]}}
          </v-col> -->

          <v-autocomplete
            class="mx-10"
            v-model="new_statuses[i]"
            :items="statuses"
            label="Статус"
          ></v-autocomplete>

          <v-btn text class="mr-10" :disabled='new_statuses[i] == def_statuses[i]' @click='changeStatus(i, order.id)'>
            Сохранить
          </v-btn>
          <v-btn icon @click='deleteOrder(order.id)'>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </div>

    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Orders',
  data: () => ({
    statuses: ['Запрошена', 'Одобрена', 'Выдана', 'Возвращена'],
    toggle: 0,
    my_orders: [],
    from_me_orders: [],

    def_statuses: [],
    new_statuses: [],
  }),
  methods: {
    fetch() {
      axios.post('/orders/getOrdersById', {
        type: 'my',
        id: this.user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.my_orders = response.data
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })

      axios.post('/orders/getOrdersById', {
        type: 'from_me',
        id: this.user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.from_me_orders = response.data

        this.def_statuses = response.data.map(v => this.statuses[v.status])
        this.new_statuses = response.data.map(v => this.statuses[v.status])
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    },
    changeStatus(i, id) {
      axios.post('/orders/changeStatus', {
        id: id,
        status: this.statuses.indexOf(this.new_statuses[i]),
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.def_statuses = this.new_statuses
        this.fetch()
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    },
    deleteOrder(id) {
      axios.post('/orders/deleteOrder', {
        id: id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        this.fetch()
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
