import store from '../store.js'
import brapi from '@solgenomics/brapijs';

var brapiJs = null

export default {
  methods: {
    initBrapiJs: function (baseUrl, authToken) {
      brapiJs = brapi(baseUrl, "1.2", authToken)
    },
    getBrapiJs: function () {
      return brapiJs
    }
  },
  mounted: function () {
    const baseUrl = store.getters.baseUrl
    const authToken = store.getters.authToken

    if (!brapiJs && baseUrl && authToken) {
      this.initBrapiJs(baseUrl, authToken)
    }
  }
}