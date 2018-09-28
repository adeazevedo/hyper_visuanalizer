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
            <v-select  class="elevation-0" :items="items" v-model="item" item-text= "name" hint="hint" @change="onChange"  box single-line dense ></v-select>
          </v-list-tile-content>
        </v-list-tile>
    </v-list-group>
  </v-list>
</template>
<script>
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
     item: ''
   }
  },
  methods: {
    onChange(anItem) {
      let changed_item_on = "changed-items-on-list-checkbox"
      let idx = this.itemsName.indexOf(this.item)
      console.log(this.item)
      console.log(this.items[idx])

      //this.$emit(changed_item_on, this.selectedItem)
    },
    changedItem(item) {
      //console.log(item);
      console.log(this.selectedInstituion);
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
