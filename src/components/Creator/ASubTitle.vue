<template>
  <v-flex xs10 pa-2 mb-2 class="subTitleContainer">
    <v-text-field v-if="editable" placeholder="Sous Titre"  :full-width="!editable" hide-details single-line class="subTitle"  v-model="contentInternal"></v-text-field>
    <h2 v-else  class="subTitle">{{contentInternal}}</h2>
  </v-flex>
</template>

<script>
export default {
  props: ['text', 'editable'],
  computed: {
    contentInternal: {
      get () {
        return this.text
      },
      set (v) {
        this.$emit('update:text', v)
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    if (!this.editable) {
      this.editable = false
    }
  }
}
</script>

<style scoped>
</style>
