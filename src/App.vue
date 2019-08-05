<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" md="2">
      <b-navbar-brand href="#">Flapjack Bytes</b-navbar-brand>
    </b-navbar>
    <div style="margin: 20px;">
      <b-container class="bv-example-row" mt="2">
        <b-row>
          <b-col></b-col>
          <b-col cols="8"></b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <div id="app">
              <transition-page>
                <router-view :key="$route.path" />
              </transition-page>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import TransitionPage from "./transitions/TransitionPage.vue";

export default {
  name: "app",
  components: {
    TransitionPage
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.6;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

p {
  &:not(:first-child) {
    margin-top: 1.25em;
  }
}

.App {
  max-width: 42em;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1em;
  padding-left: 1em;

  &__nav {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #c0c0c0;
  }

  &__main {
    padding-top: 1.5em;
    padding-bottom: 2em;
  }

  &__footer {
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid #c0c0c0;
  }
}
</style>
