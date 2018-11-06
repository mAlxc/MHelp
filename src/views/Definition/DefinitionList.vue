<template>
  <v-layout column pa-2>
    <v-flex tag="h2">
      Liste des definitions
    </v-flex>
    <v-treeview v-model="tree" :open="open" :items="definitions" activatable item-key="name" open-on-click>
      <template slot="prepend" slot-scope="{ item, open, leaf }">
        <v-icon v-if="!item.icon">
          {{ open ? 'folder-outline' : 'folder' }}
        </v-icon>
        <v-icon v-else>
          {{item.icon}}
        </v-icon>
      </template>
    </v-treeview>
    <v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    open: [],
    tree: [],
    definitions: []
  }),
  created () {
    this.definitions = this.$store.state.definitions.definitions
  }
}
</script>

<style>
</style>
