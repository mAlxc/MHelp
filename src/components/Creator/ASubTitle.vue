<template>
  <v-flex class="subTitle subTitleContainer" xs10 pa-2 mb-2>
    <v-text-field v-if="editable" placeholder="Sous Titre"  :full-width="!editable" hide-details single-line  v-model="contentInternal"></v-text-field>
    <h2 v-else>{{contentInternal}}</h2>
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
