<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      clipped
      class="primaryBack"
      style="width:70vw"
    >
      <v-list class="chapter" dense>
        <template v-for="elm in menu" >
          <v-list-tile avatar :key="'m_'+elm.name"  @click="goTo(elm)">
            <v-list-tile-action>
              <v-icon >{{elm.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{elm.label}}
            </v-list-tile-content>
          </v-list-tile>
        </template>

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
    },
    initAll () {
      this.$store.dispatch('fiches/initModule')
    }
  },
  created () {
    this.initAll()
  },
  mounted () {
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}
.mainContent{
  background-color: rgb(224, 224, 224);
}

.primaryBack{
  background-color:rgb(80, 160, 252) !important;
}

.subTitle{
  font-style: italic !important;
  word-wrap: break-word;
  text-align: left;
  font-size: 5vmin;
}

.subTitle *{
  font-size: inherit !important;
  line-height: inherit !important;
}

.Title{
  font-style: italic !important;
  word-wrap: break-word;
  font-size: 7vmin;
  line-height: 7.01vmin;
  text-align: center;
}

.Title * {
  font-size: inherit !important;
  line-height: inherit !important;
}

.v-navigation-drawer--close.v-navigation-drawer--temporary {
    transform: translateX(-70vw) !important;
}

.chapter{
  font-size: 3.5vmin;
  line-height: 3.6vmin;
  text-align: justify;
  text-align-last: left;
  text-justify: auto;
}

.chapter *{
  font-size: inherit !important;
  line-height: inherit !important;
  text-align: inherit !important;
}

.roundLeftBox{
  border-style: groove;
  border-color: rgba(0, 102, 255, 0.6);
  border-width: 0ch;
  border-radius: 15px;
  border-left-width: thick;
  border-bottom-width: thin;
}
.underlign{
  border-bottom: thin rgba(0, 102, 255, 0.6) solid;
}
.v-list{
  background-color: transparent !important;
}

</style>
