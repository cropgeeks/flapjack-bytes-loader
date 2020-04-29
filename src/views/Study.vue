<template>
  <div>
    <h5 class="mt-3">Study Selection</h5>

    <h6 class="mt-3">Available studies:</h6>
    <b-form-select
      v-model="selectedStudy"
      :options="options"
      size="sm"
      class="mt-3"
    ></b-form-select>
    <div></div>

    <div v-if="selectedStudy">
      <b-card no-body class="mt-3">
        <b-card-header class="bg-info text-white">Details: {{selectedStudy.name}}</b-card-header>
        <b-card-body>
          <p>Id: {{selectedStudy.id}}</p>
          <p>Description: {{selectedStudy.description}}</p>
          <p>Code: {{selectedStudy.studyCode}}</p>
        </b-card-body>
      </b-card>
    </div>
    <b-form-row>
      <b-col>
        <b-form-group class="text-left">
          <b-button id="backButton" variant="secondary" class="mt-3" @click="back">Back</b-button>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group class="text-right">
          <div class="mt-1">
            <b-button variant="primary" class="mt-3" @click="navigateToNextPage" :disabled="selectedStudy === null">Select</b-button>
          </div>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data: function() {
    return {
      selectedStudy: null,
      options: [],
      description: null,
      isSomethingSelected: false
    };
  },

  computed: {
    ...mapGetters(["selectedOptions", "baseUrl", "authToken"])
  },

  mounted: function() {
    var vm = this;

    const client = axios.create({ baseURL: this.baseUrl })
    client.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken

    client.get("/studies", {}, 
    {
      headers: { "Content-Type": "application/json",
      Authorization: "Bearer " + this.authToken }
    }).then(response => {
      const resp = response.data
      resp.result.data.forEach(study => {
        vm.addOption(study)
      })
    })
  },

  methods: {
    addOption: function(option) {
      var study = {
        name: option.studyName,
        id: option.studyDbId,
        studyCode: option.studyCode,
        description: option.studyDescripton
      };
      this.options.push({ text: study.name, value: study });
    },

    navigateToNextPage() {
      this.$store.dispatch("ON_STUDY_CHANGED", this.selectedStudy.id);
      this.$router.push({ name: "matrix" });
    },

    back() {
      this.$store.dispatch("ON_AUTH_TOKEN_CHANGED", null);
      this.$router.push('/')
    },
  }
};
</script>