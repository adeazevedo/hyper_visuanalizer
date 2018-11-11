<template>
  
    <v-layout align-center justify-center row fill-height >
      <v-flex >
        <v-card>
          <v-card-title  class="headline">{{title}}</v-card-title>
            <div class="container">
              <div class="atributos">
                  Atributos
                  <v-list>
                    <v-list-tile class="atributo-list" v-for="(attribute, index) in Object.keys(optionsLayer.context)" :key="index">
                      <v-list-tile-action>
                        <v-btn slot="activator" @click.stop="clickedOnAttribute(attribute)" icon><v-icon color="blue">help</v-icon></v-btn>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        {{attribute}}
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn slot="activator" @click.stop="clickedOnAttribute(attribute)" icon><v-icon color="blue">scatter_plot</v-icon></v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </div>
             </div> 
              <div class="atributos">
                  Amostra
                  <v-list>
                    <v-list-tile class="atributo-list" v-for="(attribute, index) in Object.keys(optionsLayer.context)" :key="index">
                      <v-list-tile-action>
                        <v-btn slot="activator" @click.stop="clickedOnAttribute(attribute)" icon><v-icon color="blue">help</v-icon></v-btn>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        {{attribute}}
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn slot="activator" @click.stop="clickedOnAttribute(attribute)" icon><v-icon color="blue">scatter_plot</v-icon></v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </div>
             </div> 
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  
</template>

<script>
export default {
  props: {
    name: {type: String, required: false},
    optionsLayer: { type: Object, required: false}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
    icon_name: {type: String, required: false},
    title: {type: String, required: false}
  },
  data() {
   return {
     selectedItem: null,
     dialog: false,
     attributes: ''
   }
  },
  methods: {
    onChange() {
      let changed_item_on = "changed-item-on-list-radio-button" //_on_" + this.name;
      this.$emit(changed_item_on, this.selectedItem)
    },
    closeDialog() {
      this.$emit("closeDialog", this.optionsLayer)
    },
    clickedOnAttribute(attribute) {}

  },
  mounted() {
    
  }
}
</script>
<style scoped>
.nospace {
   margin: 0px;
   padding: 0px;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  'atributos amostras'
  'opcoes valores'
  'operadores operadores'
  'expressao expressao'
  'botoes botoes';
  grid-column-gap: 10px;
  grid-row-gap: 5px;
}
.atributos {
  height: 300px;
  border:5px solid #EEEEEE;
  grid-area: atributos;
  overflow: auto;
}
.atributo-list:nth-child(odd), .valores-list:nth-child(odd) {
  background: #ECEFF1;
}
.atributo-list:nth-child(even), .valores-list:nth-child(even) {
  background: #CFD8DC;
}
</style>