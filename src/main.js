// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
import Vuex from 'vuex'
import { store } from './utils/stateVisuanaliser.js';

Vue.config.productionTip = false
Vue.use(Vuetify)


/* eslint-disable no-new */
export var vm = new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
