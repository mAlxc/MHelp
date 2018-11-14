<template>
  <v-layout>
    <v-flex>
      <v-card v-if="items.length>0">
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.id" avatar ripple @click="toggle(index)">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.countFi>0">years associées : {{ item.countMat }}</v-list-tile-sub-title>
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
      years (state) {
        return state.years.years
      }
    }),
    items () {
      let l = []
      console.log(this.years)
      if (this.years) {
        this.years.forEach(mat => {
          console.log(mat)
          let i = { name: mat.name,
            id: mat.id,
            countMat: 0
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
    console.log(this.years)
    console.log(this.items)
  }
}
</script>

<style>
</style>
