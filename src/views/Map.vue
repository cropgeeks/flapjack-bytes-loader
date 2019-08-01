<template>
	<div>
		<h5 class="mt-3">Map Selection</h5>
		
		<h6 class="mt-3">Available maps:</h6>
    	<b-form-select v-model="selectedMap" :options="options" :select-size="4" size="sm" class="mt-3"></b-form-select>
		<div>
		</div>
		<div v-if="selectedMap" >
          <b-row>
			<b-col md="2">
             <h6 class="mt-3">Details: </h6>
            </b-col>
          </b-row>	
		  <b-row>
			<b-col md="1">
            </b-col>
            <b-col md="10">
              <label >Map Id: </label>
			  {{selectedMap.id}}
            </b-col>
          </b-row>			
		  <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Species: </label>
				{{selectedMap.species}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Type: </label>
				{{selectedMap.type}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Unit: </label>
				{{selectedMap.unit}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Publish date: </label>
				{{selectedMap.date}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Markers: </label>
				{{selectedMap.markers}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label label-size="sm" >Chromosomes: </label>
				 {{selectedMap.chromosomes}}
            </b-col>
          </b-row>	
		  
   		</div>
		   <div  class="d-flex justify-content-center mb-3 mt-1">
			    <b-button  id="continueBtn"  v-if="selectedMap" size="sm" variant="primary" @click="navigateToNextPage"> Continue</b-button>
  		  </div>
	</div>
</template>


<script>
import { mapGetters } from 'vuex'
import brapi from '@solgenomics/brapijs';

	export default {
		data: function () {
			return {
				selectedMap: null,
				options: [],
				description: null,
				isSomethingSelected: false
      }
	},

	computed: {
		...mapGetters([
			'brapiServer',
			'selectedOptions'
		])
	},

	mounted: function () {
		var params = { studyType: "genotype"}
		console.log(this.brapiServer)
		var vm = this
		this.brapiServer.maps().each((map) => {
			// console.log(vm)
			// vm.options.push({ value: study.name, text: study.name})
			vm.addOption(map)
			// console.log(vm.options)
		})
	},

	methods: {
		addOption: function(option) {
			var map = {
				name: option.name,
				id: option.mapDbId,
				species: option.species,
				type: option.type,
				unit: option.unit,
				date:option.publishedDate,
				markers: option.markerCount,
				chromosomes: option.linkageGroupCount

			}
			this.options.push({text: map.name, value: map})
		},
		
    	navigateToNextPage(){

			this.$store.dispatch('ON_MAP_CHANGED', this.options.id);
			//move on to matrix. It always comes after maps.
			this.$router.push({ name: 'matrix'});
		
    	}

	}
  }
</script>