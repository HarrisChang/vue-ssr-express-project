import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import request from './http/http'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp () {

  const router = createRouter()
  const store = createStore()

  Vue.prototype.$http = request;


  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
