<template>
  <v-list class="pa-0 ma-0">
    <v-list-group no-action>
      <v-list-tile slot="activator">
        <v-list-tile-avatar>
          <v-icon color="blue-grey">{{icon_name}}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-radio-group :mandatory="true" @change="onChange" v-model="selectedItem">
        <v-list-tile v-for="(item, index) in items" :key="item.name" class="pa-0 ma-0" noaction>
          <v-radio :value="item" :label="item.name" />
        </v-list-tile>
      </v-radio-group>
    </v-list-group>
</v-list>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
    icon_name: {type: String, required: false},
    title: {type: String, required: false}
  },
  data () {
   return {
     selectedItem: null
   }
  },
  methods: {
    onChange () {
      this.$emit("itemChanged", this.selectedItem)
    }
  },
  mounted () {
    // Auto-select first item of the list
    this.selectedItem = this.items[0]
  }
}
</script>
<style scoped>
.nospace {
   margin: 0px;
   padding: 0px;
}
