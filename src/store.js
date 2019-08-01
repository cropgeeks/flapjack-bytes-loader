import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: null,
    calls: null,
	brapiServer: null,
	selectedOptions: null,
	selectedStudyId: null,
	selectedMapId: null,
	selectedMatrixId: null
  },
  getters: {
    baseUrl: state => state.baseUrl,
    calls: state => state.calls,
	brapiServer: state => state.brapiServer,
	selectedOptions: state => state.selectedOptions,
	selectedStudyId: state => state.selectedStudyId,
	selectedMapId: state => state.selectedMapId,
	selectedMatrixId: state => state.selectedMatrixId
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
	ON_OPTIONS_CHANGED_MUTATION: function(state, newSelectedOptions){
		state.selectedOptions = newSelectedOptions
	},
	ON_STUDY_CHANGED_MUTATION: function(state, newSelectedStudyId){
		state.selectedStudyId = newSelectedStudyId
	},
	ON_MAP_CHANGED_MUTATION: function(state, newselectedMapId){
		state.selectedMapId = newselectedMapId
	},
	ON_MATRIX_CHANGED_MUTATION: function(state, newselectedMatrixId){
		state.selectedMatrixId = newselectedMatrixId
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
	ON_OPTIONS_CHANGED: function({ commit }, selectedOptions){
      commit('ON_OPTIONS_CHANGED_MUTATION', selectedOptions)
	},
	ON_STUDY_CHANGED: function({ commit }, selectedStudyId){
      commit('ON_STUDY_CHANGED_MUTATION', selectedStudyId)
	},
	ON_MAP_CHANGED: function({ commit }, selectedMapId){
      commit('ON_MAP_CHANGED_MUTATION', selectedMapId)
	},
	ON_MATRIX_CHANGED: function({ commit }, selectedMatrixId){
      commit('ON_MATRIX_CHANGED_MUTATION', selectedMatrixId)
	}
	
  }
})
