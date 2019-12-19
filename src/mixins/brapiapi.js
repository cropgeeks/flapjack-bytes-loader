import store from '../store.js'
import axios from 'axios'

var client = null

export default {
  methods: {
    initAxios: function(baseUrl, authToken) {
      client = axios.create({ baseURL: baseUrl })
      client.defaults.headers.common['Authorization'] = 'Bearer ' + authToken
    },
    getClient: function () {
      return client;
    }
  },
  mounted: function () {
    const baseUrl = store.getters.baseUrl
    const authToken = store.getters.authToken

    if (!client && baseUrl && authToken) {
      this.initAxios(baseUrl, authToken)
    }
  }
}