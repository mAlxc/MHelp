<template>
  <v-layout>
    <v-flex>
      <v-card v-if="items.length>0">
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.id" avatar ripple @click="toggle(index)">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{item}}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.countFi>0">Definitions associées : {{ item.countDef }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.countDef>0">Equations associées : {{ item.countEq }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.countEq>0">Definitions associées : {{ item.count }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1">
                  star_border
                </v-icon>

                <v-icon v-else color="yellow darken-2">
                  star
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      selected: []
    }
  },
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      matieres (state) {
        return state.matieres.matieres
      }
    }),
    items () {
      let l = []
      console.log(this.matieres)
      if (this.matieres) {
        this.matieres.forEach(mat => {
          let i = { name: mat.name,
            id: mat.id,
            icon: mat.icon,
            countDef: this.$store.getters['definitions/gNumDefForMat'](mat.id),
            countEq: 0,
            countFi: 0
          }
          l.push(i)
        })
      }
      return l
    }
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  },
  created () {
  }
}
</script>

<style>
</style>
