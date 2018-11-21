<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="yearName" label="Année ex: L1" outline></v-text-field>
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
          .dispatch('yearsBis/set', {
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
