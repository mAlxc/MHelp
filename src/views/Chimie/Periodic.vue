<template>
    <v-layout column>
      <v-flex>
        <v-select
        :items="tri"
        v-model="choice"
        item-text="label"
        return-object
        single-line>
        </v-select>
      </v-flex>
      <v-flex>
           <v-list v-if="choice.type === 'group'">
             <v-list-group  prepend-icon="star" v-for="(item,index) in periodiqTableSort" :key="index">
               <v-list-tile slot="activator">
                 <v-list-tile-content>
                   <v-list-tile-title>{{item.name}}</v-list-tile-title>
                 </v-list-tile-content>
               </v-list-tile>
                  <v-expansion-panel>
                    <v-expansion-panel-content v-for="subItem in item.items" :key="index + '_' + subItem.fields.symbol">
                      <span slot="header">{{subItem.fields.name}}</span>
                      <v-card>
                        {{subItem.fields.symbol}}
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
             </v-list-group>
           </v-list>
           <v-expansion-panel v-else>
              <v-expansion-panel-content v-for="item in periodiqTableSort" :key="item.fields.symbol">
                <span slot="header">{{item.fields.name}}</span>
                <v-card>
                  {{item.fields.symbol}}
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>
    </v-layout>
</template>

<script>
import periodiqTableData from '@/assets/datas/Chimie/periodic-table.json'

export default {
  name: 'periodic-table',
  data () {
    return {
      periodiqTable: periodiqTableData.sort((a, b) => {
        return a.fields.atomicnumber - b.fields.atomicnumber
      }),
      tri: [
        {label: 'Atomic Order', list: 'periodiqTable', property: 'atomicnumber', type: 'number'},
        {label: 'Standar State', list: 'periodiqTable', property: 'standardstate', type: 'group'},
        {label: 'Group', list: 'periodiqTable', property: 'groupblock', type: 'group'}],
      choice: {label: 'Atomic Order', list: 'periodiqTable', property: 'atomicnumber', type: 'number'}
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
    }
  }
}

function groupBy (table, property) {
  return table.reduce((acc, obj) => {
    let cle = obj.fields[property]
    if (cle === undefined) {
      cle = 'others'
      console.log(obj)
    }
    if (!acc[cle]) {
      acc[cle] = {
        name: cle,
        items: []
      }
    }
    console.log(cle)
    acc[cle].items.push(obj)
    return acc
  }, {})
}
function dynamicSort (property) {
  return function (a, b) {
    let result = (a.fields[property] < b.fields[property]) ? -1 : (a.fields[property] > b.fields[property]) ? 1 : 0
    return result
  }
}
</script>
