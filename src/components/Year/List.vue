<template>
  <v-layout
    mt-2
    pa-2
    column
    elevation-4
  >
    <v-flex
      mb-1
    >
     <p class="title font-weight-bold font-italic" > Liste des périodes par cursus</p>
    </v-flex>
    <v-flex
      ma-1
      v-for="(value,key) in filtered(all)"
      :key="key"
    >
      <v-card v-if="value.length>0">
        <v-card-title class="font-italic font-weight-bold subheading">{{name(key)}}</v-card-title>
        <v-list two-line>
          <template v-for="(item, index) in value">
            <v-list-tile
              :key="item.id"
              avatar
              ripple
              @click="toggle(item.id)"
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
                  v-if="!item.fav"
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
            <v-divider
              v-if="index + 1 < value.length"
              :key="key+'_'+index+'_div'"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({ all: 'years/all', name: 'cursus/getNameById' })
  },
  methods: {
    toggle (index) {
      this.$store.dispatch('years/togglefav', index)
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
  created () {
  }
}
</script>

<style>
.listperiode {
  background-color: rgb(224, 224, 224);
}
</style>
