<template>
  <v-layout fill-height>
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
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: []
    }
  },
  created () {
    this.$keysInStorage((err, res) => {
      if (err) {
        console.error(err)
      } else {
        this.items = res
      }
    })
  },
  methods: {
    goTo (i) {
      this.$router.push({name: 'creator', params: {ficheName: i}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
