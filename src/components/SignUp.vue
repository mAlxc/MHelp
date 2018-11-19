<template>
  <v-layout fill-height align-center justify-center column>
    <v-flex>
      Sign Up on M'Help
    </v-flex>
    <v-flex>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="mdi-at" v-model="email" name="login" label="E-mail" type="mail"></v-text-field>
            <v-text-field prepend-icon="mdi-account-arrow-left-outline" v-model="name" name="login" label="Name" type="text"></v-text-field>
            <v-text-field prepend-icon="mdi-account-arrow-left-outline" v-model="firstName" name="login" label="FirstName" type="text"></v-text-field>
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="birthday" lazy full-width width="290px">
              <v-text-field slot="activator" v-model="birthday" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="birthday" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(birthday)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-text-field v-model="password" prepend-icon="lock" name="new-password" label="Password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="signUp" color="primary">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex v-if="errorMessage!== ''">
      <p>{{errorMessage}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import Firebase from 'firebase'

export default {
  data: function () {
    return {
      email: '',
      name: '',
      firstName: '',
      password: '',
      birthday: null,
      modal: false,
      errorMessage: ''
    }
  },
  methods: {
    signUp: function () {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$store.dispatch('user/aSignUp', {name: this.name,
              firstName: this.firstName,
              birthday: this.birthday })
            this.$router.replace('home')
          },
          error => {
            switch (error.code) {
              case 'auth/weak-password':
                this.errorMessage = 'Le mot de passe est trop faible'
                break
              case 'auth/operation-not-allowed':
                this.errorMessage = 'Imposible de crée cet utilisateur'
                break
              case 'auth/invalid-email':
                this.errorMessage = 'Adresse email incorrect'
                break
              case 'auth/email-already-in-use':
                this.errorMessage = 'Email deja utiliser pour un autre compte'
                break
              default:
                this.errorMessage = 'Une erreur inconnue c\'est produite'
                break
            }
          }
        )
    }
  }
}
</script>
