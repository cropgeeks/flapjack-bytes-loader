<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h6 class="mt-3">Study</h6>
 			 <div>
    			<b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
   				 <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>

				 <b-card v-if="selected" no-body class="text-center">
   				 <div class="bg-secondary text-light">
						{{ selected.name }}
   				 </div>
 				 </b-card>
  			</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import brapi from '@solgenomics/brapijs';

	export default {
		data: function () {
			return {
				selected: null,
				options: [],
				desc: null
      }
	},

	computed: {
		...mapGetters([
			'brapiServer'
		])
	},

	mounted: function () {
		var params = { studyType: "genotype"}
		var vm = this
		this.brapiServer.search_studies(params).each((study) => {
			vm.addOption(study)
		})
	},

	methods: {
		addOption: function(option) {
			var study = {
				name: option.name,
				startDate: option.startDate
			}
			this.options.push({text: study.name, value: study})
		}
	}
}
</script>