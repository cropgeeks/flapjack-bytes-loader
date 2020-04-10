<template>
  <div>
    <div
      class="map-spinner d-flex justify-content-center h-100 align-items-center"
      v-if="showSpinner"
    >
      <b-spinner label="Loading..." variant="primary"></b-spinner>
    </div>
    <div class="d-flex justify-content-center h-100 align-items-cente" v-if="showSpinner">
      <p>{{ message }}</p>
    </div>
    <b-row>
      <b-col md="2"></b-col>
      <b-col md="8">
        <b-alert
          variant="danger"
          dismissible
          fade
          :show="showDismissibleAlert"
          @dismissed="showDismissibleAlert=false"
        >No calls appear to be available for this VariantSet</b-alert>
      </b-col>
    </b-row>
    <div id="bytes-div" ref="bytes"></div>
    <b-row>
      <b-col md="2"></b-col>
      <b-col md="8">
        <b-button variant="secondary" class="mt-3" @click="backToMatrix">Back to VariantSet selection</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      showSpinner: true,
      message: "Loading...",
      showDismissibleAlert: false
    };
  },

  computed: {
    ...mapGetters(["matrixId", "mapId", "baseUrl", "authToken"])
  },

  mounted: function() {
    var vm = this;
    this.$refs.bytes.addEventListener(
      "LoadingMap",
      function(e) {
        vm.message = "Loading map data...";
      },
      false
    );
    this.$refs.bytes.addEventListener(
      "PollingMatrix",
      function(e) {
        vm.message = "Loading matrix data...";
      },
      false
    );
    this.$refs.bytes.addEventListener(
      "FlapjackFinished",
      function(e) {
        vm.showSpinner = false;
      },
      false
    );
    this.$refs.bytes.addEventListener(
      "FlapjackError",
      function(e) {
        vm.showSpinner = false;
        vm.showAlert();
        var elem = document.querySelector('#zoom-holder');
        elem.parentNode.removeChild(elem);
      }
    )

    var renderer = GenotypeRenderer();
    renderer.renderGenotypesBrapi(
      "#bytes-div",
      800,
      600,
      this.baseUrl,
      this.matrixId,
      this.mapId,
      this.authToken
    );
  },

  methods: {
    showAlert() {
      this.showDismissibleAlert = true;
    },
    
    backToMatrix: function() {
      this.$store.dispatch("ON_MATRIX_ID_CHANGED", null);
      this.$store.dispatch("ON_MAP_ID_CHANGED", null);
      this.$router.push({ name: "matrix" });
    }
  }
};
</script>

<style scoped>
</style>
