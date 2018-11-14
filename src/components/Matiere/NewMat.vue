<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="matName" label="Matiere" outline></v-text-field>
      <p class="caption text--red">{{success}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="SaveMat">
        <v-icon> mdi-save</v-icon>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    matName: '',
    success: null
  }),
  computed: {
    listeMatieres () {
      console.log(this.$store.state)
      return []
    }
  },
  methods: {
    SaveMat () {
      this.$store
        .dispatch('matieres/aAddMatiere', this.matName)
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
