<template>
  <v-expansion-panel color="black" focusable>
    <v-expansion-panel-content v-for="operation in optionsLayer.supported_operations">
      <div slot="header">{{operation["hydra:operation"]}}</div>
      <v-card>
        <v-card-text class="grey lighten-1">Parâmetros esperados: 
            <template v-for="parameter in operation['hydra:expects']">
                <v-text-field label="parameter"> </v-text-field>
            </template>
        </v-card-text> 
        <v-card-text class="grey lighten-2">Retorno da operação: {{operation["hydra:returns"]}}</v-card-text>
        <v-card-text class="grey lighten-1">Método HTTP: {{operation["hydra:method"]}}</v-card-text> 
        <v-card-text class="grey lighten-2">Descrição da operação em: <a>{{operation["@id"]}} </a></v-card-text> 
        <v-card-text class="grey lighten-1"><a>{{optionsLayer.iri }}</a></v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        name: {type: String, required: false},
        optionsLayer: { type: Object, required: false}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
        icon_name: {type: String, required: false},
        title: {type: String, required: false}
    },
   
    data() {
        return {
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
            //let changed_item_on = "changed-item-on-list-radio-button" //_on_" + this.name;
            //this.$emit(changed_item_on, this.selectedItem)
        },
        
        clickedOnOperation(operation_name) {},
       
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
.operation {
  height: 300px;
  border:5px solid #EEEEEE;
  grid-area: atributos;
  overflow: auto;
}
.operation-list:nth-child(odd), .valores-list:nth-child(odd) {
  background: #ECEFF1;
}
.operation-list:nth-child(even), .valores-list:nth-child(even) {
  background: #CFD8DC;
}
</style>