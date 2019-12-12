import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import homeModule from './modules/home'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export function createStore() {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    // strict: debug,
    // plugins,
    modules: {
      // home: homeModule
    }
  })
} 
