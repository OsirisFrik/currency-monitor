import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
