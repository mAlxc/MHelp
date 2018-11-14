<template>
  <v-select v-model="selection" :items="years" item-text="name" label="Période" persistent-hint return-object single-line></v-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapState({
    // arrow functions can make the code very succinct!
      years (state) {
        return state.years.years
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
