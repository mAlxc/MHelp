<template>
  <v-select v-model="selection" :items="items" item-text="name" label="Le cursus associée" outline return-object></v-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapGetters({items: 'cursus/all'}
    ),
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
