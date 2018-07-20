<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="elm in menu" :key="'m_'+elm.name" @click="goTo(elm.name)">
          <v-list-tile-action>
            <v-icon>{{elm.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{elm.label}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
const menu = [
  {name: 'home', icon: 'home', label: 'Home'},
  {name: 'about', icon: 'help_outline', label: 'A propos'},
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
      console.log(item, event)
    }
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
</style>
