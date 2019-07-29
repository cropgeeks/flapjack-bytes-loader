<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h1 class="mt-3">Flapjack Bytes Loader</h1>
          <b-row>
            <b-col md="2">
              <label for="username">Username:</label>
            </b-col>
            <b-col md="10">
              <b-form-input id="username" v-model="username" type="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="2">
              <label for="password">Password:</label>
            </b-col>
            <b-col md="10">
              <b-form-input id="password" v-model="password" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-button variant="primary" @click="loginClicked">Login</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    loginClicked: function() {
      var url = 'http://hackathon.gobii.org:8081/gobii-dev/brapi/v1/token';
      var data = { username: this.username, password: this.password, grant_type: "password", client_id: "flapjack-bytes"};

      // Using fetch to get an access token so we can use brapi.js to talk to the brapi resource from here on out
      fetch(url, {
        method: 'POST',
        mode: "no-cors",
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(
        function(response) {
          console.log('Success:', JSON.stringify(response))
      }.bind(this))
      .catch(error => console.error('Error:', error))
    }
  }
}
</script>

<style scoped>
</style>
