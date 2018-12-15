<template>
    <v-card>
       <v-container grid-list-xl fluid>
            <v-layout row wrap >
                <v-flex xs6>
                    <v-card>
                        <v-list dense>
                            <v-list-tile class="atributo-list" v-for="(attribute, index) in Object.keys(optionsLayer.context)" :key="index">
                              <v-list-tile-action>
                                <v-tooltip top>
                                  <v-btn slot="activator" @click.stop="clickedOnAttribute(attribute)" icon><v-icon color="blue">help</v-icon></v-btn>
                                <span>{{optionsLayer.context[attribute]}}</span>
                                </v-tooltip >  
                              </v-list-tile-action>
                              <v-list-tile-content>
                                {{attribute}}
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip right>
                                  <v-btn slot="activator" @click.stop="clickedOnAmostrar(attribute)" icon><v-icon color="blue">scatter_plot</v-icon></v-btn>
                                  <span>Amostrar</span>
                                </v-tooltip >  
                              </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 >
                                  <v-text-field label="Início" v-model="sample_initial_value" solo ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 >
                                  <v-text-field label="Qtd" v-model="sample_end_value" solo ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                      <v-flex xs6>
                        <v-card >
                          <v-card-text>{{amostra}}</v-card-text>
                          <v-card-text>
                              <v-list dense>
                                      <v-list-tile class="atributo-list" v-for="(value, index) in amostragem" :key="index">
                                        <v-list-tile-content >
                                          <span color=black> {{value}} </span>
                                        </v-list-tile-content>
                                      </v-list-tile>
                              </v-list>
                          </v-card-text>
                        </v-card>
                </v-flex> 
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
            amostra: null,
            sample_initial_value: 1,
            sample_end_value: 30,
            amostragem: [],
            active: 1
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