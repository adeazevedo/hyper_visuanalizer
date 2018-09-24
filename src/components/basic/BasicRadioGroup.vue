<template>
  <v-radio-group v-model="currentItem" @change="onChange">
        <v-radio v-for="(item, index) in items" :key="index"  :label="item.name" :value="item" ></v-radio>
  </v-radio-group>
</template>
<script>
export default {
  props: [
    name: {type: String, required: true},
    items: { type: Array, required: true} // Items is Array. each Item  => {name: a_name, value: a_value }
  ],
  data () {
   return {
     currentItem: null,

  },

  methods: {
    onChange() {
      let changed_item_on = "changed_item_on_" + props.name;
      this.$emit(changed_item_on, this.currentItem)
    }
  }
}
</script>
