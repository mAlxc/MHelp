<template>
    <v-container pa-0 fluid grid-list-xs>
        <v-layout class="Title" ml-2 mt-2 row wrap justify-end>
            <v-flex xs10>
              <v-textarea  v-if="editable" placeholder="Nouvelle Fiche" single-line hide-details color="primary" v-model="datas.title" :readonly="!editable" auto-grow rows="1"></v-textarea>
              <p v-else>{{datas.title}}</p>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="saveFiche" small icon flat>
                <v-icon >{{icon}}</v-icon>
              </v-btn>
            </v-flex>
        </v-layout>
        <v-layout v-if="errors.length >0">
          <span v-for="(err, i) in errors" :key="'err'+i" >{{err}}</span>
        </v-layout>
        <v-layout ml-3 column justify-end>
          <draggable v-model="datas.parts" :options="{draggable:'.isDragElemens'}">
            <v-layout :class="editable? 'isDragElemens': ''" mt-2 align-center v-for="(part,i) in datas.parts" :key="'partie' +   i">
              <a-chapitre v-if="part.type === 'chapitre'" :editable="editable" :text.sync="part.content">
              </a-chapitre>
              <a-sub-heading v-else-if="part.type === 'subHeading'" :editable="editable" :text.sync="part.content">
              </a-sub-heading>
              <a-definition v-else-if="part.type === 'definition'" :editable="editable" :text.sync="part.content.text"  :defName.sync="part.content.defName">
              </a-definition>
              <v-flex xs2 v-if="editable">
                <v-btn icon @click="deletePart(part.id)"><v-icon>close</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </draggable>
        </v-layout>
        <v-layout align-center justify-center v-if="editable">
          <v-menu bottom origin="center center" v-model="dialOpen" offset-x transition="scale-transition">
            <v-btn slot="activator" color="primary" small round>
              Ajouter
            </v-btn>
            <v-list>
              <v-list-tile>Ajouter du contenu</v-list-tile>
            </v-list>
            <v-list-tile  v-for="(item,ind) in items" :key="ind" @click="addContent(item)">
              <v-list-tile-title>{{item.label}}</v-list-tile-title>
            </v-list-tile>
        </v-menu>
        </v-layout>
    </v-container>
</template>

<script>
import AChapitre from '@/components/Creator/AChapitre'
import ASubHeading from '@/components/Creator/ASubTitle'
import ADefinition from '@/components/Creator/ADefinition'
import draggable from 'vuedraggable'

let exempleFiche = {
  title: 'Introduction Generale',
  parts: [],
  id: null,
  time: null,
  type: null
}

export default {
  data () {
    return {
      dialOpen: false,
      items: [
        {label: 'Sous Titre', val: 'subHeading'},
        {label: 'Définition', val: 'definition'},
        {label: 'Chapitre', val: 'chapitre'}],
      datas: {},
      editable: true,
      errors: []
    }
  },
  computed: {
    icon () {
      return this.editable ? 'save' : 'border_color'
    },
    lastId () {
      if (this.datas.parts.length > 0) {
        return this.datas.parts[this.datas.parts.length - 1].id
      } else {
        return -1
      }
    }
  },
  created () {
    this.datas = exempleFiche
    if (this.$route.params) {
      let fiche = this.$route.params.fiche
      if (fiche) {
        this.datas = fiche
      } else {
        this.datas.type = 'Chimie'
        this.datas.time = 'L1'
      }
      this.editable = this.$route.params.editable ? this.$route.params.editable : false
    }
  },
  methods: {
    openSelector (a) {
      this.dialOpen = !this.dialOpen
    },
    isEditable () {
      return this.editable
    },
    addContent (elem) {
      let base = {
        type: elem.val,
        content: '',
        id: this.lastId + 1
      }
      switch (elem.val) {
        case 'definition':
          base.content = {defName: '', text: ''}
          break
        default:
          break
      }
      this.datas.parts.push(base)
    },
    deletePart (id) {
      this.datas.parts = this.datas.parts.filter(obj => obj.id !== id)
    },
    saveFiche () {
      if (this.editable) {
        this.errors = []
        if (this.datas.title === '') {
          this.errors.push({id: -1, type: 'Empty Tilte'})
        }
        this.datas.parts.forEach((partie, i) => {
          partie.id = i
          if (partie.type === 'definition') {
            if (partie.content.defName === '' || partie.content.text === '') {
              this.errors.push({id: partie.id, type: 'empty'})
            }
          } else if (partie.content === '') {
            this.errors.push({id: partie.id, type: 'empty'})
          }
        })
        let model = {
          title: this.datas.title,
          parts: this.datas.parts,
          time: this.datas.time,
          id: this.datas.id,
          type: this.datas.type
        }
        if (this.errors.length === 0) {
          this.editable = !this.editable
          this.$store.commit('fiches/saveFiche', model)
        }
      } else {
        this.editable = true
      }
    }
  },
  components: {AChapitre, ASubHeading, ADefinition, draggable}
}
</script>
