<template>
  <v-text-field v-model="texte" v-on:keyup.enter="submit"></v-text-field>
</template>

<script>
export default {
  data () {
    return {
      texte: ''
    }
  },
  methods: {
    async submit () {
      let res = await this.$store.dispatch('cursus/set', this.texte)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
