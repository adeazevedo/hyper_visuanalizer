import Vue from 'vue'

Vue.use(Vuex)
import Vuex from 'vuex'
import { FacadeOL } from './facade_openLayers.js'
export const store = new Vuex.Store({
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
