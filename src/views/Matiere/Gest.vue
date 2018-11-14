<template>
    <v-layout column>
    <v-flex tag="h2">
      Mes Matieres
    </v-flex>
    <v-flex>
      <p class="caption">
        Gerer ici vos matieres, pensez a ajoutez des années ou semestres afin de pouvoir ajouter des matieres
      </p>
    </v-flex>
    <v-flex px-2 my-3>
      <listing></listing>
    </v-flex>
    <v-flex px-2 my-3>
      <new-one></new-one>
    </v-flex>
    <v-flex>
      {{selection}}
    </v-flex>
  </v-layout>
</template>

<script>
import NewOne from '@/components/Matiere/New'
import Select from '@/components/Matiere/Select'
import Listing from '@/components/Matiere/List'

export default {
  components: {NewOne, Select, Listing},
  data () {
    return {
      selection: null
    }
  }
}
</script>

<style>

</style>
