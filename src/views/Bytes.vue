<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="bytes-div">
          <h4>Flapajck Bytes Visualization</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import brapi from '@solgenomics/brapijs'

export default {
  name: 'home',
  data() {
    return {
    }
  },

	computed: {
		...mapGetters([
			'brapiServer'
		])
	},
}
</script>

<style scoped>
</style>
