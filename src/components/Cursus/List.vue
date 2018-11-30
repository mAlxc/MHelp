<template>
  <v-layout>
    <v-flex>
      <v-card v-if="items.length>0">
        <v-card-title>
          <h1>Liste des cursus disponible</h1>
          <p class="caption">(Les cursus sont generalisé)</p>
        </v-card-title>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.id"
              avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="item.countFi>0">Periodes associées : {{ item.countMat }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  Crée le {{item.created.toLocaleDateString("Fr-fr",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
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
      selected: []
    }
  },
  computed: {
    ...mapGetters({ items: 'cursus/all' })
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
