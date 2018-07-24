<template>
    <v-layout mx-3 fill-height justify-start column>
        <v-flex row fluid>
          <v-layout>
            <v-flex>
              <v-text-field v-model="datas.title"></v-text-field>
            </v-flex>
            <v-flex>
              <v-btn @click="saveFiche" small icon flat>
                <v-icon>{{icon}}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <template v-for="(part,i) in datas.parts">
          <a-chapitre :key="'partie' + i" v-if="part.type === 'chapitre'" :editable="editable" :text.sync="part.content"></a-chapitre>
          <a-sub-heading :key="'partie' + i" v-else-if="part.type === 'subHeading'" :editable="editable" :text.sync="part.content"></a-sub-heading>
        </template>
        <v-flex >
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

let exempleFiche = {
  title: 'Nouvelle Fiche',
  matiere: 'chimie',
  parts: [
    {type: 'subHeading', content: 'Introduction'}
  ]
}
export default {
  data () {
    return {
      matiere: 'chimie',
      dialOpen: false,
      items: [{label: 'Sous Titre', val: 'subHeading'}, {label: 'Chapitre', val: 'chapitre'}, {label: 'Image', val: ''}],
      datas: {},
      editable: true
    }
  },
  computed: {
    icon () {
      return this.editable ? 'save' : 'border_color'
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
        isModif: true
      }
      this.datas.parts.push(base)
    },
    openFiche (name) {
      this.$getItem(name, (error, result) => {
        if (!error) {
          console.log(result)
          this.datas = result
        }
      })
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
  components: {AChapitre, ASubHeading}
}
</script>
