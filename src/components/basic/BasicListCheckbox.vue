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
            <v-select  class="elevation-0" :items="items" item-value="selectedInstituion.name" v-model="selectedInstituion" dense  ></v-select>
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

  },
  data() {
   return {
     selectedItems: [],
     selectedInstituion: null
   }
  },
  methods: {
    onChange() {
      let changed_item_on = "changed-items-on-list-checkbox"
      console.log(changed_item_on);
      //this.$emit(changed_item_on, this.selectedItem)
    },
    itemsName() {
       let names = this.items.map(item => (item.name))
       console.log(names)
       return names
    }
  },
  mounted() {

      console.log(this.title)

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
