<template>
  <v-card>
    <v-toolbar card color="grey lighten-3">
      <v-icon>mdi-card-text</v-icon>
      <v-toolbar-title>Toutes les définitions</v-toolbar-title>
    </v-toolbar>

    <v-layout column>
      <v-flex>
        <v-card-text>
          <v-treeview v-model="tree"
          :items="items" activatable
          active-class="grey lighten-4 indigo--text"
          selected-color="indigo"
          open-on-click
          selectable
          expand-icon="mdi-chevron-down"
          on-icon="mdi-bookmark"
          off-icon="mdi-bookmark-outline"
          indeterminate-icon="mdi-bookmark-minus">
            <template slot="prepend" slot-scope="{ item, active }">
            <v-icon>    {{item.icon ?item.icon: "mdi-border-none" }}</v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs12 md6>
        <v-card-text>
          <div v-if="selections.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">
            Select your favorite breweries
          </div>
          <v-scroll-x-transition group hide-on-leave>
            <v-chip v-for="(selection, i) in selections" :key="i" color="grey" dark small>
              <v-icon left small>mdi-beer</v-icon>
              {{ selection.name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat @click="tree = []">
        Reset
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="green darken-1" depressed>
        Me tester
        <v-icon right>mdi-check-decagram</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import defs from '@/assets/datas/definitions.json'
import mats from '@/assets/datas/matieres.json'

export default {
  data: () => ({
    breweries: [],
    definitions: defs,
    isLoading: false,
    tree: [],
    types: [],
    matieres: []
  }),
  created () {
    this.intMatieres()
  },
  computed: {
    items () {
      console.log(this.matieres)
      const children = this.matieres.map(type => ({
        id: type,
        name: this.getName(type),
        children: this.getChildren(type),
        icon: this.getIcon(type)
      }))
      console.log(children)
      return [
        {
          id: -1,
          name: 'All Breweries',
          children
        }
      ]
    },
    selections () {
      const selections = []
      for (const leaf of this.tree) {
        console.log(leaf)
        const brewery = this.definitions.find(brewery => brewery.id === leaf)
        if (!brewery) continue
        selections.push(brewery)
      }

      return selections
    },
    shouldShowTree () {
      return this.breweries.length > 0 && !this.isLoading
    }
  },
  watch: {
    breweries (val) {
      this.types = val
        .reduce((acc, cur) => {
          const type = cur.brewery_type
          if (!acc.includes(type)) acc.push(type)
          return acc
        }, [])
        .sort()
    }
  },
  methods: {
    intMatieres () {
      this.matieres = defs
        .reduce((acc, cur) => {
          const type = cur.matiere_id
          if (!acc.includes(type)) acc.push(type)
          return acc
        }, [])
        .sort()
    },
    getChildren (type) {
      const breweries = []
      for (const brewery of this.definitions) {
        console.log('brew', brewery)
        if (brewery.matiere_id !== type) continue
        breweries.push(
          brewery)
      }
      return breweries.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    },
    getName (name) {
      return mats.find(m => m.id === name).name
    },
    getIcon (name) {
      return mats.find(m => m.id === name).icon
    }
  }
}
</script>
