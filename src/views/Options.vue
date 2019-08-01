<template>
<div>
<h6 class="mt-3">Options:</h6>
 <b-container class="filter-row">
	<b-form-group >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        switches
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
  <div  class="d-flex justify-content-center mb-3 mt-1">
	<b-button size="sm" variant="primary" @click="navigateToNextPage">Continue</b-button>
  </div>
</b-container>
</div>
</template>

<script>
  export default {

    data() {
      return {
		selected: [], // Must be an array reference!
        options: [
          { text: 'Filter available data by study (BrAPI studies-search call)', value: 'study' },
          { text: 'Retrieve available maps (and marker positions) data (BrAPI maps call)', value: 'map'}
        ]
      }
	},
	
	methods: {
    navigateToNextPage(){

		//if there are no options selected
		if(this.selected.length<1){
			this.$router.push({ name: 'matrix'});
		}
		else if(this.selected.length===1){ // only one is selected
			if(this.selected[0]=="study"){
			
			this.$router.push({ name: 'study'});

			}
			else{
				this.$router.push({ name: 'map'});
			}
		
			this.$store.dispatch('ON_OPTIONS_CHANGED', this.selected)
			
		}else{ //both is selected
			this.$router.push({ name: 'study'});
            this.$store.dispatch('ON_OPTIONS_CHANGED', this.selected)
		}

    	}
	}
}

</script>