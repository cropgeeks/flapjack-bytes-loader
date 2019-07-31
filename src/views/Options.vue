<template>
 <b-container class="filter-row">
   <b-row class="text-left">
    <b-col></b-col>
    <b-col cols="5">
		
	<b-form-group label="Options:">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        switches
        stacked
      ></b-form-checkbox-group>
    </b-form-group>

	<b-button variant="outline-primary" @click="navigateToNextPage">Continue</b-button>
	</b-col>
    <b-col></b-col>
   </b-row>
</b-container>
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
			this.$router.push({ name: 'matrix', params: { selections: this.selected } });
		}
		else if(this.selected.length===1){ // only one is selected
			if(this.selected[0]=="study") this.$router.push({ name: 'study', params: { selections: this.selected } });
			else this.$router.push({ name: 'map', params: { selections: this.selected } });
		}else //both is selected
			this.$router.push({ name: 'study', params: { selections: this.selected } });
		}
    }
}
  
</script>