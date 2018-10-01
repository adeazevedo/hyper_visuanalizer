<template>
  <v-app dark id="map">
  </v-app>
</template>

<script>
  export default {
    name: 'hv-baseview',
    data () {
      return {
        map: null,
        view: null,
        layers: []
      }
    },
    methods: {
    },
    mounted() {
      // FacadeOL default values => id_map='map', coordinates_center=[-4331024.58685793, -1976355.8033415168], a_zoom_value = 4, a_baseLayer_name='OSM'
      this.$store.commit('default_facadeOL')
      //this.$store.state.facadeOL= this.$store.state.;
    }
  }
</script>

<style>
  #map {
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
  #popup {
    color: #000;
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 5px;
    padding-top: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
    max-height: 350px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #popup::-webkit-scrollbar {
    background: #90CAF9;
    width: 13px;
    border-radius: 7px;
  }
  #popup::-webkit-scrollbar-thumb {
    background: #1565C0;
    border-radius: 5px;
  }
  #popup-close {
    position: absolute;
    color: #F44;
    content: 'X';
    height: 20px;
    width: 20px;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }
</style>
