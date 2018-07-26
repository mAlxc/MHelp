<template>
  <v-layout class="definitionContainer" ma-0 column justify-space-between>
    <v-flex pa-1>
      <v-text-field :full-width="!editable" hide-details placeholder="Mot à définir" single-line class="title" :readonly="!editable" v-model="defNameInternal"></v-text-field>
    </v-flex>
    <v-flex pa-0 mt-1 ml-4>
      <v-textarea :full-width="!editable" placeholder="La définition" hide-details flat auto-grow rows="1" class="subheading" :readonly="!editable" v-model="contentInternal">
      </v-textarea>
    </v-flex>
  </v-layout>
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
        console.log(v)
        this.$emit('update:text', v)
      }
    },
    defNameInternal: {
      get () {
        return this.defName
      },
      set (v) {
        console.log(v)
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
.definitionContainer{
  border-style: groove;
  border-color: rgba(0, 102, 255, 0.493);
  border-width: thin;
  border-radius: 15px;
  border-left-width: thick;
  filter: sepia(80%)
}
</style>
