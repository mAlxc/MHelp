<template>
    <v-flex class="roundLeftBox" pa-2 xs10>
      <v-textarea v-if="editable" :full-width="!editable" placeholder="Chapitre ..." hide-details flat auto-grow rows="1" class="leftJustifyText chapter" :readonly="!editable" v-model="contentInternal">
      </v-textarea>
      <p class="leftJustifyText chapter" v-else>{{contentInternal}}</p>
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
  created () {
    if (!this.editable) {
      this.editable = false
    }
  }
}
</script>
