<template>
      <v-list class="pa-0" :prepend-icon="iscollapsed?more_vert:dashboard" no-action>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon color=blue>{{icon_name}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-list-tile-content>

            <v-radio-group :mandatory="true" @change="onChange" v-model="selectedItem" slot="activator" >
               <template v-for="(item, index) in items">
                  <v-list-tile>
                     <v-list-tile-action>
                        <v-radio :value="item" :key="index" ></v-radio>
                     </v-list-tile-action>
                     <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                     </v-list-tile-content>
                  </v-list-tile>
               </template>
            </v-radio-group>

        </v-list-tile-content>
        
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
     currentItem: null,
     selectedItem: null,
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
