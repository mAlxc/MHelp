<template>
<v-flex  xs11 mb-1 class="defBox" >
  <v-layout column>
    <v-flex pa-0 class="subTitle">
      <v-textarea v-if="editable" :full-width="!editable" placeholder="Definir quoi ?" hide-details flat auto-grow :readonly="!editable" v-model="defNameInternal" rows="1"></v-textarea>
      <span v-else class="">{{defNameInternal}}</span>
    </v-flex>
    <v-flex class="chapter" pa-0 mt-2 ml-2>
      <v-textarea v-if="editable" placeholder="La définition" v-model="contentInternal" single-line hide-details >
      </v-textarea>
      <p v-else>{{contentInternal}}</p>
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
.defBox{
  border: medium dotted rgba(0, 102, 255, 0.493);
}
</style>
