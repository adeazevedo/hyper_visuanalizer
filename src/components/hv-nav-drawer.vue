<template>
  <v-navigation-drawer class="transparent" :mini-variant.sync="mini" v-model="drawer" hide-overlay stateless >
    <v-toolbar flat >
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color=blue>touch_app</v-icon>
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

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile >
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Camada base</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <radio-group name="baseLayersRadio" items="baseLayersRadio" v-on:changed_item_on_baseLayersRadio=baseLayersRadioChanged></radio-group>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  //import BasicRadioGroup from './basic/BasicRadioGroup'
  export default {
    name: 'hv-nav-drawer',
    //components: { radioGroup },
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Camadas base', icon: 'dashboard' },
          { title: 'Sobre', icon: 'question_answer' }
        ],
        baseLayers: [],
        mini: true,
        right: null,
        baseLayersRadio: [{name: 'Openstreetmap', value: 'OSM'}, {name: 'Google', value: 'google'}, {name: 'Satélite', value: 'satelite'}, {name: 'Water color', value: 'watercolor'}, {name: 'Wikimedia', value: 'wikimedia'}, {name: 'Nenhum', value: 'null'} ],
        baseLayers: []
      }
    },
    methods: {
      baseLayersRadioChanged(itemRadio) {
        this.$facadeOL.setBaseLayer(itemRadio.value)
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
