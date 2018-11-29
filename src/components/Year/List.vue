<template>
  <v-layout pa-1 column>
    <v-flex mb-2 class="title font-weight-bold font-italic">
      Liste des périodes
    </v-flex>
    <v-flex pa-1
      v-for="(value,key) in filtered(all)"
      :key="key">
      <v-card v-if="value.length>0">
        <v-card-title class="font-italic subheading">{{name(key)}}</v-card-title>
        <v-card-text>
          <v-list two-line>
            <template v-for="(item, index) in value">
              <v-list-tile
                :key="item.id"
                avatar
                ripple
                @click="toggle(index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="item.countFi>0">years associées : {{ item.countMat }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    Crée le {{item.created.toLocaleDateString("Fr-fr",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon
                    v-if="selected.indexOf(index) < 0"
                    color="grey lighten-1"
                  >
                    star_border
                  </v-icon>
                  <v-icon
                    v-else
                    color="yellow darken-2"
                  >
                    star
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < value.length" :key="key+'_'+index+'_div'"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      selected: []
    }
  },
  computed: {
    ...mapGetters({ all: 'years/all', name: 'cursus/getNameById' })
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)
      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },
    filtered (list) {
      let i = {}
      list.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue.id_cursus]) {
          accumulator[currentValue.id_cursus].push(currentValue)
        } else {
          accumulator[currentValue.id_cursus] = [currentValue]
        }
        return accumulator
      }, i)
      console.log(list)
      return i
    }
  },
  created () {}
}
</script>

<style>
</style>
