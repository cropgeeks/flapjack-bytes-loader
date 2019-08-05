<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
         
		<h5 class="mt-3">Matrix Selection</h5>
		
		<h6 class="mt-3">Available matrices:</h6>
          <div>
            <b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
            <b-card v-if="selected" no-body class="mt-3">
               <b-card-header class="bg-info text-white">
               Details:{{selected.name}}
              </b-card-header>
              <b-card-body>
                <p>Description: {{selected.description}}</p>
                <p>Last updated: {{selected.lastUpdated}}</p>
              </b-card-body>
            </b-card>
            
			<div  class="d-flex justify-content-center mb-3 mt-1">
				<b-button  variant="primary" class="mt-3" @click="viewMatrix">View</b-button>
				
  		  </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

	export default {
		data: function () {
			return {
				selected: null,
				options: [],
      }
	},

	computed: {
		...mapGetters([
			'baseUrl',
			'authToken',
			'selectedOptions',
			'selectedStudyId'
		])
	},

	mounted: function () {
		
		var vm = this
		if(this.selectedStudyId>0){

			var params = { studyDbId: this.selectedStudyId}
			
			this.getBrapiJs().allelematrices(params).each((matrix) => {
			vm.addOption(matrix)
		})
		}else {
			this.getBrapiJs().allelematrices().each((matrix) => {
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
		
		},
		
		addOption: function(option) {
			var study = {
        name: option.name,
        matrixName: option.matrixName,
				description: option.description,
        lastUpdated: option.lastUpdated,
				dbId: option.matrixDbId
			}
			this.options.push({text: study.name, value: study})
    },
    
    viewMatrix: function() {
      this.$store.dispatch('ON_MATRIX_ID_CHANGED', this.selected.dbId)
      this.$router.push({ name: 'bytes'})
    }
	}
}
</script>
