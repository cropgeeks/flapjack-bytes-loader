<template>
	<div>
		<h5 class="mt-3">Matrix Selection</h5>
		
		<h6 class="mt-3">Available matrices:</h6>
    	<b-form-select v-model="selectedMatrix" :options="options" :select-size="4" size="sm" class="mt-3"></b-form-select>
		<div>
		</div>
		<div v-if="selectedMatrix" >
          <b-row>
			<b-col md="2">
             <h6 class="mt-3">Details: </h6>
            </b-col>
          </b-row>	
		  <b-row>
			<b-col md="1">
            </b-col>
            <b-col md="10">
              <label >Matrix Id: </label>
			  {{selectedMatrix.id}}
            </b-col>
          </b-row>			
		  <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Study Id: </label>
				{{selectedMatrix.studyId}}
            </b-col>
          </b-row>	
		   <b-row>
			<b-col md="1">
            </b-col>
			<b-col md="10">
              <label >Last Updated: </label>
				{{selectedMatrix.lastUpdated}}
            </b-col>
          </b-row>	
   		</div>
		   <div  class="d-flex justify-content-center mb-3 mt-1">
			    <b-button  id="continueBtn"  v-if="selectedMatrix" size="sm" variant="primary" @click="navigateToNextPage"> Continue</b-button>
  		  </div>
	</div>
</template>


<script>
import { mapGetters } from 'vuex'
import brapi from '@solgenomics/brapijs';

	export default {
		data: function () {
			return {
				selectedMatrix: null,
				options: [],
				description: null,
				isSomethingSelected: false
      }
	},

	computed: {
		...mapGetters([
			'brapiServer',
			'selectedOptions',
			'selectedStudyId'
		])
	},

	mounted: function () {
		
		var vm = this

		if(this.selectedStudyId>0){

			var params = { studyDbId: this.selectedStudyId}
			this.brapiServer.allelematrices(params).each((matrix) => {
			// console.log(vm)
			// vm.options.push({ value: study.name, text: study.name})
			vm.addOption(matrix)
		})
		}else {
			this.brapiServer.allelematrices().each((matrix) => {
			// console.log(vm)
			// vm.options.push({ value: study.name, text: study.name})
			vm.addOption(matrix)
		})
		}
	},

	methods: {
		addOption: function(option) {
			var matrix = {
				name: option.name,
				id: option.matrixDbId,
				studyId: option.studyDbId,
				lastUpdated: option.lastUpdated

			}
			this.options.push({text: matrix.name, value: matrix})
			
		},
		
    	navigateToNextPage(){

			this.$router.push({ name: 'options'});
		
    	}

	}
  }
</script>