<template>
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
            <v-btn slot="activator" @click.stop="clickedOnInfoLayer(layer)" icon><v-icon color="blue">info</v-icon></v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn slot="activator" @click.stop="clickedRemoveLayer(layer)" icon><v-icon color="red">delete</v-icon></v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-switch  @click.native="layerSwitchClicked(layer)" :label="layer.name" v-model="layer.activated"  color="cyan"/></v-switch>
          </v-list-tile-action>
        </v-list-tile>
    </v-list-group>
  </v-list>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    name: {type: String, required: false},
    icon_name: {type: String, required: false},
    title: {type: String, required: false},
    hint:{type: String, required: false}

  },
  data() {
   return {
     items: [],
     active: true,
     url: '',
   }
  },
  methods: {
    clickedOnInfoLayer(a_layer) {
      console.log(a_layer);
    },
    clickedRemoveLayer(aResourceLayer) {
      if (aResourceLayer.activated)
        this.facadeOL().map.removeLayer(aResourceLayer.layer)
      this.$store.commit('removeLayerResource', aResourceLayer)
    },
    cancel() {
      this.item = ''
      this.url = ''
    },
    facadeOL() {
        return this.$store.state.facadeOL
    },
    layersResource() {
      return this.$store.state.layersResource
    },
    layerSwitchClicked(aResourceLayer) {
      if (aResourceLayer.activated)
        this.facadeOL().map.addLayer(aResourceLayer.layer)
      else {
        this.facadeOL().map.removeLayer(aResourceLayer.layer)
      }
    }
  },
  mounted() {
    this.items= this.layersResource()
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
</style >
