<template>
  <v-flex>
    <input onchange="handleFiles(this.files)" type="file"/>
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
