import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: null,
    calls: null,
    brapiServer: null,
    mapId: null,
    matrixId: null
  },
  getters: {
    baseUrl: state => state.baseUrl,
    calls: state => state.calls,
    brapiServer: state => state.brapiServer,
    mapId: state => state.mapId,
    matrixId: state => state.matrixId
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
    },
    ON_MAP_ID_CHANGED_MUTATION: function (state, newMapId) {
      state.mapId = newMapId
    },
    ON_MATRIX_ID_CHANGED_MUTATION: function (state, newMatrixId) {
      state.matrixId = newMatrixId
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
    },
    ON_MAP_ID_CHANGED: function ({ commit }, mapId) {
      commit('ON_BRAPI_SERVER_CHANGED_MUTATION', mapId)
    },
    ON_MATRIX_ID_CHANGED: function ({ commit }, matrixId) {
      commit('ON_BRAPI_SERVER_CHANGED_MUTATION', matrixId)
    }
  }
})
