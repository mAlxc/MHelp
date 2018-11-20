<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="yearName" label="Année ex: L1" outline></v-text-field>
      <v-text-field v-model="cursus" label="Cursus ex: Chimie" outline></v-text-field>
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
export default {
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
          .dispatch('years/aAddYear', {
            name: this.yearName,
            cursus: this.cursus
          })
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
