<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      Ajouter une nouvelle matiere
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="matName" label="Matiere" outline></v-text-field>
      <p class="caption text--red">{{success}}</p>
      <v-layout>
        <v-flex >
          <select-year v-model="year"></select-year>
        </v-flex>
        <v-flex ml-3 xs2>
          <select-icon v-model="icon" icotype="mat"></select-icon>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="matName==='' && year !==null" color="success" round block @click="SaveMat">
        <v-icon>mdi-save</v-icon>
        Save
      </v-btn>
    </v-card-actions>
    {{newMat}}
    {{year}}
  </v-card>
</template>

<script>
import SelectYear from '@/components/Year/Select'
import SelectIcon from '@/components/Icons/Select'

export default {
  components: { SelectYear, SelectIcon },
  data: () => ({
    matName: '',
    year: { id: null, name: '' },
    icon: '',
    success: null
  }),
  computed: {
    newMat () {
      return {
        name: this.matName,
        year: this.year.id ? this.year.id : null
      }
    }
  },
  methods: {
    SaveMat () {
      this.$store
        .dispatch('matieres/aAddMatiere', this.newMat)
        .then(e => {
          this.success = true
        })
        .catch(e => {
          this.success = false
        })
    }
  }
}
</script>

<style>
</style>
