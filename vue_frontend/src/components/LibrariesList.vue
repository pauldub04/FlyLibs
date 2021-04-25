<template>
  <v-row>
    <v-col
      v-for="(lib, i) in libraries"
      :key="i"
      cols="4"
    >
      <LibraryCardSmall
        :library="lib"
      />
    </v-col>
  </v-row>
</template>


<script>
import LibraryCardSmall from '@/components/LibraryCardSmall.vue';

export default {
  name: 'LibrariesList',
  props: {
    libraries: Array,
  },
  components: {
    LibraryCardSmall
  },
}
</script>