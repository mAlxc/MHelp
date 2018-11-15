<template>
  <v-layout fill-height align-center justify-center>
    <v-flex >
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="person" v-model="email" name="login" label="E-mail" type="mail"></v-text-field>
            <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="signIn" color="primary">Login</v-btn>
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
          user => {
            this.$router.replace('home')
          },
          error => {
            alert(error.message)
          }
        )
    }
  }
}
</script>
