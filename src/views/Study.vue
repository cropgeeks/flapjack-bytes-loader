<template>
	<div>
		<h5 class="mt-3">Study Selection</h5>
		
		<h6 class="mt-3">Available studies:</h6>
    	<b-form-select v-model="selectedStudy" :options="options" :select-size="4" size="sm" class="mt-3"></b-form-select>
		<div>
		</div>
		
		<div v-if="selectedStudy">
			 <b-card no-body class="mt-3">
              <b-card-header class="bg-info text-white">
               Details: {{selectedStudy.name}}
              </b-card-header>
              <b-card-body>
                <p>Study Id:  {{selectedStudy.id}}</p>
                <p>Start Date: {{selectedStudy.startDate}}</p>
              </b-card-body>
            </b-card>
          
   		</div>
		   <div  class="d-flex justify-content-center mb-3 mt-1">
			    <b-button  id="continueBtn"  v-if="selectedStudy" size="sm" variant="primary" @click="navigateToNextPage"> Continue</b-button>
  		  </div>
	</div>
</template>


<script>
import { mapGetters } from 'vuex'

	export default {
		data: function () {
			return {
				selectedStudy: null,
				options: [],
				description: null,
				isSomethingSelected: false
      }
	},

	computed: {
		...mapGetters([
			'selectedOptions',
			'baseUrl',
			'authToken'
		])
	},

	mounted: function () {
		var params = { studyType: "genotype"}
		var vm = this
		this.getBrapiJs().search_studies(params).each((study) => {
			vm.addOption(study)
		})
	},

	methods: {
		addOption: function(option) {
			var study = {
				name: option.name,
				id: option.studyDbId,
				startDate: option.startDate,
				endDate: option.endDate,
				programName: option.programName
			}
			this.options.push({text: study.name, value: study})
			
		},
		
    	navigateToNextPage(){

			this.$store.dispatch('ON_STUDY_CHANGED', this.selectedStudy.id);
			this.$router.push({ name: 'matrix'});
		//if there are no options selected
		if(this.selectedOptions.length>1){
			
			// if options selected are >2 then move on to map since this is the study page.
				this.$router.push({ name: 'map'});
		}
		else{ // only one is selected
			
			// otherwise go to matrix
				this.$router.push({ name: 'matrix'});
		
		}

    	}



	}
}
</script>