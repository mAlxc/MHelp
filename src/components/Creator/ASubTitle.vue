<template>
  <v-layout>
    <v-flex >
      <v-text-field v-if="editable"  :full-width="!editable" hide-details single-line class="title "  v-model="contentInternal"></v-text-field>
      <h2 v-else  class="subTitle title">{{contentInternal}}</h2>
    </v-flex>
  </v-layout>
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
