<template>
  <v-flex tag="h1">
    Chargement
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      files: []
    }
  },
  methods: {
    handleFiles (files) {
      console.log(files)
    }
  }
}
</script>
