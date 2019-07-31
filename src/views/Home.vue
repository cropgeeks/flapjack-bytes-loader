<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h3 class="mt-3">Flapjack Bytes Loader</h3>
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
import brapi from '@solgenomics/brapijs'

export default {
  name: 'home',
  data() {
    return {
      username: '',
      password: '',
      instance: null
    }
  },

  mounted: function() {

    this.instance = axios.create({baseURL: 'https://ics.hutton.ac.uk/germinate-demo/cactuar-dev/brapi/v1'});

    // Change to the below baseurl when the gobii instance is ready
    // http://hackathon.gobii.org:8081/gobii-dev/brapi/v1

    this.instance
      .get("/calls", {}, {})
      .then(
        function(response) {
          this.$store.dispatch('ON_CALLS_CHANGED', response.data.result.data)
        }.bind(this)
      )
      .catch(error => {
        console.log(error)
        this.errorMsg = "No /calls found"
      })
  },

  methods: {
    loginClicked: function() {
      var data = { username: this.username, password: this.password, grant_type: "password", client_id: "flapjack-bytes"};

      this.instance
        .post("/token", data, {headers: {"Content-Type": "application/json"}})
        .then(function(response) {
          console.log(response.data.access_token)

          var brapiJs = brapi("https://ics.hutton.ac.uk/germinate-demo/cactuar-dev/brapi/v1", "1.2", response.data.access_token)

          if (response.data.access_token) {
            this.$store.dispatch('ON_BRAPI_SERVER_CHANGED', brapiJs)
            this.$router.push({ name: 'options'})
          }
        }.bind(this)
        ).catch(error => {
          console.log(error)
          this.errorMsg = "Unable to retrieve a list of folders.";
        })
    }
  }
}
</script>

<style scoped>
</style>
