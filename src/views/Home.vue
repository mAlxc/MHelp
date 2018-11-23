<template>
  <v-layout column pa-2>
    <v-flex tag="h2">
      Home
    </v-flex>
    <v-flex mt-2>
      <new-cursus></new-cursus>
      <c-list></c-list>
    </v-flex>
    <v-flex mt-2>
      <new-year></new-year>
      <y-liste></y-liste>
    </v-flex>
  </v-layout>
</template>

<script>
import NewMat from '@/components/Matiere/New'
import NewYear from '@/components/Year/New'
import MatList from '@/components/Matiere/Select'
import MatListe from '@/components/Matiere/List'
import YListe from '@/components/Year/List'
import newCursus from '@/components/Cursus/New'
import CList from '@/components/Cursus/List'

export default {
  components: { NewMat, MatList, MatListe, newCursus, NewYear, YListe, CList },
  data () {
    return {
      selection: { name: '', icon: '' }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>
</style>
