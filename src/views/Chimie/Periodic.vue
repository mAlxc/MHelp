<template>
    <v-layout column>
      <v-flex>
        <span>Tier par ?</span>
        <v-select
        :items="tri"
        v-model="choice"
        item-text="label"
        return-object
        single-line>
        </v-select>
      </v-flex>
      <v-flex>
        <v-layout column>
          <v-flex v-if="choice.type === 'group'">
            <span>Faites votre choix !</span>
              <v-select
              :items="periodiqTableSort"
              v-model="contenu"
              item-text="name"
              return-object
              single-line>
              </v-select>
          </v-flex>
          <v-flex v-else>
            <span>Element ?</span>
              <v-select
              :items="periodiqTableSort"
              v-model="contenu"
              item-text="fields.name"
              return-object
              single-line>
              </v-select>
          </v-flex>
          <v-flex>
              <v-card v-for="content in aAffficher" :key="content.fields.name">
                <v-card-title primary-title>
                  {{content.fields.name}} {{content.fields.atomicnumber}}
                </v-card-title>
                <v-card-text>
                  <v-layout column>
                    <v-flex>
                      <v-layout mt-1>
                        <v-flex >
                          Symbol: {{content.fields.symbol}}
                        </v-flex>
                        <v-flex v-if="content.fields.standardstate">
                          State: {{content.fields.standardstate}}
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex>
                      <v-layout mt-1>
                        <v-flex >
                          Rayon ionique: {{content.fields.ionradius}}
                        </v-flex>
                        <v-flex v-if="content.fields.boilingpoint">
                          point d'ebulition: {{content.fields.boilingpoint}}°
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
          </v-flex>
        </v-layout>
        </v-flex>
    </v-layout>
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
        {label: 'Standar State', property: 'standardstate', type: 'group'},
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
      if (this.contenu.fields) {
        return [this.contenu]
      } else if (this.contenu.items) {
        return this.contenu.items
      }
    }
  },
  watch: {
    choice (newVal, oldVal) {
      this.contenu = this.firstItem
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
