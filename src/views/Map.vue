<template>
	<div>
		<h5 class="mt-3">Map Selection</h5>
		
		<h6 class="mt-3">Available maps:</h6>
    	<b-form-select v-model="selectedMap" :options="options" :select-size="4" size="sm" class="mt-3"></b-form-select>
		<div>
		</div>
		<div v-if="selectedMap" >
			<b-card no-body class="mt-3">
              <b-card-header class="bg-secondary text-white">
                {{selectedMap.name}}
              </b-card-header>
              <b-card-body>
                <p>Map Id:  {{selectedMap.id}}</p>
                <p>Markers: {{selectedMap.markers}}</p>
                <p>Chromosomes: {{selectedMap.chromosomes}}</p>
              </b-card-body>
            </b-card>
		  
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
			'baseUrl',
			'authToken',
			'selectedOptions'
		])
	},

	mounted: function () {
		var vm = this
		var brapiJs = brapi(this.baseUrl, "1.2", this.authToken)
		brapiJs.maps().each((map) => {
			vm.addOption(map)
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

			this.$store.dispatch('ON_MAP_ID_CHANGED', this.selectedMap.id);
			//move on to matrix. It always comes after maps.
			this.$router.push({ name: 'matrix'});
		
    	}

	}
  }
</script>