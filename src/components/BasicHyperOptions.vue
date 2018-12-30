<template>
    
      <!--<v-layout row justify-center wrap>-->
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow" >
          <v-tab  :key="1"  ripple > Atributos </v-tab>
          <v-tab  :key="2"  ripple > Operações </v-tab>
          <v-tab-item  :key="1">
             <basic-hyper-options-attribute :optionsLayer="optionsLayer" > </basic-hyper-options-attribute>
          </v-tab-item>
          <v-tab-item  :key="2">
              <basic-hyper-options-operation :optionsLayer="optionsLayer" > </basic-hyper-options-operation>
          </v-tab-item>  
        </v-tabs>
    
</template>

<script>
import axios from 'axios';
import BasicHyperOptionsAttribute from './BasicHyperOptionsAttribute'
import BasicHyperOptionsOperation from './BasicHyperOptionsOperation'
export default {
  props: {
    name: {type: String, required: false},
    optionsLayer: { type: Object, required: false}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
    icon_name: {type: String, required: false},
    title: {type: String, required: false},
   
  },
   components: {BasicHyperOptionsAttribute, BasicHyperOptionsOperation},
  data() {
   return {
     selectedItem: null,
     active: null,
     dialog: false,
     attributes: '',
     amostragem: [],
     amostra: '',
     attribute_name: '',
     sample_initial_value: 1,
     sample_end_value: 30,
   }
  },
  methods: {
    async request(http_method, url) {
      let iri = null
      try {
        console.log(url);
          const response = await http_method(url)
          return response

      } catch (e) {
          this.errors.push(e)
          console.log("Houve algum erro durante a requisição. " + this.errors);
      }
    },
    onChange() {
      let changed_item_on = "changed-item-on-list-radio-button" //_on_" + this.name;
      this.$emit(changed_item_on, this.selectedItem)
    },
    closeDialog() {
      this.$emit("closeDialog", this.optionsLayer)
    },
    clickedOnAttribute(attribute_name) {},
    async clickedOnAmostrar(attribute_name) {
      this.attribute_name = attribute_name
      this.amostra=this.optionsLayer.iri + "/projection/" + this.attribute_name + "/offset-limit/" + this.sample_initial_value + "&"+ this.sample_end_value
      let response = await this.request(axios.get, this.amostra)
      console.log(response.data)
      this.amostragem=response.data.map(obj => obj[attribute_name])
    },
    next() {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      }
  },
  mounted() {
    this.amostra = this.optionsLayer.iri
    this.amostragem = []
    this.amostra = null
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