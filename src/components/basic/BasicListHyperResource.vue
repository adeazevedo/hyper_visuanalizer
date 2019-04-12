<template>
  <v-list class="pa-0 ma-0">
    <v-list-group>
      <v-list-tile slot="activator">
          <v-list-tile-avatar>
            <v-icon color=brown>{{icon_name}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
          <v-list-tile-content>

              <v-select  slot="activator" class="elevation-0" :items="items" v-model="item" item-text= "name" hint="item.title"  @change="onChange"    box single-line dense ></v-select>

          </v-list-tile-content>
       </v-list-tile>
       <v-list-tile>
           <v-list-tile-content>
             <v-text-field  v-model="url" label="API URL"  single-line solo ></v-text-field >
           </v-list-tile-content>
           <v-list-tile-content>
               <v-btn icon :disabled="url==''" @click.stop="search" >
                  <v-icon  color="blue">search</v-icon>
                </v-btn>
           </v-list-tile-content>
            <v-list-tile-content>
               <v-btn icon @click.stop="cancel" >
                  <v-icon color="red">cancel</v-icon>
                </v-btn>
           </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-for="(layer, index) in wmsLayersFromGetCapabilities" :key="index" >
              <!--<v-checkbox  @click.prevent="layerCheckboxClicked" :label="layer.name"></v-checkbox>-->
          <v-list-tile-action>
            <v-switch  @click.native="layerSwitchClicked(index)"  v-model="layersBoolean[index]"  color="cyan"/></v-switch>
          </v-list-tile-action>
          <v-list-tile-content>
            {{layer.title}}
            <!--<v-checkbox  @click="layerCheckboxClicked(layer)" :value="layer" :label="layer.name"></v-checkbox>-->
          </v-list-tile-content>
        </v-list-tile>
    </v-list-group>
  </v-list>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    name: {type: String, required: false},
    items: { type: Array, required: true}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
    icon_name: {type: String, required: false},
    title: {type: String, required: false},
    hint:{type: String, required: false}

  },
  data() {
   return {
     itemsName: [],
     item: '',
     url: '',
     errors: [],
     wmsLayersFromGetCapabilities: [],
     selectedLayers: [],
     layersCheckboxChanged: null,
     layersBoolean: []
   }
  },
  methods: {
    onChange(anItem) {
      let changed_item_on = "changed-items-on-list-checkbox"
      let idx = this.itemsName.indexOf(this.item)
      let itemObject = this.items[idx]
      if(!itemObject)
        return
      this.url = itemObject.url
      //this.$emit(changed_item_on, itemObject)
    },
    cancel() {
      this.item = ''
      this.url = ''
      this.wmsLayersFromGetCapabilities = []
    },
    facadeOL() {
        return this.$store.state.facadeOL
    },

    isWMSGetMap(url) {
      let parsed_url = url.replace(/\s+/g, '')
      return  parsed_url.toUpperCase().indexOf('request=GetMap'.toUpperCase()) != -1
    },
    normalizedUrlWMSCapabilities(url) {
      let id = url.toUpperCase().indexOf('GetCapabilities'.toUpperCase())
      if (id == -1)
        return url + '?service=wms&request=GetCapabilities'
      return url
    },

    isEntryPoint(headers) {

      let id = headers.link.toUpperCase().indexOf('rel="http://schema.org/EntryPoint"'.toUpperCase())
      console.log(id);
      return id != -1
    },

    getLayersFromEntryPoint(json_name_url) {
      console.log(json_name_url);
    },
    getLayerFromHyperResourceURL() {

    },
    async getLayersFromHyperResourceAPI() {

      try {
          const response = await axios.get(this.url)
          if (this.isEntryPoint(response.headers))
            this.getLayersFromEntryPoint(response.data)
          else
            this.getLayerFromHyperResourceURL(response.data)
      } catch (e) {
          this.errors.push(e)
          console.log("Houve algum erro durante a requisição. " + this.errors);
      }
    },
    async search() {
      let iri = null
      this.getLayersFromHyperResourceAPI()
      return this.$store.state.facadeOL.addWMSLayer(layer)

    },
    layerSwitchClicked(index) {
      let layer = this.wmsLayersFromGetCapabilities[index]
      if (!layer.was_requested)
        this.$store.state.facadeOL.addWMSLayer(layer)
      else
        this.$store.state.facadeOL.removeWMSLayer(layer)

      layer.was_requested = !layer.was_requested
      //console.log(this.selectedLayers);
    }
  },
  mounted() {
    this.itemsName = this.items.map(item => item.name)
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
