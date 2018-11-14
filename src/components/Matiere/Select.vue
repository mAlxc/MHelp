<template>
  <v-select v-model="selection" :items="matieres" item-text="name" label="Matiere" persistent-hint return-object single-line></v-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapState({
    // arrow functions can make the code very succinct!
      matieres (state) {
        return state.matieres.matieres
      }
    }),
    selection: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style>
</style>
