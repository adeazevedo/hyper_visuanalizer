<template>
  <v-navigation-drawer class="transparent" :mini-variant.sync="mini" v-model="drawer" hide-overlay stateless >
    <v-toolbar flat >
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
    </v-toolbar>
    <basic-list-radio-button name="BaseLayersRadio" v-bind:items="baseLayersRadio" v-on:changed_item_on_BaseLayersRadio=baseLayersRadioChanged icon_name="layers" title="Camada base"></basic-list-radio-button>
  </v-navigation-drawer>
</template>
<script>
  import BasicListRadioButton from './basic/BasicListRadioButton'
  export default {
    name: 'hv-nav-drawer',
    components: { BasicListRadioButton },
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Camadas base', icon: 'dashboard' },
          { title: 'Sobre', icon: 'question_answer' }
        ],
        mini: true,
        right: null,
        baseLayersRadio: [{name: 'Openstreetmap', value: 'OSM'}, {name: 'Google', value: 'google'}, {name: 'Satélite', value: 'satelite'}, {name: 'Water color', value: 'watercolor'}, {name: 'Wikimedia', value: 'wikimedia'}, {name: 'Nenhum', value: null}]

      }
    },
    methods: {
      baseLayersRadioChanged(item_radio_base_layer) {

        this.$store.state.facadeOL.setBaseLayer(item_radio_base_layer.value)
      }
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
