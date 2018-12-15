<template>
    <v-card>
       <v-container grid-list-xl fluid>
            <v-layout row wrap >
                <v-card>
                    <v-list dense>
                        <template v-for="(operation, index) in Object.keys(optionsLayer.supported_operations)" > 
                            <v-list-tile class="operation-list" :key="operation['hydra:operation']">
                                
                                <v-list-tile-action>
                                    <v-tooltip top>
                                    <v-btn slot="activator" @click.stop="clickedOnOperation(operation)" icon><v-icon color="blue">help</v-icon></v-btn>
                                    <span>{{optionsLayer.supported_operations[operation]}}</span>
                                    </v-tooltip >  
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{optionsLayer.supported_operations[operation]['hydra:operation']}}</v-list-tile-title>
                                    <v-list-tile-sub-title class="text--primary">{{optionsLayer.supported_operations[operation]['hydra:expects']}}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{optionsLayer.supported_operations[operation]['hydra:returns']}}</v-list-tile-sub-title>
                                </v-list-tile-content>    
                                
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-layout>
       </v-container>      
    </v-card>
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