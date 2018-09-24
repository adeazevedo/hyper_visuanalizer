// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
import Vuex from 'vuex'
import { FacadeOL } from './utils/facade_openLayers.js';

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    facadeOL: null
  },
  mutations: {
    default_facadeOL(state, id_map='map', coordinates_center=[-4331024.58685793, -1976355.8033415168], a_zoom_value = 4, a_baseLayer_name='OSM') {
      //FacadeOL default values => id_map='map', coordinates_center=[-4331024.58685793, -1976355.8033415168], a_zoom_value = 4, a_baseLayer_name='OSM'
      state.facadeOL = new FacadeOL(id_map, coordinates_center, a_zoom_value, a_baseLayer_name)
    }
  }
})

export var vm = new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
