<template>
  <v-layout column>
    <v-flex tag="h2">
      Home
    </v-flex>
    <v-flex>
      <new-cursus></new-cursus>
    </v-flex>
  </v-layout>
</template>

<script>
import NewMat from '@/components/Matiere/New'
import MatList from '@/components/Matiere/Select'
import MatListe from '@/components/Matiere/List'
import newCursus from '@/components/Cursus/New'

export default {
  components: { NewMat, MatList, MatListe, newCursus },
  data () {
    return {
      selection: { name: '', icon: '' }
    }
  },
  created () {
    this.getYears()
  },
  methods: {
    async getYears () {
      let a = await this.$store.dispatch('years/aGetYears')
      console.log(a)
    }
  }
}
</script>

<style>
</style>
