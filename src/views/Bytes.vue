<template>
  <div>
    <div class="map-spinner d-flex justify-content-center h-100 align-items-center" v-if="showSpinner">
      <b-spinner label="Loading..." variant="primary"></b-spinner>
    </div>
    <div class="d-flex justify-content-center h-100 align-items-cente" v-if="showSpinner">
      <p>{{ message }}</p>
    </div>
    <div id="bytes-div" ref="bytes">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrAPI from '@solgenomics/brapijs'

export default {
  name: 'home',
  data() {
    return {
      showSpinner: true,
      message: "Loading..."
    }
  },

  computed: {
    ...mapGetters([
      'brapiServer',
      'matrixId',
      'mapId',
      'baseUrl',
      'authToken'
		])
  },
  
  mounted: function() {
      var vm = this
      this.$refs.bytes.addEventListener('LoadingMap', function (e) {
        vm.message = "Loading map data..."
      }, false);
      this.$refs.bytes.addEventListener('PollingMatrix', function (e) {
        vm.message = "Loading matrix data..."
      }, false);
      this.$refs.bytes.addEventListener('FlapjackFinished', function (e) {
        vm.showSpinner = false
      }, false);

    var renderer = GenotypeRenderer();
    renderer.renderGenotypesBrapi("#bytes-div", 800, 600, this.baseUrl, this.matrixId, this.mapId, this.authToken);
  }
}
</script>

<style scoped>
</style>
