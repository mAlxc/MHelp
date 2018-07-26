<template>
    <v-layout mt-2 align-start justify-start column fill-height>
        <v-flex ml-4>
          <v-layout align-baseline justify-space-between row>
            <v-flex mr-3>
              <v-text-field placeholder="Nouvelle Fiche" class="display-1" single-line hide-details color="primary"  v-model="datas.title" :readonly="!editable"></v-text-field>
            </v-flex>
            <v-flex>
              <v-btn @click="saveFiche" small icon flat>
                <v-icon >{{icon}}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex mb-2>
          <v-layout align-start justify-space-between row fill-height  v-for="(part,i) in datas.parts" :key="'partie' + i">
            <v-flex ml-3 mt-1 v-if="part.type === 'chapitre'">
              <a-chapitre :editable="editable" :text.sync="part.content">
              </a-chapitre>
            </v-flex>
            <v-flex ml-5 mt-3 v-else-if="part.type === 'subHeading'">
              <a-sub-heading :editable="editable" :text.sync="part.content">
              </a-sub-heading>
            </v-flex>
            <v-flex mx-4 mt-4 v-else-if="part.type === 'definition'">
              <a-definition :editable="editable" :text.sync="part.content.text" :defName.sync="part.content.defName">
              </a-definition>
            </v-flex>
            <v-flex v-if="editable">
              <v-btn icon @click="deletePart(part.id)"><v-icon>close</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex v-if="editable">
          <v-menu bottom origin="center center" v-model="dialOpen" offset-x transition="scale-transition">
            <v-btn slot="activator" color="primary" small round>
              Ajouter
            </v-btn>
            <v-list>
              <v-list-tile>Ajouter du contenu</v-list-tile>
            </v-list>
            <v-list-tile v-for="(item,ind) in items" :key="ind" @click="addContent(item)">
              <v-list-tile-title>{{item.label}}</v-list-tile-title>
            </v-list-tile>
        </v-menu>
        </v-flex>
    </v-layout>
</template>

<script>
import AChapitre from '@/components/Creator/AChapitre'
import ASubHeading from '@/components/Creator/ASubTitle'
import ADefinition from '@/components/Creator/ADefinition'

let exempleFiche = {
  title: '',
  matiere: 'chimie',
  parts: [
    {type: 'subHeading', content: 'Introduction', id: 0}
  ]
}
export default {
  data () {
    return {
      matiere: 'chimie',
      dialOpen: false,
      items: [{label: 'Sous Titre', val: 'subHeading'}, {label: 'Définition', val: 'definition'}, {label: 'Chapitre', val: 'chapitre'}, {label: 'Image', val: ''}],
      datas: {},
      editable: false
    }
  },
  computed: {
    icon () {
      return this.editable ? 'save' : 'border_color'
    },
    lastId () {
      console.log(this.datas.parts.length)
      if (this.datas.parts.length > 0) {
        return this.datas.parts[this.datas.parts.length - 1].id
      } else {
        return -1
      }
    }
  },
  created () {
    console.log('create')
    this.datas = exempleFiche
    console.log(this.datas)
    if (this.$route.params) {
      let name = this.$route.params.ficheName
      console.log(this.$route.params)
      if (name) {
        console.log(name)
        this.openFiche(name)
      }
    }
  },
  methods: {
    openSelector (a) {
      this.dialOpen = !this.dialOpen
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
    openFiche (name) {
      this.$getItem(name, (error, result) => {
        if (!error) {
          console.log(result)
          if (result) {
            this.datas = result
          }
        }
      })
    },
    deletePart (id) {
      console.log(this.datas.parts)
      this.datas.parts = this.datas.parts.filter(obj => obj.id !== id)
    },
    saveFiche () {
      this.editable = !this.editable
      if (!this.editable) {
        let model = {
          title: this.datas.title,
          matiere: this.datas.matiere,
          parts: this.datas.parts
        }

        console.log(model)
        this.$setItem('fiche_' + this.datas.title.trim(), model, function (err, res) {
          console.log(err, res)
        })
      }
    }
  },
  components: {AChapitre, ASubHeading, ADefinition}
}
</script>
