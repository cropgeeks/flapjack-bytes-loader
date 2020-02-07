<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h5 class="mt-3">Dataset Selection</h5>

          <h6 class="mt-3">Available datasets:</h6>
          <div>
            <b-form-select v-model="selected" :options="options"></b-form-select>
            <b-card v-if="selected" no-body class="mt-3">
              <b-card-header class="bg-info text-white">Details: {{selected.variantSetName}}</b-card-header>
              <b-card-body>
                <p>Study name: {{selected.studyName}}</p>
                <p>Samples: {{selected.callSetCount}}</p>
                <p>Markers: {{selected.variantCount}}</p>
              </b-card-body>
            </b-card>

            <b-form-group class="text-right">
              <div class="mt-1">
                <b-button variant="primary" class="mt-3" @click="navigateToNextPage" :disabled="selected === null">Select</b-button>
              </div>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data: function() {
    return {
      selected: null,
      options: []
    };
  },

  computed: {
    ...mapGetters([
      "baseUrl",
      "authToken",
      "selectedOptions",
      "selectedStudyId"
    ]),
  },

  mounted: function() {
    var vm = this;

    const client = axios.create({ baseURL: this.baseUrl })
    client.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken

    client.get("/variantsets", {},
    {
      headers: { "Content-Type": "application/json",
      Authorization: "Bearer " + this.authToken }
    }).then(response => {
      const resp = response.data
      resp.result.data.forEach(matrix => {
        vm.addOption(matrix)
      })
    })

    console.log(this.selected);
  },

  methods: {
    navigateToNextPage() {
      this.$store.dispatch("ON_MATRIX_ID_CHANGED", this.selected.variantSetDbId);
      this.$router.push({ name: "map" });
    },

    addOption: function(option) {
      this.options.push({ text: option.variantSetName, value: option });
    },

    // viewMatrix: function() {
    //   this.$store.dispatch("ON_MATRIX_ID_CHANGED", this.selected.variantSetDbId);
    //   this.$router.push({ name: "map" });
    // }
  }
};
</script>