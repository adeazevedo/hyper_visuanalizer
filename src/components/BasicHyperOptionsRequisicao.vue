<template>
  <v-card v-if="optionsLayer">
    <v-card-title class="headline">Opções para gerar requisição</v-card-title>
    <div class="container">

        <div class="atributos">
          Atributos
          <v-list>
            <v-list-tile class="campos-list" v-for="(obj, attribute) in optionsLayer.context" :key="attribute">
              <v-list-tile-content>
                <v-list-tile-title class="black--text">{{ attribute }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon v-if="expressao.includes('{attribute}')" class="attribute-button" @click.native.stop="includeAttribute(attribute)">
                  <v-icon>send</v-icon>
                </v-btn>
                <v-btn icon v-else class="grey lighten-1" @click.native.stop="showAttribute(attribute)">
                    <v-icon  >search</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </div>

        <div class="amostra">
          <v-layout row wrap >
              <v-flex d-flex xs12>
                  <v-textarea name="Amostras" :value="amostras" box background-color=white></v-textarea>
              </v-flex>
              <v-flex d-flex xs6>
                <v-spacer></v-spacer>
                <v-text-field v-model="a_partir_de"  background-color=white box label="A partir de"  hint="Altere o valor para marcar a posição inícial da amostra"></v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field v-model="qtd" background-color=white box label="Qtd" hint="Altere o valor para aumentar ou diminuir o tamanho da amosta"></v-text-field>
                <v-spacer></v-spacer>
              </v-flex>
          </v-layout>
        </div>

        <div class="opcoes">
          Operações
          <v-list>
            <v-list-tile class="campos-list" v-for="(operation, index) in optionsLayer.supported_operations" :key="index">

              <v-list-tile-content>
                <v-list-tile-title class="black--text">{{ operation['hydra:operation'] }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="operation['hydra:expects'].length">
                <v-btn icon ripple class="light-blue lighten-1" @click.stop="filterSelected(operation)">
                  <v-icon>send</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action v-else>
                <v-btn icon ripple @click.stop="functionSelected(option)" :class="operation['hydra:returns'].includes('geojson') ? 'light-blue lighten-1' : ''">
                  <v-icon v-if="operation['hydra:returns'].includes('geojson')">layers</v-icon>
                  <v-icon v-else color="light-blue darken-4">info</v-icon>
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>
          </v-list>
        </div>

        <div class="valores">
          Valores
          <v-list>
            <template v-for="(filter, index) in uris" >
              <v-list-tile class="campos-list" v-if="filter.filter" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title class="black--text">{{ filter.filter }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-text-field
                    name="Valor"
                    label="Valor"
                    v-model="filter.value"
                    required
                    class="input-group--focused blue-grey lighten-3"
                  ></v-text-field>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon class="red lighten-1" @click.native="removeFilter(filter)">
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </div>

        <div class="operadores">
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('eq')">=</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('neq')">!=</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('gt')">></v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('lt')"><</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('gte')">>=</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('lte')"><=</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('between')">between</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('isnull')">null</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('isnotnull')">not null</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('like')">like</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('notlike')">not like</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('in')">in</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('notin')">not in</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('and')">and</v-btn>
          <v-btn class="grey lighten-3 black--text" @click="includeOperator('or')">or</v-btn>
       </div>

       <div class="expressao">
        <v-text-field name="expressao de filtragem" label="Expressão de filtragem específica" color=white v-model="expressionUrl" full-width></v-text-field>
      </div>

      <div class="botoes">
        <v-btn round class="cyan darken-1" @click.native="addFilters(expressionUrl)">Ok</v-btn>
        <v-btn round class="blue-grey lighten-1" @click.native="clearUris">Limpar</v-btn>
        <v-btn round class="blue-grey lighten-1" @click.native="close">Cancelar</v-btn>
      </div>

    </div>
  </v-card>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        optionsLayer: { type: Object, required: false},
    },

    data() {
        return {
          uris: [],
          expressionUrl: '',
          attributes: [],
          amostra: '',
          amostras: [],
          a_partir_de: 1,
          qtd: 30,

        }
    },
    methods: {
        async request(url, http_method=axios.get) {
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
        async showAttribute (attribute) {
          this.clearAttributes()
          this.url=this.optionsLayer.iri + "/projection/" + attribute + "/offset-limit/" + this.a_partir_de + "/"+ this.qtd
          const response = await this.request(this.url)
          this.amostras=response.data.map(obj => typeof obj[attribute] =='string'?obj[attribute].concat('\n'): ''.concat('\n')  )

        },
        includeAttribute (attribute) {
          const uri = this.uris.find(item => item.value.includes('{attribute}'))
          const uriIndex = this.uris.indexOf(uri)
          const newValue = uri.value.replace(/{attribute}/, attribute)
          this.uris[uriIndex].value = newValue
        },
        clearAttributes () {
          this.attributes = []
        },
        filterExpects (expects) {
          if (expects) {
            return expects.map(expect => expect.includes('schema') ? expect.split('/').reverse()[0] : expect.split('#').reverse()[0])
          }
        },
        filterSelected (filter) {
          let expects = this.filterExpects(filter['hydra:expects'])
          if (expects.includes('expression')) {
            expects = "attribute}/{operator}/{value"
          }
          this.uris.push({filter: filter['hydra:operation'], value: `{${expects}}`})
        },
        removeFilter (filter) {
          const filterIndex = this.uris.indexOf(filter)
          this.uris.splice(filterIndex, 1)
        },
        hasOperator (uris) {
          return this.uris.filter(uri => uri.value.includes('{operator}'))
        },
        includeOperator (value) {
          if (this.hasOperator(this.uris).length) {
            const uri = this.uris.find(item => item.value.includes('{operator}'))
            const uriIndex = this.uris.indexOf(uri)
            const newValue = uri.value.replace(/{operator}/, value)
            this.uris[uriIndex].value = newValue
          } else {
            this.uris.push({value})
          }
        },
        addFilters (url) {
          this.$emit('addFilter', url)
          this.close()
        },
        clearUris () {
          this.uris = []
        },
        close () {
          this.clearUris()
          this.clearAttributes()
          this.$emit('close')
        },
    },
    computed: {
      expressao: {
        get: function () {
          const uris = this.uris.map(filter =>
            filter.filter ? `${filter.filter}/${filter.value || 'valor'}/` : `${filter.value || 'valor'}/`
          ).join('')
          this.expressionUrl = this.url + uris
          console.log("url");
          console.log(this.url);
          console.log("uris");
          console.log(this.expressionUrl);
          return this.url + uris
        },
        set: function (newValue) {
          this.expressionUrl = newValue
        }
      }
    },
    mounted() {

    }

}
</script>
<style scoped>
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
  color: white;
  background-color: green;

}
.atributos {
  height: 200px;
  border:1px solid #EEEEEE;
  grid-area: atributos;
  overflow: auto;
}
.amostras {
  height: 200px;
  border:1px solid #EEEEEE;
  grid-area: amostras;
  overflow: auto;
}
.opcoes {
  height: 300px;
  border:1px solid #EEEEEE;
  grid-area: opcoes;
  overflow: auto;
}
.valores {
  height: 300px;
  border:1px solid #EEEEEE;
  grid-area: valores;
  overflow: auto;
}
.operadores {
  height: 100px;
  border:1px solid #EEEEEE;
  grid-area: operadores;
}
.expressao {
  padding: 0px;
  height: 70px;
  border:1px solid #EEEEEE;
  grid-area: expressao;
  overflow: auto;
}
.botoes {
  grid-area: botoes;
}
.campos-list:nth-child(odd), .valores-list:nth-child(odd) {
  background: #ECEFF1;
}
.campos-list:nth-child(even), .valores-list:nth-child(even) {
  background: #CFD8DC;
}
.attribute-button {
    animation-name: attribute-button;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes attribute-button {
  0%   {background-color: #B3E5FC}
  25%  {background-color: #4FC3F7}
  50%  {background-color: #29B6F6}
  75%  {background-color: #4FC3F7}
  100% {background-color: #B3E5FC}
}
</style>
