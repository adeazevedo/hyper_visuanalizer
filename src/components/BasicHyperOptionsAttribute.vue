<template>
  <v-expansion-panel color="black" focusable>
    <v-expansion-panel-content v-for="(property, index) in optionsLayer.supportedProperties" :key="index">
      <div slot="header">{{ property['hydra:property'] }}</div>
      <v-card>
        <v-card-text class="grey lighten-2">Descrição: </v-card-text>
        <v-card-text class="grey lighten-2">Tipo: <a>{{ property["contextType"] }}</a></v-card-text>
        <v-card-text class="grey lighten-2">Semântica do atributo em: <a>{{ property["contextId"] }}</a></v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    optionsLayer: { type: Object, required: false}, // Items is Array. each Item  is an object => {name: a_name, value: a_value }
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
.atributos {
  height: 300px;
  border: 5px solid #EEEEEE;
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
