<template>
<div>
    <v-btn icon @click.stop="closeDrawer()"  fixed  top left class="transparent pa-0 ma-0" >
       <v-icon color="pink">{{icon_btn}}</v-icon>
    </v-btn>
  <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" app hide-overlay stateless style="margin-top: 55px; opacity: 0.65;" >
        <v-list class="pa-0">
            <v-list-tile >
              <v-list-tile-avatar>
                <v-icon color=black>touch_app</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Recursos</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <basic-list-radio-button  v-on:changed-item-on-list-radio-button=baseLayersRadioChanged v-bind:items="baseLayersRadio"  icon_name="layers" title="Camada base"></basic-list-radio-button>
          <v-divider></v-divider>
          <basic-list-wms  v-on:changed-item-on-list-radio-button=baseLayersRadioChanged hint='Escolha a instituição para apresentar camadas' v-bind:items="registeredWMSCapability"  icon_name="layers" title="Serviço WMS por instituições"></basic-list-wms>
          <v-divider></v-divider>
          <basic-list-radio-button  v-on:changed-item-on-list-radio-button=baseLayersRadioChanged v-bind:items="baseLayersRadio"  icon_name="layers" title="Camada base"></basic-list-radio-button>
          <v-divider></v-divider>
          <basic-list-radio-button  v-on:changed-item-on-list-radio-button=baseLayersRadioChanged v-bind:items="baseLayersRadio"  icon_name="layers" title="Camada base"></basic-list-radio-button>
          <v-divider></v-divider>
          <basic-list-radio-button  v-on:changed-item-on-list-radio-button=baseLayersRadioChanged v-bind:items="baseLayersRadio"  icon_name="layers" title="Camada base"></basic-list-radio-button>
          <v-divider></v-divider>
  </v-navigation-drawer>
  </div>
</template>
<script>
  import BasicListRadioButton from './basic/BasicListRadioButton'
  import BasicListWms from './basic/BasicListWms'
  export default {
    name: 'hv-nav-drawer',
    components: { BasicListRadioButton, BasicListWms },
    data () {
      return {
        drawer: true,
        icon_btn: 'chevron_right',
        btn_color: 'green',
        items: [
          { title: 'Camadas base', icon: 'dashboard' },
          { title: 'Sobre', icon: 'question_answer' }
        ],
        mini: true,
        right: null,
        baseLayersRadio: [{name: 'Openstreetmap', value: 'OSM'}, {name: 'Google', value: 'google'}, {name: 'Google Satélite', value: 'satelite'}, {name: 'Water color', value: 'watercolor'}, {name: 'Wikimedia', value: 'wikimedia'}, {name: 'Nenhum', value: null}],
        registeredWMSCapability: [{name: 'BNDES', title: 'Banco Nacional de Desenvolvimento Econômico e Social', url: 'http://www.geoservicos.inde.gov.br/geoserver/BNDES/wms', registration: '', service_type: ''},
                                  {name: 'SPM', title: 'Secretaria Nacional de Políticas para Mulher', url: 'http://www.geoservicos.inde.gov.br/geoserver/SPM/wms', registration: '', service_type: ''},
                                  {name: 'CCAR-IBGE', title: 'Coordenação de Cartografia-IBGE', url: 'http://172.30.10.86/geoserver-ccar/ows', registration: '', service_type: ''}
                                ]
      }
    },
    methods: {
      baseLayersRadioChanged(item_radio_base_layer) {
        this.$store.state.facadeOL.setBaseLayer(item_radio_base_layer.value)
      },
      closeDrawer() {
        this.drawer = !this.drawer
        this.icon_btn = this.drawer?'chevron_left':'chevron_right'
      }
    },
    mounted() {
      this.icon_btn ='chevron_left'
    }
  }
</script>
<style scoped>
  .transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
  }
</style>
