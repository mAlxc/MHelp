<template>
  <v-card>
    <v-card-title>
      Ajouter un cursus
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="texte" label="Cursus" placeholder="Ex: Licence de physique chimie" outline></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" :disabled="texte===''" round block @click="Save">
        <v-icon>mdi-save</v-icon>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      texte: ''
    }
  },
  methods: {
    async Save () {
      let res = await this.$store.dispatch('cursus/set', {val: this.texte})
      console.log(res)
    }
  }
}
</script>

<style>

</style>
