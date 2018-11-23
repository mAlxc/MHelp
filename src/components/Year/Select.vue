<template>
  <v-select v-model="selection" :items="items" item-text="name" label="Période" return-object></v-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapGetters({items: 'years/all'}),
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
