<template>
  <v-layout column>
    <v-flex tag="h2">
      Home
    </v-flex>
    <v-flex px-2 my-3>
      <mat-list v-model="selection"></mat-list>
    </v-flex>
    <v-flex px-2 my-3>
      <new-mat></new-mat>
    </v-flex>
    <v-flex px-2 my-3>
      <mat-liste></mat-liste>
    </v-flex>
    <v-flex>
      {{selection}}
    </v-flex>
  </v-layout>
</template>

<script>
import NewMat from '@/components/Matiere/NewMat'
import MatList from '@/components/Matiere/MatSelect'
import MatListe from '@/components/Matiere/MatList'

export default {
  components: { NewMat, MatList, MatListe },
  data () {
    return {
      selection: { name: '', icon: '' }
    }
  }
}
</script>

<style>
</style>
