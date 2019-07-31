<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h6 class="mt-3">Matrix</h6>
          <div>
            <b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
            <b-card v-if="selected" no-body class="mt-3">
              <b-card-header class="bg-secondary text-white">
                {{selected.name}}
              </b-card-header>
              <b-card-body>
                <p>Description: {{selected.description}}</p>
                <p>Last updated: {{selected.lastUpdated}}</p>
              </b-card-body>
            </b-card>
            <b-button v-if="selected" variant="primary" class="mt-3" @click="viewMatrix">View</b-button>
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
      }
	},

	computed: {
		...mapGetters([
			'brapiServer'
		])
	},

	mounted: function () {
		var params = {}
		var vm = this
		this.brapiServer.allelematrices(params).each((matrix) => {
			vm.addOption(matrix)
		})
	},

	methods: {
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