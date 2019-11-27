import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
  loading: false,
  error: false
};

const mutations = {
  loading: (state, payload) => {
    state.loading = payload
  },
  error: (state, payload) => {
    state.error = payload
  }
};

export default new Vuex.Store({
  modules: {
    auth: authModule
  },
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  plugins: [createPersistedState({
    key: 'stm'
  })]
})
