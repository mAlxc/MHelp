<template>
  <v-container pa-0 >
    <v-layout ml-0 align-center justify-space-between>
      <v-flex >
        <v-textarea :full-width="!editable" placeholder="Zone de texte vous pouvez ecrire ce que vous voulez" hide-details flat auto-grow rows="1" class="body-1" :readonly="!editable" v-model="contentInternal">
        </v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
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
        console.log(v)
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
