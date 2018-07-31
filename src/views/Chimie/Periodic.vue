<template>
    <v-container pa-0 grid-list-xs>
      <v-layout column>
        <v-flex mt-2 tag="h3" v-html="'Tier par ?'"></v-flex>
        <v-flex mx-4>
          <v-select
          :items="tri"
          v-model="choice"
          item-text="label"
          return-object
          single-line>
          </v-select>
        </v-flex>
              <v-divider></v-divider>
                  <v-flex v-if="choice.type === 'group'">
            <span>Encore un peu de précision !</span>
              <v-select
              :items="periodiqTableSort"
              v-model="contenu"
              item-text="name"
              return-object
              single-line>
              </v-select>
          </v-flex>
      </v-layout>

      <v-layout mt-1 column>

          <v-flex xs10>
            <v-list>
              <v-list-tile v-for="content in aAffficher" :key="content.fields.name" avatar>
                <v-list-tile-avatar color="blue lighten-3">
                  <span class="white--text headline">{{content.fields.symbol}}</span>
                </v-list-tile-avatar >
                <v-list-tile-content>
                  <v-list-tile-title v-html="content.fields.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="'Numéro atomique :' + content.fields.atomicnumber"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import periodiqTableData from '@/assets/datas/Chimie/periodic-table.json'

export default {
  name: 'periodic-table',
  created () {
    this.choice = this.tri[0]
    this.contenu = this.firstItem
  },
  data () {
    return {
      periodiqTable: periodiqTableData.sort((a, b) => {
        return a.fields.atomicnumber - b.fields.atomicnumber
      }),
      panel: [],
      tri: [
        {label: 'Atomic Order', property: 'atomicnumber', type: 'number'},
        {label: 'point de fusion', property: 'boilingpoint', type: 'number'},
        {label: 'État standard', property: 'standardstate', type: 'group'},
        {label: 'Type de liaison', property: 'bondingtype', type: 'group'},
        {label: 'Group', property: 'groupblock', type: 'group'}],
      choice: {},
      contenu: {}
    }
  },
  computed: {
    periodiqTableSort () {
      let p = periodiqTableData
      if (this.choice.type === 'group') {
        p = groupBy(this.periodiqTable, this.choice.property)
      } else {
        p.sort(dynamicSort(this.choice.property))
      }
      return p
    },
    firstItem () {
      return this.periodiqTableSort[0]
    },
    aAffficher () {
      let p = []
      if (this.contenu.fields) {
        p = [this.contenu]
        p.sort(dynamicSort('atomicnumber'))
      } else if (this.contenu.items) {
        p = this.contenu.items
        p.sort(dynamicSort('atomicnumber'))
      } else {
        p = this.contenu
      }
      return p
    }
  },
  watch: {
    choice (newVal, oldVal) {
      if (newVal.type === 'number') {
        this.contenu = this.periodiqTableSort
      } else {
        this.contenu = this.firstItem
      }
    }
  }
}

function groupBy (table, property) {
  let grp = table.reduce((acc, obj) => {
    let cle = obj.fields[property]
    if (cle === undefined) {
      cle = 'others'
    }
    if (!acc[cle]) {
      acc[cle] = {
        name: cle,
        items: []
      }
    }
    acc[cle].items.push(obj)
    return acc
  }, {})
  let t = []
  for (const g in grp) {
    if (grp.hasOwnProperty(g)) {
      const element = grp[g]
      t.push(element)
    }
  }
  return t
}
function dynamicSort (property) {
  return function (a, b) {
    let result = (a.fields[property] < b.fields[property]) ? -1 : (a.fields[property] > b.fields[property]) ? 1 : 0
    return result
  }
}
</script>
