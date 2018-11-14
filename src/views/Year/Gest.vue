<template>
    <v-layout column>
    <v-flex tag="h2">
      Ma Chronologie
    </v-flex>
    <v-flex>
      <p class="caption">
        Gerer ici vos Années ou semestre c'est comme vous voulez
      </p>
    </v-flex>
    <v-flex px-2 my-3>
      <listing></listing>
    </v-flex>
    <v-flex px-2 my-3>
      <new-one></new-one>
    </v-flex>
  </v-layout>
</template>

<script>
import NewOne from '@/components/Year/New'
import Select from '@/components/Year/Select'
import Listing from '@/components/Year/List'

export default {
  components: {NewOne, Select, Listing}
}
</script>

<style>

</style>
