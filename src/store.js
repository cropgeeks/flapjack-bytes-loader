import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: null,
    authToken: null,
    calls: null,
    mapId: null,
    matrixId: null,
    selectedOptions: null,
    selectedStudyId: null,
  },
  getters: {
    baseUrl: state => state.baseUrl,
    authToken: state => state.authToken,
    calls: state => state.calls,
    mapId: state => state.mapId,
    matrixId: state => state.matrixId,
    selectedOptions: state => state.selectedOptions,
    selectedStudyId: state => state.selectedStudyId,
  },
  mutations: {
    ON_BASE_URL_CHANGED_MUTATION: function (state, newBaseUrl) {
      state.baseUrl = newBaseUrl
    },
    ON_AUTH_TOKEN_CHANGED_MUTATION: function (state, newAuthToken) {
      state.authToken = newAuthToken
    },
    ON_CALLS_CHANGED_MUTATION: function (state, newCalls) {
      state.calls = newCalls
    },
    ON_MAP_ID_CHANGED_MUTATION: function (state, newMapId) {
      state.mapId = newMapId
    },
    ON_MATRIX_ID_CHANGED_MUTATION: function (state, newMatrixId) {
      state.matrixId = newMatrixId
    },
    ON_OPTIONS_CHANGED_MUTATION: function(state, newSelectedOptions){
      state.selectedOptions = newSelectedOptions
    },
    ON_STUDY_CHANGED_MUTATION: function(state, newSelectedStudyId){
      state.selectedStudyId = newSelectedStudyId
    }
  },
  actions: {
    ON_BASE_URL_CHANGED: function ({ commit }, baseUrl) {
      commit('ON_BASE_URL_CHANGED_MUTATION', baseUrl)
    },
    ON_AUTH_TOKEN_CHANGED: function ({ commit }, authToken) {
      commit('ON_AUTH_TOKEN_CHANGED_MUTATION', authToken)
    },
    ON_CALLS_CHANGED: function ({ commit }, calls) {
      commit('ON_CALLS_CHANGED_MUTATION', calls)
    },
    ON_MAP_ID_CHANGED: function ({ commit }, mapId) {
      commit('ON_MAP_ID_CHANGED_MUTATION', mapId)
    },
    ON_MATRIX_ID_CHANGED: function ({ commit }, matrixId) {
      commit('ON_MATRIX_ID_CHANGED_MUTATION', matrixId)
    },
    ON_OPTIONS_CHANGED: function({ commit }, selectedOptions){
        commit('ON_OPTIONS_CHANGED_MUTATION', selectedOptions)
    },
    ON_STUDY_CHANGED: function({ commit }, selectedStudyId){
        commit('ON_STUDY_CHANGED_MUTATION', selectedStudyId)
    }
  },

  plugins: [
    createPersistedState()
  ]
})

export default store