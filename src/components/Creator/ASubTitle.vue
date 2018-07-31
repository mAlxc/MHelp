<template>
  <v-flex xs10 mb-2>
    <v-text-field v-if="editable" placeholder="Sous Titre"  :full-width="!editable" hide-details single-line class="subheading"  v-model="contentInternal"></v-text-field>
    <h2 v-else  class="subTitle subheading">{{contentInternal}}</h2>
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
.subTitleContainer{
  border-style: solid;
}
</style>
