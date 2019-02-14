<template>
  <v-expansion-panel color="black" focusable>
    <v-expansion-panel-content v-for="(operation, index) in optionsLayer.supported_operations" :key="index">
      <div slot="header">{{operation["hydra:operation"]}}</div>
      <v-card>
        <v-card-text class="grey lighten-2">Descrição: </v-card-text>
        <v-card-text class="grey lighten-2">Semântica da operação em: <a target="_blank">{{operation["@id"]}} </a></v-card-text>
        <v-card-text class="grey lighten-2" v-if="(operation['hydra:expects'].length)>0">Parâmetros esperados:
            <template v-for="obj_parameter in operation['hydra:expects']">
                <v-text-field :label="obj_parameter['parameter']" append-icon="check_circle"> </v-text-field>
            </template>
        </v-card-text>
        <v-card-text class="grey lighten-2">Retorno da operação: {{operation["hydra:returns"]}}</v-card-text>
        <v-card-text class="grey lighten-2">Método HTTP: {{operation["hydra:method"]}}</v-card-text>
        <v-card-text class="grey lighten-2"><a>{{optionsLayer.iri}}/{{operation["hydra:operation"]}}/{{parameters_str(operation['hydra:expects'])}}</a></v-card-text>
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
    methods: {
        parameters_str(parameters) {
          if(parameters.length == 0)
            return ''
          return '{' + parameters.join('&') + '}'
        }
    },

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
