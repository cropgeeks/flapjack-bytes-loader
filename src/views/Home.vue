<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
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
                <h4>Login</h4>
                <b-form-row>
                    <b-form-input id="username" v-model="username" type="text" placeholder="Username"></b-form-input>
                </b-form-row>
                <b-form-row class="mt-3">
                    <b-form-input id="password" v-model="password" type="password" placeholder="Password"></b-form-input>
                </b-form-row>

                <b-form-row class="mt-3">
                  <b-button variant="primary" @click="loginClicked" class="ml-auto">Login</b-button>
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
      showDismissibleAlert: false
    };
  },

  mounted: function() {
    this.instance = axios.create({ baseURL: this.brapiBase });
    this.$store.dispatch("ON_BASE_URL_CHANGED", this.brapiBase);
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
              this.$router.push({ name: "matrix" });
            }
          }.bind(this)
        )
        .catch(() => {
          this.showAlert();
        });
    },

    showAlert() {
      this.showDismissibleAlert = true;
    }
  }
};
</script>

<style scoped>
</style>
