<template>
  <div>
    <h5 class="mt-3">Map Selection</h5>

    <h6 class="mt-3">Available maps:</h6>
    <b-form-select v-model="selectedMap" :options="options"></b-form-select>
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
    <div class="d-flex justify-content-center mb-3 mt-1">
      <b-button
        id="continueBtn"
        v-if="selectedMap"
        size="sm"
        variant="primary"
        @click="navigateToNextPage"
      >Select</b-button>
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
      description: null,
      isSomethingSelected: false
    };
  },

  computed: {
    ...mapGetters(["baseUrl", "authToken", "selectedOptions"])
  },

  mounted: function() {
    var vm = this;

    const client = axios.create({ baseURL: this.baseUrl })
    client.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken

    client.get("/maps", {}, 
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
      this.$store.dispatch("ON_MAP_ID_CHANGED", this.selectedMap.mapDbId);
      //move on to matrix. It always comes after maps.
      this.$router.push({ name: "bytes" });
    }
  }
};
</script>