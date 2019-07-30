import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: null,
    calls: null
  },
  getters: {
    baseUrl: state => state.baseUrl,
    calls: state => state.calls
  },
  mutations: {
    ON_BASE_URL_CHANGED_MUTATION: function (state, newBaseUrl) {
      state.baseUrl = newBaseUrl
    },
    ON_SELECTED_CALLS_CHANGED_MUTATION: function (state, newCalls) {
      state.calls = newCalls
    }
  },
  actions: {
    ON_BASE_URL_CHANGED: function ({ commit }, baseUrl) {
      commit('ON_BASE_URL_CHANGED_MUTATION', baseUrl)
    },
    ON_CALLS_CHANGED: function ({ commit }, calls) {
      commit('ON_CALLS_CHANGED_MUTATION', calls)
    }
  }
})
