<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      clipped
      class="primaryBack"
    >
      <v-list dense>
        <v-list-tile v-for="elm in menu" :key="'m_'+elm.name" @click="goTo(elm)">
          <v-list-tile-action>
            <v-icon>{{elm.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{elm.label}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primaryBack" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content class="mainContent">
      <v-container  pa-0 fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer text-xs-center class="primaryBack" app fixed>
      <span>&copy; 2018 AlxcM</span>
    </v-footer>
  </v-app>
</template>

<script>
const menu = [
  {name: 'home', icon: 'home', label: 'Home'},
  {name: 'about', icon: 'help_outline', label: 'A propos'},
  {name: 'chimie', icon: 'invert_colors', label: 'Chimie'},
  {name: 'periodic', icon: 'invert_colors', label: 'Elements du tableau periodique'},
  {name: 'charge', icon: 'invert_colors', label: 'Importer/Exporter'},
  {name: 'fiches', icon: 'invert_colors', label: 'Mes Cours'},
  {name: 'creator', icon: 'invert_colors', label: 'Nouvelle Fiche', params: {editable: true}},
  {name: 'config', icon: 'settings', label: 'Configs'}
]
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      menu: menu
    }
  },
  methods: {
    goTo (item, event) {
      this.$router.push({name: item.name, params: item.params})
    }
  },
  created () {
    this.$storageConfig({
      name: 'Fiches',
      description: 'Base de données interne a lapplication'
    })
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.mainContent{
  background-color: rgb(224, 224, 224);
}

.primaryBack{
  background-color:rgb(80, 160, 252) !important;
}

.subTitle{
  font-style: italic !important;
  text-decoration: underline;
  text-decoration-color:rgb(80, 160, 252);
  word-wrap: break-word;
  text-align: left;
}

.Title{
  font-style: italic !important;
  text-decoration: underline;
  text-decoration-color:rgb(80, 160, 252);
  word-wrap: break-word;
  text-align: left;
}
.caption{
  word-wrap: break-word;
  text-align: justify;
}

.v-list{
  background-color: transparent !important;
}
</style>
