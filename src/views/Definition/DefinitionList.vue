<template>
  <v-layout column pa-2>
    <v-flex tag="h2">
      Liste des definitions
    </v-flex>
    <v-treeview v-model="tree" :open="open" :items="definitions" activatable item-key="name" open-on-click>
      <template slot="prepend" slot-scope="{ item, open, leaf }">
        <v-icon v-if="!item.icon">
          {{ open ? 'mdi-folder-outline' : 'folder' }}
        </v-icon>
        <v-icon v-else>
          {{item.icon}}
        </v-icon>
      </template>
    </v-treeview>
    <v-flex>
      <textarea v-model="formula" cols="30" rows="10"></textarea>
    </v-flex>
    <v-flex>
      <vue-mathjax :formula="('$$'+formula +'$$')"></vue-mathjax>
    </v-flex>
  </v-layout>
</template>
<script>
import { VueMathjax } from 'vue-mathjax'
export default {
  components: {
    'vue-mathjax': VueMathjax
  },
  data: () => ({
    open: [],
    tree: [],
    definitions: [],
    formula: 'x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.'
  }),
  created () {
    this.definitions = this.$store.state.definitions.definitions
  }
}
</script>

<style>
</style>
