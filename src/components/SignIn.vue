<template>
  <v-layout fill-height fluid column>
    <v-flex>
      <h1>M'Help</h1>
      <p>connexion a votre espace de revision personnel</p>
    </v-flex>
    <v-flex>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form lazy-validation>
            <v-text-field prepend-icon="person" v-model="email" autocomplete="username" name="username" label="E-mail" type="mail"></v-text-field>
            <v-text-field v-model="password" prepend-icon="lock" name="current-password" label="Password" type="password" autocomplete="current-password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="signIn" color="primary">Login</v-btn>
          <v-btn small @click="signUp" color="primary">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Firebase from 'firebase'
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          infoCo => {
            console.log(infoCo)
          },
          error => {
            alert(error.message)
          }
        )
    },
    signUp: function () {
      this.$router.push({name: 'signUp'})
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  }
}
</script>
