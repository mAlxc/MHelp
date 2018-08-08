<template>
  <v-layout mx-3 column>
    <v-flex>
      <v-autocomplete
        :items="times"
        v-model="cTime"
        item-text="name"
        aria-placeholder="test"
        @keyup.enter="addNewT"
        single-line>
      </v-autocomplete>
    </v-flex>
    <v-flex>
      <v-autocomplete
        :items="matieres"
        v-model="cMatieres"
        item-text="name"
        @keyup.enter="addNewM"
        single-line>
      </v-autocomplete>
    </v-flex>
    <v-flex mx-2>
      <v-list>
        <v-list-tile v-if="fiche.time === cTime" @click="goToF(fiche)" v-for="(fiche, index) in fiches[cMatieres]" :key="'fi_' + index">
          <v-list-tile-content>{{fiche.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex>
      <v-btn @click="goToN">Ajouter</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      test: ['totot'],
      cMatieres: '',
      cTime: ''
    }
  },
  created () {
    this.cMatieres = this.matieres.length > 0 ? this.matieres[0] : 'Entrée le nom de la matiére'
    this.cTime = this.times.length > 0 ? this.times[0] : 'Entrée le nom de votre periode'
  },
  computed: {
    fiches () {
      return this.$store.state.fiches.fiches
    },
    matieres () {
      let mat = []
      for (const key in this.$store.state.fiches.fiches) {
        if (this.fiches.hasOwnProperty(key)) {
          mat.push(key)
        }
      }
      return mat
    },
    times () {
      return this.$store.state.fiches.times
    }
  },
  methods: {
    goToF (item, event) {
      this.$router.push({ name: 'creator', params: { fiche: item, editable: false } })
    },
    goToN (item, event) {
      this.$router.push({
        name: 'creator',
        params: {
          fiche: {
            title: 'Fiche de ' + this.cMatieres,
            parts: [],
            id: null,
            time: this.cTime,
            type: this.cMatieres
          },
          editable: true
        }
      })
    },
    addNewM (event) {
      console.log(event)
      this.$store.commit('fiches/newMat', event.target.value)
    },
    addNewT (event) {
      console.log(event)
      this.$store.commit('fiches/newTime', event.target.value)
    }
  }
}
</script>
