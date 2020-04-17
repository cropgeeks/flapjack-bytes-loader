<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <b-alert variant="danger" :show="!validServer">Please provide a valid BrAPI server resource</b-alert>
          <b-row>
            <b-col md="2"></b-col>
            <b-col md="8">
              <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
              >Invalid username or password.</b-alert>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
            </b-col>
            <b-col md="6">
              <b-form>
                <h4>BrAPI Resource</h4>
                <b-form-row>
                  <b-form-input id="resource" v-model="userResource" type="text" v-on:change="checkResource"></b-form-input>
                </b-form-row>
              </b-form>
              <b-form class="mt-3">
                <h4>Login</h4>
                <b-form-row>
                    <b-form-input id="username" v-model="username" type="text" placeholder="Username" :disabled="!validServer"></b-form-input>
                </b-form-row>
                <b-form-row class="mt-3">
                    <b-form-input id="password" v-model="password" type="password" placeholder="Password" :disabled="!validServer"></b-form-input>
                </b-form-row>

                <b-form-row class="mt-3">
                  <b-button variant="primary" @click="loginClicked" class="ml-auto" :disabled="!validServer">Login</b-button>
                </b-form-row>
              </b-form>
            </b-col>
            <b-col md="3">
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  props: [ 'brapiBase'],
  data() {
    return {
      username: "",
      password: "",
      instance: null,
      showDismissibleAlert: false,
      userResource: this.brapiBase,
      validServer: false
    };
  },

  mounted: function() {
    this.instance = axios.create({ baseURL: this.brapiBase });
    this.$store.dispatch("ON_BASE_URL_CHANGED", this.brapiBase);
    this.instance.get('/serverinfo')
      .then(function(response) {
        if (response.status === 200) {
          this.validServer = true;
        } else {
          this.validServer = false;
        }
      }.bind(this)).catch(() => {
        this.validServer = false;
      });
  },

  methods: {
    loginClicked: function() {
      var data = {
        username: this.username,
        password: this.password,
        grant_type: "password",
        client_id: "flapjack-bytes"
      };

      this.instance
        .post("/token", data, {
          headers: { "Content-Type": "application/json" }
        })
        .then(
          function(response) {
            this.$store.dispatch(
              "ON_AUTH_TOKEN_CHANGED",
              response.data.access_token
            );

            if (response.data.access_token) {
              this.$router.push({ name: "study" });
            }
          }.bind(this)
        )
        .catch(() => {
          this.showAlert();
        });
    },

    showAlert() {
      this.showDismissibleAlert = true;
    },

    checkResource() {
      const temp = axios.create({ baseURL: this.userResource });
      
      temp.get('/serverinfo', {}, { headers: { "Content-Type": "application/json" }})
        .then(function(response) {
          if (response.status === 200) {
            this.$store.dispatch("ON_BASE_URL_CHANGED", this.userResource);
            this.instance = axios.create({ baseURL: this.userResource });
            this.validServer = true;
          } else {
            this.validServer = false;
          }
        }.bind(this))
        .catch(() => {
          this.validServer = false;
        })
    }
  }
};
</script>

<style scoped>
</style>
