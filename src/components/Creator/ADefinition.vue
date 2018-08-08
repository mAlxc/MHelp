<template>
<v-flex xs10 mb-1 mr-3 class="roundLeftBox" pa-0 >
  <v-layout column justify-space-between>
    <v-flex pa-1>
      <v-text-field :full-width="!editable" hide-details flat placeholder="Mot à définir" single-line class="leftJustifyText subTitle" :readonly="!editable" v-model="defNameInternal"></v-text-field>
    </v-flex>
    <v-flex pa-0 mt-1 ml-4>
      <v-textarea :full-width="!editable" placeholder="La définition" hide-details flat auto-grow rows="1" class="leftJustifyText chapter" :readonly="!editable" v-model="contentInternal">
      </v-textarea>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  props: ['defName', 'text', 'editable'],
  computed: {
    contentInternal: {
      get () {
        return this.text
      },
      set (v) {
        this.$emit('update:text', v)
      }
    },
    defNameInternal: {
      get () {
        return this.defName
      },
      set (v) {
        this.$emit('update:defName', v)
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

<style scoped>
</style>
