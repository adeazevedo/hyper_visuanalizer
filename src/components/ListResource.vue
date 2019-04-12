<template>
<div>
  <v-list class="pa-0 ma-0">
    <v-list-group v-model="active">
      <v-list-tile slot="activator">
          <v-list-tile-avatar>
            <v-icon color=orange>{{icon_name}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-for="(layer, index) in items" :key="index" >

          <v-list-tile-action>
            <v-btn @click.stop="onClick_requestOptions(layer)" icon>
              <v-icon color="blue">info</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn slot="activator" @click.stop="clickedRemoveLayer(layer)" icon>
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-switch @click.native="layerSwitchClicked(layer)" :label="layer.name" v-model="layer.activated"  color="cyan"/></v-switch>
          </v-list-tile-action>

        </v-list-tile>
    </v-list-group>
  </v-list>
  <v-layout row justify-center>
    <v-dialog v-if="dialogOptions" v-model="dialogOptions" >
      <v-card>
        <v-card-text>
          <basic-hyper-options
          @closeDialog="closeDialog"
          :optionsLayer="optionsLayer" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>
<script>
import axios from 'axios';
import BasicHyperOptions from './BasicHyperOptions'
import { GeoHyperLayerResource, OptionsLayer } from '../utils/LayerResource'

export default {
  components: { BasicHyperOptions },
  props: {
    icon_name: {type: String, required: false},
    title: {type: String, required: false},
  },
  data() {
   return {
     active: true,
     dialogOptions: false,
     optionsLayer: new OptionsLayer({}, '')
   }
  },
  methods: {
    async request (url, http_method=axios.get) {
      let iri = null
      try {
        const response = await http_method(url)
        return response

      } catch (e) {
        this.errors.push(e)
        console.log("Houve algum erro durante a requisição. " + this.errors);
      }
    },
    async onClick_requestOptions(clickedLayer) {
      console.log(clickedLayer);
      const response = await this.request(clickedLayer.iri, axios.options)
      this.dialogOptions = true
      this.optionsLayer = new OptionsLayer(response.data, clickedLayer.iri)
    },
    clickedRemoveLayer(aResourceLayer) {
      this.facadeOL().map.removeLayer(aResourceLayer.layer)
      this.$store.commit('removeLayerResource', aResourceLayer)
    },
    cancel() {
      this.optionsLayer = new OptionsLayer({}, '')
    },
    closeDialog (options) {
      this.dialogOptions = false
      this.optionsLayer = new OptionsLayer({}, '')
    },
    facadeOL() {
      return this.$store.state.facadeOL
    },
    layerSwitchClicked(aResourceLayer) {
      if (aResourceLayer.activated)
        this.facadeOL().map.addLayer(aResourceLayer.layer)
      else {
        this.facadeOL().map.removeLayer(aResourceLayer.layer)
      }
    }
  },
  computed: {
    items () {
      return this.$store.state.layersResource
    }
  }
}
</script>

<style scoped>
.nospace {
   margin: 0px;
   padding: 0px;
}
.firsplane {
  position: absolute;
  z-index: 20000;
}
</style>
