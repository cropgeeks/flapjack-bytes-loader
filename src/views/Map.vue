<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="home-content">
          <h5 class="mt-3">Map Selection</h5>

          <h6 class="mt-3">Available maps:</h6>
          <b-form-select v-model="selectedMap" :options="options" size="sm"></b-form-select>
          <div></div>

          <div v-if="selectedMap">
            <b-card no-body class="mt-3">
              <b-card-header class="bg-info text-white">Details: {{selectedMap.mapName}}</b-card-header>
              <b-card-body>
                <p>Map Id: {{selectedMap.mapDbId}}</p>
                <p>Type: {{selectedMap.type}}</p>
                <p>Unit: {{selectedMap.unit}}</p>
                <p>Markers: {{selectedMap.markerCount}}</p>
                <p>Chromosomes: {{selectedMap.linkageGroupCount}}</p>
              </b-card-body>
            </b-card>
          </div>
          <b-form-group class="text-right">
            <b-button id="skipBtn" variant="secondary" class="mt-3 mr-3" @click="navigateToNextPage">Skip</b-button>
            <b-button
              id="continueBtn"
              :disabled="selectedMap === null"
              variant="primary"
              class="mt-3"
              @click="selectAndNavigateToNextPage"
            >Select</b-button>
          </b-form-group>
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
      selectedMap: null,
      options: [],
      description: null
    };
  },

  computed: {
    ...mapGetters([
      "baseUrl",
      "authToken",
      "selectedOptions",
      "selectedStudyId"
    ])
  },

  mounted: function() {
    var vm = this;

    const client = axios.create({ baseURL: this.baseUrl })
    client.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken

    client.get(`/maps?studyDbId${this.selectedStudyId}`, {}, 
    {
      headers: { "Content-Type": "application/json",
      Authorization: "Bearer " + this.authToken }
    }).then(response => {
      const resp = response.data
      resp.result.data.forEach(map => {
        vm.addOption(map)
      })
    })
  },

  methods: {
    addOption: function(option) {
      this.options.push({ text: option.mapName, value: option });
    },

     navigateToNextPage() {
      this.$router.push({ name: "bytes" });
    },

    selectAndNavigateToNextPage() {
      this.$store.dispatch("ON_MAP_ID_CHANGED", this.selectedMap.mapDbId);
      this.navigateToNextPage();
    }
  }
};
</script>