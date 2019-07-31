<template>
  <div class=container>
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h6 class="mt-3">Study</h6>
 			 <div>
    			<b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
   				 <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>

				 <b-card no-body class="text-center">
   				 <div class="bg-secondary text-light">
						{{ desc }}
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
    data() {
      return {
        selected: null,
        options: [
          { value: 'a', text: 'This is option a' },
          { value: 'b', text: 'Default Selected Option b' },
          { value: 'c', text: 'This is option c' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'e', text: 'This is option f' }
		],
		desc: selected.text
      }
	},

	computed: {
		...mapGetters([
			'brapiServer'
		])
	},

	mounted() {
		var params = { studyType: "genotype"}
		console.log(this.brapiServer)
		this.brapiServer.search_studies(params, "fork", true).each((study) => {
			console.log(JSON.stringify(study))
			// options.push({ value: study.})
		})
	}
  }
</script>