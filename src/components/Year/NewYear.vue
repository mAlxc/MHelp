<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="yearName" label="Année ex: L1" outline></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="Save">
        <v-icon> mdi-save</v-icon>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    yearName: '',
    success: null
  }),
  computed: {},
  methods: {
    Save () {
      this.$store
        .dispatch('years/aAddYear', this.yearName)
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
