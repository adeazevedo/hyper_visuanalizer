<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-btn @click.stop="onClick_requestOptions" icon>
        <v-icon color="blue">info</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action>
      <v-btn slot="activator" @click.stop="clickedRemoveLayer" icon>
        <v-icon color="red">delete</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action>
      <v-switch @click.native="layerSwitchClicked" :label="layer.name"
      v-model="layer.activated" color="cyan" />
    </v-list-tile-action>

    <v-layout row justify-center>
      <v-dialog v-if="dialogOptions" v-model="dialogOptions" >
        <v-card>
          <v-card-text>
            <basic-hyper-options
            @closeDialog="closeDialog"
            :optionsLayer="optionsLayer"
            :hyperLayer="layer" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-list-tile>
</template>

<script>
import axios from 'axios';
import { GeoHyperLayerResource, OptionsLayer } from '../utils/LayerResource'
import BasicHyperOptions from './BasicHyperOptions'

export default {
  components: { BasicHyperOptions },
  props: ['layer'],
  data () {
    return {
      dialogOptions: false,
      optionsLayer: null
    }
  },
  methods: {
    facadeOL() {
      return this.$store.state.facadeOL
    },
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
    cancel() {
      this.optionsLayer = new OptionsLayer({}, '')
    },
    closeDialog (options) {
      this.dialogOptions = false
      this.optionsLayer = new OptionsLayer({}, '')
    },
    async onClick_requestOptions() {
      let clickedLayer = this.layer
      const response = await this.request(clickedLayer.iri, axios.options)
      this.dialogOptions = true
      this.optionsLayer = new OptionsLayer(response.data, clickedLayer.iri)
    },
    clickedRemoveLayer() {
      let aResourceLayer = this.layer
      this.facadeOL().map.removeLayer(aResourceLayer.layer)
      this.$store.commit('removeLayerResource', aResourceLayer)
    },
    layerSwitchClicked() {
      let aResourceLayer = this.layer
      if (aResourceLayer.activated)
        this.facadeOL().map.addLayer(aResourceLayer.layer)
      else {
        this.facadeOL().map.removeLayer(aResourceLayer.layer)
      }
    }
  }
}
</script>
