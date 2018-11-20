<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      Ajouter une nouvelle matiere
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="matName" label="Matiere" outline></v-text-field>
      <p class="caption text--red">{{success}}</p>
      <v-layout>
        <v-flex>
          <select-year v-model="year"></select-year>
        </v-flex>
        <v-flex ml-3 xs2>
          <select-icon v-model="icon" icotype="mat"></select-icon>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="(matName ==='' || year.id ===null || icon==='')|| pending" color="success" round block @click="SaveMat">
        <v-icon v-if="!pending">mdi-save</v-icon>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
        Save
      </v-btn>
    </v-card-actions>
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
    success: null,
    pending: false
  }),
  computed: {
    newMat () {
      return {
        name: this.matName,
        year: this.year.id ? this.year.id : null,
        icon: this.icon
      }
    }
  },
  methods: {
    async SaveMat () {
      if (this.matName !== '' && this.icon !== '' && this.year.id !== null) {
        this.pending = true
        this.$store
          .dispatch('matieres/aAddMatiere', this.newMat)
          .then(e => {
            this.success = true
            this.pending = false
          })
          .catch(e => {
            this.success = false
            this.pending = false
          })
      }
    }
  }
}
</script>

<style>
</style>
