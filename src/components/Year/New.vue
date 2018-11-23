<template>
  <v-card>
    <v-card-title>
      Ajouter une période
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="yearName" label="Période" placeholder="Ex: L1 ,S1, Q1, ..." outline></v-text-field>
      <select-cursus v-model="cursus" ></select-cursus>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" :disabled="yearName===''" round block @click="Save">
        <v-icon>mdi-save</v-icon>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SelectCursus from '@/components/Cursus/Select'

export default {
  components: { SelectCursus },
  data: () => ({
    yearName: '',
    cursus: '',
    success: null
  }),
  computed: {},
  methods: {
    Save () {
      if (this.cursus !== '' && this.yearName !== '') {
        this.$store
          .dispatch('years/set', {val: {
            name: this.yearName,
            id_cursus: this.cursus.id
          }})
          .then(e => {
            this.success = true
          })
          .catch(e => {
            this.success = false
          })
      }
    }
  }
}
</script>

<style>
</style>
