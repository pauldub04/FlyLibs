<template>
  <v-container>
    <v-main class="pb-10">

      <div v-if="addBook">
        <h2>Добавление книги</h2>
        <v-row>
          <v-col cols="8">
            <v-form
              class="mt-5"
              ref="form"
              v-model="valid"
            > 

              <div>
                <v-btn-toggle
                  class="mt-10 mb-5"
                  v-model="name_toggle"
                  mandatory
                  group
                >
                  <v-btn>
                    Выберите произведение
                  </v-btn>
                  <p class="mt-4 ml-5 mr-5">или</p>
                  <v-btn>
                    Cоздайте
                  </v-btn>
                </v-btn-toggle>

                <v-autocomplete
                  v-if="name_toggle == 0"
                  v-model="work"
                  :items="works.map(value => value.name)"
                  label="Название"
                ></v-autocomplete>
                <v-row v-else>
                  <v-col>
                    <v-text-field
                      v-model="newWork"
                      label="Название"
                      :rules="[v => !!v || 'Введите название']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      v-model="genre"
                      :items="genres.map(value => value.name)"
                      label="Жанр"
                      :rules="[v => !!v || 'Введите жанр']"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </div>

              <div>
                <v-btn-toggle
                  class="mt-10 mb-5"
                  v-model="author_toggle"
                  mandatory
                  group
                >
                  <v-btn>
                    Выберите автора
                  </v-btn>
                  <p class="mt-4 ml-5 mr-5">или</p>
                  <v-btn :disabled="isPickedBook">
                    Cоздайте
                  </v-btn>
                </v-btn-toggle>

                <v-autocomplete
                  v-if="author_toggle == 0"
                  v-model="author"
                  :items="authors.map(value => value.author_fullname)"
                  label="Автор"
                  :disabled="isPickedBook"
                ></v-autocomplete>
                <v-row v-else>
                  <v-col>
                    <v-text-field
                      v-model="newAuthor.surname"
                      label="Фамилия"
                      :rules="[v => !!v || 'Введите фамилию']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="newAuthor.name"
                      label="Имя"
                      :rules="[v => !!v || 'Введите имя']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="newAuthor.patronymic"
                      label="Отчество"
                      :rules="[v => !!v || 'Введите отчество']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- 
              <v-text-field
                v-model="year"
                label="Год выпуска"
                :rules="[v => !!v || 'Введите год выпуска']"
                required
              ></v-text-field> -->
              <v-file-input
                class="mt-10 mb-5"
                chips
                show-size
                prepend-icon="mdi-camera"
                label="Фотография (необязательно)"
                truncate-length="50"
                @change="uploadImage"
              ></v-file-input>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mt-10"
                @click="save"
              >
                Добавить
              </v-btn>
              <v-btn
                class="mt-10 ml-5"
                @click="addBook = !addBook"
              >
                Отмена
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </div>


      <div v-else>
        <v-row>
          <v-col>
            <h1> {{ lib.name }} </h1>
            <p> {{ lib.description }} </p>
          </v-col>
          <v-btn v-if="lib.creator_id == this.$store.getters.getUser.id" class="mt-10" @click='addBook = !addBook'>
            Добавить книгу
          </v-btn>
        </v-row>

        <v-row v-if="books.length == 0">
          <v-col>
            <p> В этой библиотеке ещё нет книг </p>
          </v-col>
        </v-row>

        <div v-else>
          <v-row>
            <v-col cols="auto" class="ml-auto">
              <v-btn-toggle
                v-model="toggle_view"
                mandatory
                group
              >
                <v-btn>
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-view-grid</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-divider class="mb-10"></v-divider> 

          <v-row 
            class="mb-15"
          >
            <v-col>
              <Table
                v-if="toggle_view % 2 == 0"
                :books="books"
                :lib="lib"
              />
              <List
                v-else
                :books="books"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      
    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';
import Table from '@/components/Books/Table.vue';
import List from '@/components/Books/List.vue';

export default {
  name: 'Library',
  components: {
    Table,
    List
  },
  data: () => ({
    valid: false,
    books: [],
    lib: {},
    toggle_view: 0,
    addBook: false,

    authors: [],
    author: '',
    author_toggle: false,
    newAuthor: {
      name: '',
      surname: '',
      patronymic: '',
    },

    genres: [],
    genre: '',

    works: [],
    work: '',
    name_toggle: 0,
    newWork: '',

    image: '',

    // year: '',
  }),
  mounted() {
    this.toggle_view = JSON.parse(localStorage.getItem("library_view_type")) || 0;

    this.fetch()

    axios.get(`/books/get_genres`)
    .then(response => {
      console.log(response.data)
      this.genres = response.data
    });

    axios.get(`/libraries/get_libraries/${this.$route.params.ind}`)
    .then(response => {
      // console.log(response.data)
      this.lib = response.data
    });

    this.fetchBooks()
  },
  methods: {
    uploadImage(e) {
      this.image = e;
    },

    save() {
      if (this.isPickedBook) {
        let work_ind = this.works.map(value => value.name).indexOf(this.work);
        let work = this.works[work_ind]
        this.postBook(work);

      } else {
        if (this.author_toggle == 0) {
          let author_ind = this.authors.map(value => value.author_fullname).indexOf(this.author);
          let author = this.authors[author_ind]
          let genre_ind = this.genres.map(value => value.name).indexOf(this.genre);
          let genre = this.genres[genre_ind]

          this.postWork(this.newWork, author, genre)

        } else {
          console.log('author')
          this.postAuthor()
        }
      }
      
    },
    postAuthor() {
      axios.post('/books/addAuthor', {
        name: this.newAuthor.name,
        surname: this.newAuthor.surname,
        patronymic: this.newAuthor.patronymic,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        let author = response.data
        let genre_ind = this.genres.map(value => value.name).indexOf(this.genre);
        let genre = this.genres[genre_ind]

        this.postWork(this.newWork, author, genre)
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    },
    postWork(work, author, genre) {
      axios.post('/books/addWork', {
        name: work,
        id_author: author.id,
        id_genre: genre.id,
      }, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)
        let createdWork = response.data
        this.postBook(createdWork);
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    },
    postBook(work) {
      let formData = new FormData();
      formData.append('id_work', work.id);
      formData.append('id_library', this.$route.params.ind);
      formData.append('image', this.image);

      axios.post('/books/addBook', formData, {
        headers: {
          'Authorization': `Bearer ${this.$store.getters.getToken}` 
        }
      })
      .then(response => {
        console.log(response.data)

        this.fetchBooks()
        this.fetch()
        this.clear()
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
      })
    },
    fetchBooks() {
      console.log('fetched')
      axios.get(`/books/get_books/lib/${this.$route.params.ind}`)
      .then(response => {
        console.log(response.data)
        this.books = response.data
      });
    },
    fetch() {
      axios.get(`/books/get_authors`)
      .then(response => {
        // console.log(response.data)
        this.authors = response.data
      });

      axios.get(`/books/get_works`)
      .then(response => {
        // console.log(response.data)
        this.works = response.data
      });
    },
    clear() {
      this.valid = false
      this.toggle_view = 0
      this.addBook = false

      this.author = ''
      this.author_toggle = false
      this.newAuthor = {
        name: '',
        surname: '',
        patronymic: '',
      },

      this.work = ''
      this.name_toggle = 0
      this.newWork = ''

      this.genre = ''
      // this.year = ''
    }
  },
  watch: {
    toggle_view() {
      localStorage.setItem("library_view_type", this.toggle_view);
    },
    work() {
      if (this.isPickedBook) {
        this.author_toggle = 0

        let work_ind = this.works.map(value => value.name).indexOf(this.work);
        let work_author = this.works[work_ind].author_fullname

        this.author = work_author
      }
    }
  },
  computed: {
    isPickedBook() {
      return this.work !== '' && this.name_toggle == 0
    }
  }
}
</script>
