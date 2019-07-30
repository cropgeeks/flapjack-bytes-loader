import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: null,
    calls: null,
    brapiServer: null
  },
  getters: {
    baseUrl: state => state.baseUrl,
    calls: state => state.calls,
    brapiServer: state => state.brapiServer
  },
  mutations: {
    ON_BASE_URL_CHANGED_MUTATION: function (state, newBaseUrl) {
      state.baseUrl = newBaseUrl
    },
    ON_CALLS_CHANGED_MUTATION: function (state, newCalls) {
      state.calls = newCalls
    },
    ON_BRAPI_SERVER_CHANGED_MUTATION: function (state, newBrapiServer) {
      state.brapiServer = newBrapiServer
    }
  },
  actions: {
    ON_BASE_URL_CHANGED: function ({ commit }, baseUrl) {
      commit('ON_BASE_URL_CHANGED_MUTATION', baseUrl)
    },
    ON_CALLS_CHANGED: function ({ commit }, calls) {
      commit('ON_CALLS_CHANGED_MUTATION', calls)
    },
    ON_BRAPI_SERVER_CHANGED: function ({ commit }, brapiServer) {
      commit('ON_BRAPI_SERVER_CHANGED_MUTATION', brapiServer)
    }
  }
})
