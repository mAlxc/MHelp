<template>
  <v-layout>
    <v-flex>
      <v-select
        :items="periodiqTableSort"
        v-model="contenu"
        item-text="name"
        return-object
        single-line>
      </v-select>
    </v-flex>
    <v-flex>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="'list_elem' + i" @click="goTo(item)">
          <v-list-tile-content>{{item.substring(6)}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () { },
  computed: {
    items () {
      return this.$store.state.fiches.myFiches
    },
    matieres () {
      return this.$store.state.fiches.myStudies
    }
  },
  methods: {
    goTo (i) {
      this.$router.push({name: 'creator', params: {ficheName: i}})
    }
  }
}
</script>
