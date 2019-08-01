<template>
  <div id="bytes-div">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrAPI from '@solgenomics/brapijs'

export default {
  name: 'home',
  data() {
    return {
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
    var renderer = GenotypeRenderer();
    renderer.renderGenotypesBrapi("#bytes-div", 800, 600, this.baseUrl, this.matrixId, this.mapId, this.authToken);
  }
}
</script>

<style scoped>
</style>
