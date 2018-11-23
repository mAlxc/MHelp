<template>
  <v-app id="app">
    <template v-if="user">
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-light">Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon fab @click="signOut">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="mainContent">
      <v-container fill-height  pa-0 fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer text-xs-center class="primaryBack" app fixed>
      <span>&copy; 2018 AlxcM</span>
    </v-footer>
    </template>
    <template v-else>
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import fireabse from 'firebase'
const menu = [
  {name: 'home', icon: 'mdi-home', label: 'Home'},
  {name: 'yearsGest', icon: 'mdi-calendar-edit', label: 'Ma chronologie'},
  {name: 'matieresGest', icon: 'mdi-animation', label: 'Matieres'},
  {name: 'chimie', icon: 'mdi-biohazard', label: 'Chimie'},
  {name: 'definitions', icon: 'mdi-playlist-check', label: 'Toutes mes definitions'},
  {name: 'periodic', icon: 'mdi-invert_colors', label: 'Elements du tableau periodique'},
  {name: 'charge', icon: 'mdi-playlist-check', label: 'Importer/Exporter'},
  {name: 'fiches', icon: 'mdi-playlist', label: 'Mes Cours'},
  {name: 'config', icon: 'mdi-settings', label: 'Configs'},
  {name: 'about', icon: 'mdi-help', label: 'A propos'}
]
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      menu: menu
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    goTo (item, event) {
      this.$router.push({name: item.name, params: item.params})
    },
    signOut: function () {
      this.$store.dispatch('user/logOff')
    },
    initAll () {
      this.$store.dispatch('fiches/initModule')
    }
  },
  created () {
    fireabse.auth().onAuthStateChanged(a => {
      if (a === null) {
        this.$router.push({name: 'signIn'})
      } else {
        this.$store.dispatch('user/setUser')
        this.$store.dispatch('initdb', db)
        this.$store.dispatch('get')
        this.$router.push({name: 'home'})
      }
    })

    window.addEventListener('online', (e) => {
      console.log(e)
      console.log('dispatch sync all')
      this.$store.dispatch('sync')
    })
    window.addEventListener('offline', (e) => {
      console.log(e)
      console.log('offline')
    })
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
