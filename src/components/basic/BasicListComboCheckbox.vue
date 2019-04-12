<template>

  <v-list class="pa-0">
    <v-list-group no-action>
        <v-list-tile slot="activator">
            <v-list-tile-avatar>
              <v-icon color=blue>{{icon_name}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{title}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
         <v-list-tile class="order1">    
            <v-combobox  
          v-model="select"
          :items="items"
          label="Select a favorite activity or create a new one"
        ></v-combobox>
        </v-list-tile>
        
    </v-list-group>
</v-list>

</template>

<script>
export default {
  props: {
    name: {type: String, required: true},
    items: { type: Array, required: true}, // Items is Array. each Item  => {name: a_name, value: a_value }
    icon_name: {type: String, required: false},
    title: {type: String, required: false}
  },
  data() {
   return {
     
     selectedItem: null,
     select: null
   }
  },
  methods: {
    onChange() {
      let changed_item_on = "changed_item_on_" + this.name;
      this.$emit(changed_item_on, this.selectedItem)
    }
  },
  mounted() {
    this.selectedItem = this.items[0]
  }
}
</script>
<style>
.order {
    position: relative;
     display: inline;
}
.order1 {
    position: absolute;
     display: inline;
     z-index: 1;
}
</style>
