<template>
  <v-select v-model="selection" :items="icos" label="Icon" single-line>
    <template
      slot="item"
      slot-scope="{ item, index }">
      <v-icon>{{ item }}</v-icon>
    </template>
    <template
      slot="selection"
      slot-scope="{ item, index }">
      <v-icon>{{ item }}</v-icon>
    </template>
  </v-select>
</template>

<script>
import matIco from './matieres.json'
import allIco from '@/assets/datas/icons.json'
export default {
  props: ['icotype', 'value'],
  data () {
    return {
      icos: []
    }
  },
  computed: {
    selection: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    switch (this.icotype) {
      case 'mat':
        this.icos = matIco
        break
      default:
        this.icos = allIco
        break
    }
  }
}
</script>

<style>

</style>
