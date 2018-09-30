<template>
  <v-list class="pa-0 ma-0">
    <v-list-group>
      <v-list-tile slot="activator">
          <v-list-tile-avatar>
            <v-icon color=green>{{icon_name}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
          <v-list-tile-content>
            <v-select  class="elevation-0" :items="items" v-model="item" item-text= "name" hint="hint"  @change="onChange"  box single-line dense ></v-select>
          </v-list-tile-content>
       </v-list-tile>
       <v-list-tile>
           <v-list-tile-content>
             <v-text-field  v-model="url" label="WMS URL"  single-line solo ></v-text-field >
             
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
     errors: []
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
      console.log(itemObject)
      //this.$emit(changed_item_on, itemObject)
    },
    changedItem(item) {
      //console.log(item);
      console.log(this.selectedInstituion);
    },
    cancel() {
      this.item = ''
      this.url = ''
    },
    normalizedURL() {
      let id = this.url.toUpperCase().indexOf('GetCapabilities'.toUpperCase())
      if (id == -1)
        return this.url + '?service=wms&request=GetCapabilities'
      return this.url
    },
    async search() {
      if (this.url =='')
        return
      let iri = this.normalizedURL()
         console.log(iri);  
       try {
         
                   const response = await axios.get(iri)
          console.log( response.data)
        } catch (e) {
          this.errors.push(e)
          console.log(this.errors);
          
        }
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
