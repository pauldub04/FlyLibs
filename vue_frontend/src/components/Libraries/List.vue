<template>
  <v-row>
    <v-col
      v-for="(lib, i) in libraries"
      :key="i"
      cols="4"
    >
      <CardSmall
        :library="lib"
      />
    </v-col>
  </v-row>
</template>


<script>
import CardSmall from '@/components/Libraries/CardSmall.vue';

export default {
  name: 'LibrariesList',
  props: {
    libraries: Array,
  },
  components: {
    CardSmall
  },
}
</script>