<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="bytes-div">
          <h4>Flapajck Bytes Visualization</h4>
		  
            
			<div  class="d-flex justify-content-center mb-3 mt-1">
				
				<b-button  variant="primary" class="mt-3" @click="navigateToNextPage">Back</b-button>
  		  </div>
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

	
	methods: {
    	navigateToNextPage(){

			this.$router.push({ name: 'options'});
		
    	}

	}
}
</script>

<style scoped>
</style>
